import { App } from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { beforeAll, describe, it } from 'vitest'
import { SiteStack } from './site-stack'

const fakeBuild = () => {
  const dir = mkdtempSync(join(tmpdir(), 'portfolio-dist-'))
  mkdirSync(join(dir, 'assets'))
  writeFileSync(join(dir, 'index.html'), '<!doctype html>')
  writeFileSync(join(dir, '404.html'), '<!doctype html>')
  writeFileSync(join(dir, 'assets', 'index-abc.js'), '')
  return dir
}

describe('SiteStack', () => {
  let template: Template

  beforeAll(() => {
    const app = new App()
    const stack = new SiteStack(app, 'PortfolioSite', {
      env: { account: '111111111111', region: 'eu-west-2' },
      distDir: fakeBuild(),
      domain: {
        name: 'example.com',
        hostedZoneId: 'Z123',
        certificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/abc',
      },
      webAclArn: 'arn:aws:wafv2:us-east-1:111111111111:global/webacl/CreatedByCloudFront-test/abc',
    })
    template = Template.fromStack(stack)
  })

  it('keeps the bucket private and HTTPS-only', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({ Effect: 'Deny', Condition: { Bool: { 'aws:SecureTransport': 'false' } } }),
        ]),
      },
    })
  })

  it('serves over HTTPS with the page path function and security headers', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.objectLike({
        DefaultRootObject: 'index.html',
        DefaultCacheBehavior: Match.objectLike({
          ViewerProtocolPolicy: 'redirect-to-https',
          Compress: true,
          ResponseHeadersPolicyId: Match.anyValue(),
          FunctionAssociations: [Match.objectLike({ EventType: 'viewer-request' })],
        }),
      }),
    })
    template.resourceCountIs('AWS::CloudFront::Function', 1)
  })

  it('serves the domain and www with the site certificate', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.objectLike({
        Aliases: ['example.com', 'www.example.com'],
        ViewerCertificate: Match.objectLike({
          AcmCertificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/abc',
        }),
      }),
    })
  })

  it('points the domain and www at the distribution in the hosted zone, over IPv4 and IPv6', () => {
    for (const Type of ['A', 'AAAA']) {
      for (const Name of ['example.com.', 'www.example.com.']) {
        template.hasResourceProperties('AWS::Route53::RecordSet', { HostedZoneId: 'Z123', Name, Type })
      }
    }
  })

  it('keeps the Free plan web ACL attached', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.objectLike({
        WebACLId: 'arn:aws:wafv2:us-east-1:111111111111:global/webacl/CreatedByCloudFront-test/abc',
      }),
    })
  })

  it('shows the prerendered 404 page, with a 404 status, for missing files', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.objectLike({
        CustomErrorResponses: [
          Match.objectLike({ ErrorCode: 403, ResponseCode: 404, ResponsePagePath: '/404.html' }),
          Match.objectLike({ ErrorCode: 404, ResponseCode: 404, ResponsePagePath: '/404.html' }),
        ],
      }),
    })
  })

  it('caches hashed assets for a year and makes pages revalidate', () => {
    template.hasResourceProperties('Custom::CDKBucketDeployment', {
      DestinationBucketKeyPrefix: 'assets/',
      SystemMetadata: { 'cache-control': 'public, max-age=31536000, immutable' },
    })
    template.hasResourceProperties('Custom::CDKBucketDeployment', {
      SystemMetadata: { 'cache-control': 'public, max-age=0, must-revalidate' },
      DistributionPaths: ['/*'],
    })
  })

  it('puts the project role boundary on every role it creates', () => {
    const roles = template.findResources('AWS::IAM::Role')
    for (const role of Object.values(roles)) {
      template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: role.Properties.AssumeRolePolicyDocument,
        PermissionsBoundary: Match.objectLike({
          'Fn::Join': Match.arrayWith([Match.arrayWith([':iam::111111111111:policy/PortfolioRoleBoundary'])]),
        }),
      })
    }
  })
})

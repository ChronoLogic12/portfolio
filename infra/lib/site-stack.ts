import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment'
import type { Construct } from 'constructs'
import { join } from 'node:path'
import { pagePathsCode } from './edge/pagePaths'
import { ROLE_BOUNDARY_NAME } from './project'
import { siteHostNames, type SiteDomain } from './site-domain'

export interface SiteStackProps extends StackProps {
  distDir: string
  domain: SiteDomain
  webAclArn?: string
}

export class SiteStack extends Stack {
  constructor(scope: Construct, id: string, { distDir, domain, webAclArn, ...props }: SiteStackProps) {
    super(scope, id, props)
    iam.PermissionsBoundary.of(this).apply(
      iam.ManagedPolicy.fromManagedPolicyName(this, 'RoleBoundary', ROLE_BOUNDARY_NAME),
    )

    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const pagePaths = new cloudfront.Function(this, 'PagePaths', {
      code: cloudfront.FunctionCode.fromInline(pagePathsCode(domain.name)),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: 'Sends other host names to the site domain, serves prerendered pages, drops trailing slashes',
    })

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: 'matthewsuttie.com portfolio',
      domainNames: siteHostNames(domain),
      certificate: Certificate.fromCertificateArn(this, 'SiteCertificate', domain.certificateArn),
      webAclId: webAclArn,
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
        compress: true,
        functionAssociations: [{ function: pagePaths, eventType: cloudfront.FunctionEventType.VIEWER_REQUEST }],
      },
      errorResponses: [403, 404].map((httpStatus) => ({
        httpStatus,
        responseHttpStatus: 404,
        responsePagePath: '/404.html',
        ttl: Duration.minutes(5),
      })),
    })

    const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'SiteZone', {
      hostedZoneId: domain.hostedZoneId,
      zoneName: domain.name,
    })
    const siteTarget = route53.RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    for (const [recordId, recordName] of [
      ['Site', domain.name],
      ['WwwSite', `www.${domain.name}`],
    ]) {
      new route53.ARecord(this, `${recordId}A`, { zone, recordName, target: siteTarget })
      new route53.AaaaRecord(this, `${recordId}Aaaa`, { zone, recordName, target: siteTarget })
    }

    const assets = new BucketDeployment(this, 'DeployAssets', {
      sources: [Source.asset(join(distDir, 'assets'))],
      destinationBucket: bucket,
      destinationKeyPrefix: 'assets/',
      cacheControl: [CacheControl.fromString('public, max-age=31536000, immutable')],
      prune: false,
    })

    const pages = new BucketDeployment(this, 'DeployPages', {
      sources: [Source.asset(distDir, { exclude: ['assets/*'] })],
      destinationBucket: bucket,
      cacheControl: [CacheControl.fromString('public, max-age=0, must-revalidate')],
      prune: false,
      distribution,
      distributionPaths: ['/*'],
    })
    pages.node.addDependency(assets)

    new CfnOutput(this, 'SiteUrl', { value: `https://${domain.name}` })
    new CfnOutput(this, 'DistributionDomainName', { value: distribution.distributionDomainName })
    new CfnOutput(this, 'DistributionId', { value: distribution.distributionId })
  }
}

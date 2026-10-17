import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment'
import type { Construct } from 'constructs'
import { join } from 'node:path'
import { pagePathsCode } from './edge/pagePaths'
import { ROLE_BOUNDARY_NAME } from './project'

export interface SiteStackProps extends StackProps {
  distDir: string
  webAclArn?: string
}

export class SiteStack extends Stack {
  constructor(scope: Construct, id: string, { distDir, webAclArn, ...props }: SiteStackProps) {
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
      code: cloudfront.FunctionCode.fromInline(pagePathsCode),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: 'Serves prerendered pages from <path>/index.html and drops trailing slashes',
    })

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      comment: 'matthewsuttie.com portfolio',
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

    new CfnOutput(this, 'SiteUrl', { value: `https://${distribution.distributionDomainName}` })
    new CfnOutput(this, 'DistributionId', { value: distribution.distributionId })
  }
}

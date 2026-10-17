import { CfnOutput, Duration, Stack, type StackProps } from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import type { Construct } from 'constructs'
import { CDK_QUALIFIER, GITHUB_OIDC_HOST, ROLE_BOUNDARY_NAME } from './project'

export interface GitHubRepository {
  owner: string
  ownerId: number
  name: string
  id: number
}

export interface GitHubDeployStackProps extends StackProps {
  repository: GitHubRepository
  branch: string
}

export const immutableSubject = ({ owner, ownerId, name, id }: GitHubRepository, branch: string) =>
  `repo:${owner}@${ownerId}/${name}@${id}:ref:refs/heads/${branch}`

export class GitHubDeployStack extends Stack {
  constructor(scope: Construct, id: string, { repository, branch, ...props }: GitHubDeployStackProps) {
    super(scope, id, props)
    iam.PermissionsBoundary.of(this).apply(
      iam.ManagedPolicy.fromManagedPolicyName(this, 'RoleBoundary', ROLE_BOUNDARY_NAME),
    )

    const providerArn = `arn:${this.partition}:iam::${this.account}:oidc-provider/${GITHUB_OIDC_HOST}`

    const role = new iam.Role(this, 'GitHubDeployRole', {
      description: `Deploys ${repository.owner}/${repository.name} from ${branch} via GitHub Actions`,
      maxSessionDuration: Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(providerArn, {
        StringEquals: {
          [`${GITHUB_OIDC_HOST}:aud`]: 'sts.amazonaws.com',
          [`${GITHUB_OIDC_HOST}:sub`]: immutableSubject(repository, branch),
        },
      }),
    })

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        resources: [
          `arn:${this.partition}:iam::${this.account}:role/cdk-${CDK_QUALIFIER}-*-${this.account}-${this.region}`,
        ],
      }),
    )

    new CfnOutput(this, 'DeployRoleArn', { value: role.roleArn })
  }
}

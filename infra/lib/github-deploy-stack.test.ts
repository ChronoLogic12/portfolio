import { App } from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import { beforeAll, describe, expect, it } from 'vitest'
import { GitHubDeployStack, immutableSubject } from './github-deploy-stack'
import { DEPLOY_BRANCH, REPOSITORY } from './project'

describe('immutableSubject', () => {
  it('pins the owner and repository IDs, so a renamed or recreated repo cannot deploy', () => {
    expect(immutableSubject(REPOSITORY, 'main')).toBe(
      'repo:ChronoLogic12@61290220/portfolio@1422728054:ref:refs/heads/main',
    )
  })
})

describe('GitHubDeployStack', () => {
  let template: Template

  beforeAll(() => {
    const app = new App()
    const stack = new GitHubDeployStack(app, 'PortfolioGitHubDeploy', {
      env: { account: '111111111111', region: 'eu-west-2' },
      repository: REPOSITORY,
      branch: DEPLOY_BRANCH,
    })
    template = Template.fromStack(stack)
  })

  it('uses the shared GitHub OIDC provider instead of creating one', () => {
    template.resourceCountIs('Custom::AWSCDKOpenIdConnectProvider', 0)
    template.resourceCountIs('AWS::IAM::OIDCProvider', 0)
  })

  it('trusts only main of this repository', () => {
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          Match.objectLike({
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                'token.actions.githubusercontent.com:sub': immutableSubject(REPOSITORY, DEPLOY_BRANCH),
              },
            },
          }),
        ],
      },
      MaxSessionDuration: 3600,
    })
  })

  it('can only assume the portfolio CDK roles', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Resource: Match.objectLike({
              'Fn::Join': Match.arrayWith([
                Match.arrayWith([':iam::111111111111:role/cdk-portfolio-*-111111111111-eu-west-2']),
              ]),
            }),
          },
        ],
      },
    })
  })
})

import { App, Tags } from 'aws-cdk-lib'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { GitHubDeployStack } from '../lib/github-deploy-stack'
import { DEPLOY_BRANCH, REPOSITORY } from '../lib/project'
import { SiteStack } from '../lib/site-stack'

const distDir = fileURLToPath(new URL('../../site/dist/client', import.meta.url))
if (!existsSync(distDir)) throw new Error(`Site build not found at ${distDir}. Run npm run build first.`)

const app = new App()
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? 'eu-west-2',
}

new SiteStack(app, 'PortfolioSite', { env, distDir })
new GitHubDeployStack(app, 'PortfolioGitHubDeploy', { env, repository: REPOSITORY, branch: DEPLOY_BRANCH })

Tags.of(app).add('project', 'portfolio')

export interface SiteDomain {
  name: string
  hostedZoneId: string
  certificateArn: string
}

export const SITE_DOMAIN: SiteDomain = {
  name: 'matthewsuttie.com',
  hostedZoneId: 'Z00354281CYZJ8IIT795B',
  certificateArn: 'arn:aws:acm:us-east-1:797286749899:certificate/ed423af0-273f-437a-9499-8a8ed3a4d230',
}

export const siteHostNames = ({ name }: SiteDomain) => [name, `www.${name}`]

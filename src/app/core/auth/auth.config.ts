import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:9000',

  redirectUri: 'http://localhost:4200',

  clientId: '1',

  responseType: 'code',

  scope: 'openid',

  loginUrl: 'http://localhost:9000/oauth2/authorize',
  tokenEndpoint: 'http://localhost:9000/oauth2/token',

  requireHttps: false,
  showDebugInformation: true,
};

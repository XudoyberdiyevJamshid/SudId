import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:9000',

  redirectUri: window.location.origin + '/dashboard',

  clientId: '1',

  responseType: 'code',

  scope: 'openid profile',

  requireHttps: false,
  showDebugInformation: true,
};

import {CanActivateFn} from '@angular/router';

export const oauth2Guard: CanActivateFn = (route, state) => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    const clientId = '1';
    const redirectUri = encodeURIComponent('http://localhost:4200/login');
    window.location.href = `http://localhost:9000/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile`;
    return false
  }

  return true;
};

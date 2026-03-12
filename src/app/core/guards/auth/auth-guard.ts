import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  const clientId = '1';
  const redirectUri = encodeURIComponent('http://localhost:4200/login');
  const authUrl = `http://localhost:9000/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile`;

  // 3. Tashqi URL ga yo'naltirish (GET so'rovi avtomatik bajariladi)
  window.location.href = authUrl;

  return false;
};

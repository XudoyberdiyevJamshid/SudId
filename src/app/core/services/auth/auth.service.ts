import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  isAuthenticated = signal<boolean>(this.hasToken());

  hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
    this.isAuthenticated.set(true);
  }

  saveUserInfo(userInfo: any) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(): any {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) : null;
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userInfo');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getEimzoChallange() {
    return this.http.get(`${environment.apiUrl}/auth/eimzo-challenge`, {
      withCredentials: true,
    });
  }

  loginWithEimzo(pkcs7_hash: string, pin: string) {
    return this.http.post(
      `${environment.apiUrl}/auth/by-eimzo`,
      {
        pkcs7b64: pkcs7_hash,
        pin: pin,
      },
      {
        withCredentials: true,
      },
    );
  }

  exchangeCode(code: string) {
    return this.http.get(`${environment.apiUrl}/auth/exchange`, {
      params: { code, client_id: '1' },
      withCredentials: true,
    });
  }
}

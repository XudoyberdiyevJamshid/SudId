import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../../environments/environment';

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

  logOut() {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getEimzoChallange() {
    return this.http.get(`${environment.apiUrl}/auth/eimzo-challenge`,
      {
        withCredentials: true
      });
  }

  loginWithEimzo(pkcs7_hash: string, pin: string) {
    return this.http.post(`${environment.apiUrl}/auth/by-eimzo`, {
        pkcs7b64: pkcs7_hash,
        pin: pin
      },
      {
        withCredentials: true
      });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { firstValueFrom } from 'rxjs';

type tab = 'login' | 'register';

@Component({
  selector: 'app-login',
  imports: [LoginForm, RegisterForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  hasEimzo = signal<boolean>(false);
  readonly eriControl = new FormControl('');
  currentTab = signal<tab>('login');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  switchTab(tab: tab): void {
    this.currentTab.set(tab);
  }

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      try {
        const response: any = await firstValueFrom(this.authService.exchangeCode(code));
        const token = response?.data?.oauth2_token?.access_token || response?.access_token;
        const userInfo = response?.data?.user;

        if (token) {
          this.authService.saveToken(token);
          this.authService.saveUserInfo(userInfo);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastService.error('Token olinmadi. Qayta urinib ko\'ring.');
        }
      } catch {
        this.toastService.error('Tizimga kirishda xatolik yuz berdi.');
      }
    }
  }
}

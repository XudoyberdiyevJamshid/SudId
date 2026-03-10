import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { GSelect, GOption } from '../../../../shared/components/g-select';
import { EimzoService } from '../../../../core/services/eimzo/eimzo';
import { ESignKey } from '@shohrux_saidov/eimzo-client';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, GIcon, GButton, GSelect, GOption, DatePipe],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm implements OnInit {
  eimzoService = inject(EimzoService);
  authService = inject(AuthService);
  readonly eriControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.refreshEimzo();
  }

  downloadEimzo() {
    window.open('https://e-imzo.uz/', '_blank');
  }

  refreshEimzo() {
    this.eimzoService.loadPfxKeys();
  }

  getErrorMessage(constrolName: string) {
    const control = this.eriControl;
    if (control && control.invalid && (control.touched || control?.dirty)) {
      if (control?.hasError('required')) {
        return "Bu maydon to'ldirilishi shart";
      }
    }
    return '';
  }

  async onLogin() {
    if (this.eriControl.invalid) {
      this.eriControl.markAsTouched();
      return;
    }

    const selectedSerialNumber = this.eriControl.value;

    if (selectedSerialNumber) {
      const selectedKey = this.eimzoService
        .keys()
        .find((k: ESignKey) => k.serialNumber === selectedSerialNumber);

      if (selectedKey) {
        try {
          const hash = await this.eimzoService.signSimpleData(selectedKey, 'SUD_ID_TEST_LOGIN');
          this.authService.loginWithEimzo(hash, selectedKey.PINFL).subscribe({
            next(value) {
              console.log(value);
            },
            error(err) {
              console.log(err);
            },
          });
        } catch (error) {
          alert('Imzolash jarayoni bekor qilindi yoki parol xato!');
        }
      }
    } else {
      alert('Iltimos, ERI kalitini tanlang!');
    }
  }
}

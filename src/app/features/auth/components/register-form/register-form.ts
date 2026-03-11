import { Component, inject, OnInit } from '@angular/core';

import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GInput } from '../../../../shared/components/g-input/g-input';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { GOption, GSelect } from '../../../../shared/components/g-select';
import { Router } from '@angular/router';
import { EimzoService } from '../../../../core/services/eimzo/eimzo';
import { DatePipe } from '@angular/common';
import { ESignKey } from '@shohrux_saidov/eimzo-client';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, GIcon, GButton, GOption, GSelect, DatePipe],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm implements OnInit {
  eimzoService = inject(EimzoService);
  readonly eriControl = new FormControl('');
  private fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  refreshEimzo() {
    this.eimzoService.loadPfxKeys();
  }

  registerForm = this.fb.group({
    eriKey: ['', Validators.required],
    // username: [{ value: '', disabled: true }, Validators.required],
    // password: [{ value: '', disabled: true }, Validators.required],
    // confirmPassword: [{ value: '', disabled: true }, Validators.required],
    // phone: [{ value: '+998 ', disabled: true }, Validators.required],
  });

  getErrorMessage(constrolName: string) {
    const control = this.registerForm.get(constrolName);
    if (control && control.invalid && (control.touched || control?.dirty)) {
      if (control?.hasError('required')) {
        return "Bu maydon to'ldirilishi shart";
      }
      // if (control.hasError('minlength')) {
      //   return `Kamida ${control.errors?.['minlength'].requiredLength} tab belgi kirting `;
      // }
      // if (control.hasError('passwordMismatch')) {
      //   return 'Parollar mos kelmadi';
      // }
    }
    return '';
  }

  ngOnInit(): void {
    this.refreshEimzo();
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const selectedSerialNumber = this.registerForm.get('eriKey')?.value;
      const selectedKey = this.eimzoService
        .keys()
        .find((k: ESignKey) => k.serialNumber === selectedSerialNumber);

      if (selectedKey) {
        try {
          const challlengeRes: any = await firstValueFrom(this.authService.getEimzoChallange());
          const challengeText = challlengeRes?.data || challlengeRes?.challenge;

          if (!challengeText) {
            throw new Error('Backenddan Challenge kelmadi!');
          }

          const hash = await this.eimzoService.signSimpleData(selectedKey, challengeText);

          this.router.navigate(['/complete-register'], {
            state: {
              pinfl: selectedKey.PINFL,
              hash: hash,
            },
          });
          // console.log('Muvaffaqiyatli imzolandi! Backendga yuboriladigan HASH:', hash);
          // // this.router.navigate(['/complete-register']);
        } catch (error) {
          alert('Imzolash jarayoni bekor qilindi yoki parol xato!');
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  refresh() {
    this.registerForm.get('eriKey')?.setValue('');
    this.registerForm.markAsUntouched();
    this.refreshEimzo();
  }
}

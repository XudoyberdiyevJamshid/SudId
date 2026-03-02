import { Component, inject, OnInit } from '@angular/core';
import { GSelectNew } from '../../../../shared/components/g-select-new/g-select-new';
import { GOptionNew } from '../../../../shared/components/g-select-new/g-option-new';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GInput } from '../../../../shared/components/g-input/g-input';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { Dialog } from '@angular/cdk/dialog';
import { OtpModal } from '../../../../shared/components/otp-modal/otp-modal';

@Component({
  selector: 'app-register-form',
  imports: [GSelectNew, GOptionNew, ReactiveFormsModule, GInput, GIcon, GButton],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm implements OnInit {
  readonly eriControl = new FormControl('');

  private dialog = inject(Dialog);

  readonly eriKeys = [
    {
      id: '1',
      name: "Nurmuhammad Sultonov Ozod o'g'li",
      jshshir: '12345678901234',
      date: '15.10.2029',
    },
    { id: '2', name: 'Eshmatov Toshmat', jshshir: '98765432109876', date: '10.05.2028' },
  ];

  private fb = inject(NonNullableFormBuilder);

  registerForm = this.fb.group({
    eriKey: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    phone: ['+998 ', Validators.required],
  });

  getErrorMessage(constrolName: string) {
    const control = this.registerForm.get(constrolName);
    if (control && control.invalid && (control.touched || control?.dirty)) {
      if (control?.hasError('required')) {
        return "Bu maydon to'ldirilishi shart";
      }
      if (control.hasError('minlength')) {
        return `Kamida ${control.errors?.['minlength'].requiredLength} tab belgi kirting `;
      }
      if (control.hasError('passwordMismatch')) {
        return 'Parollar mos kelmadi';
      }
    }
    return '';
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const dialogRef = this.dialog.open(OtpModal, {
        width: '100%',
        maxWidth: '630px',
        backdropClass: 'backdrop-blur-[4px]',
        disableClose: true,
      });
      dialogRef.closed.subscribe((otpCode) => {
        if (otpCode) {
          console.log("Ro'yxatdan o'tish yakunlandi! Kiritilgan OTP:", otpCode);
        } else {
          console.log('Foydalanuvchi modalni yopib yubordi.');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

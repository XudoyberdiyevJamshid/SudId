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
import { Dialog } from '@angular/cdk/dialog';
import { OtpModal } from '../../../../shared/components/otp-modal/otp-modal';
import { GOption, GSelect } from "../../../../shared/components/g-select";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ ReactiveFormsModule, GInput, GIcon, GButton, GOption, GSelect],
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
  router=inject(Router)

  registerForm = this.fb.group({
    eriKey: ['', Validators.required],
    username: [{'value': '', disabled: true}, Validators.required],
    password: [{'value': '', disabled: true}, Validators.required],
    confirmPassword: [{'value': '', disabled: true}, Validators.required],
    phone: [{value:'+998 ',disabled:true}, Validators.required],
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
      console.log(this.registerForm.value);
      this.router.navigate(['/complete-register'])
      
      // const dialogRef = this.dialog.open(OtpModal, {
      //   width: '100%',
      //   maxWidth: '630px',
      //   backdropClass: 'backdrop-blur-[4px]',
      //   disableClose: true,
      // });
      // dialogRef.closed.subscribe((otpCode) => {
      //   if (otpCode) {
      //     console.log("Ro'yxatdan o'tish yakunlandi! Kiritilgan OTP:", otpCode);
      //   } else {
      //     console.log('Foydalanuvchi modalni yopib yubordi.');
      //   }
      // });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

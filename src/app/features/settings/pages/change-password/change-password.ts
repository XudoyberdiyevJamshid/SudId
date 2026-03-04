import { Component, inject } from '@angular/core';
import { GCard } from '../../../../shared/components/g-card/g-card';
import GButton from '../../../../shared/components/g-button/g-button';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import { Router } from '@angular/router';
import { GInput } from '../../../../shared/components/g-input/g-input';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GOption, GSelect } from '../../../../shared/components/g-select';

@Component({
  selector: 'app-change-password',
  imports: [
    GCard,
    GButton,
    GIcon,
    GInput,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    GOption,
    GSelect,
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  router = inject(Router);

  fb = inject(FormBuilder);

  passwordForm = this.fb.nonNullable.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    eriKey: ['', Validators.required],
  });

  getErrorMessage(constrolName: string) {
    const control = this.passwordForm.get(constrolName);
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

  eriKeys = [
    {
      id: '1',
      name: 'NURMUHAMMAD S.O.',
      jshshir: '12345678901234',
      date: '01.01.2024 - 01.01.2026',
    },
    { id: '2', name: 'TEST TESTOV', jshshir: '98765432109876', date: '15.05.2024 - 15.05.2026' },
  ];

  goBack() {
    this.router.navigate(['/dashboard/settings']);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log("Jo'natildi:", this.passwordForm.value);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}

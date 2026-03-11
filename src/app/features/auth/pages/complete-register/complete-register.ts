import { UserService } from './../../../../core/services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GInput } from '../../../../shared/components/g-input/g-input';
import { SwitchLanguage } from '../../../../layouts/components/switch-language/switch-language';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../../../core/auth/auth.config';

@Component({
  selector: 'app-complete-register',
  standalone: true,
  imports: [GIcon, GButton, ReactiveFormsModule, GInput, RouterLink, SwitchLanguage],
  templateUrl: './complete-register.html',
  styleUrl: './complete-register.scss',
})
export class CompleteRegister implements OnInit {
  private oauthService = inject(OAuthService);

  private fb = inject(FormBuilder);
  router = inject(Router);
  userService = inject(UserService);
  private userPhotoBase64: string = '';

  isFetching = signal<boolean>(false);
  isSaving = signal<boolean>(false);

  registerForm = this.fb.group({
    citizenship: [{ value: '', disabled: true }],
    username: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],

    pnfl: [{ value: '', disabled: false }],
    lastName: [{ value: '', disabled: true }],
    firstName: [{ value: '', disabled: true }],
    middleName: [{ value: '', disabled: true }],

    lastNameCyrillic: [{ value: '', disabled: true }],
    firstNameCyrillic: [{ value: '', disabled: true }],
    middleNameCyrillic: [{ value: '', disabled: true }],

    passport: [{ value: '', disabled: true }],
    birthDate: [{ value: '', disabled: true }],

    gender: [{ value: '', disabled: true }],
    nationality: [{ value: '', disabled: true }],
    address: ['', Validators.required],
  });

  ngOnInit(): void {
    const state = history.state;
    if (state && state.pinfl) {
      this.fetchPersonInfo(state.pinfl);
    } else {
      this.router.navigate(['/register']);
    }
  }

  fetchPersonInfo(pinfl: string) {
    this.isFetching.set(true);
    this.userService.getPersonInfo(pinfl).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          const data = res.data;

          this.userPhotoBase64 = data.photo;

          let formattedDate = data.birth_date;
          if (formattedDate && formattedDate.includes('-')) {
            const parts = formattedDate.split('-');
            if (parts.length === 3) formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
          }
          let autoGender = 'Ayol';
          if (data.pinpp && data.pinpp.length === 14) {
            const genderDigit = parseInt(data.pinpp.charAt(7), 10);

            if (genderDigit === 4 || genderDigit === 6) {
              autoGender = 'Erkak';
            }
          }
          this.registerForm.patchValue({
            username: data.surname_latin,
            citizenship: data.birth_country,
            pnfl: data.pinpp,
            nationality: data.nationality,
            lastName: data.surname_latin,
            firstName: data.name_latin,
            middleName: data.patronym_latin,
            lastNameCyrillic: data.surname_cyrillic,
            firstNameCyrillic: data.name_cyrillic,
            middleNameCyrillic: data.patronym_cyrillic,
            passport: `${data.doc_seria} ${data.doc_number}`,
            birthDate: formattedDate,
            gender: autoGender,
            address: data.living_region || '',
          });
        }
        this.isFetching.set(false);
      },
      error: (err) => {
        console.error("Pasport ma'lumotlarini olishda xatolik:", err);
        this.isFetching.set(false);
      },
    });
  }

  getErrorMessage(constrolName: string) {
    const control = this.registerForm.get(constrolName);
    if (control && control.invalid && (control.touched || control?.dirty)) {
      if (control?.hasError('required')) {
        return "Bu maydon to'ldirilishi shart";
      }
      if (control.hasError('email')) {
        return "Pochta formati noto'g'ri (masalan: test@mail.ru)";
      }
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSaving.set(true);
      const formData = this.registerForm.getRawValue();
      const payload = {
        ...formData,
        image_b64: this.userPhotoBase64,
        lang: 'UZ_LAT',
      };

      this.userService.saveUser(payload).subscribe({
        next: (response) => {
          this.isSaving.set(false);

          this.oauthService.configure(authConfig);

          this.oauthService.initCodeFlow();
        },
        error: (err) => {
          console.error("Ro'yxatdan o'tishda xato:", err);
          this.isSaving.set(false);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

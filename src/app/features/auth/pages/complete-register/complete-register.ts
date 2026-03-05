import { Component, inject } from '@angular/core';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { GOption, GSelect } from '../../../../shared/components/g-select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GInput } from '../../../../shared/components/g-input/g-input';

@Component({
  selector: 'app-complete-register',
  imports: [GIcon, GButton, GSelect, GOption, ReactiveFormsModule, GInput],
  templateUrl: './complete-register.html',
  styleUrl: './complete-register.scss',
})
export class CompleteRegister {
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    citizenship: ['uzb', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['+998 ', Validators.required],
    email: ['', [Validators.required, Validators.email]],

    pnfl: [{ value: '12345678901234', disabled: true }],
    lastName: [{ value: 'Sultonov', disabled: true }],
    firstName: [{ value: 'Nurmuhammad', disabled: true }],
    middleName: [{ value: "Ozod o'g'li", disabled: true }],

    lastNameCyrillic: [''],
    firstNameCyrillic: [''],
    middleNameCyrillic: [''],
    passport: [{ value: 'AA 1234567', disabled: true }],
    birthDate: [{ value: '15.10.2000', disabled: true }],
    gender: ['male', Validators.required],
    nationality: ['uzb', Validators.required],
    address: [''],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // this.router.navigate(['/dashboard']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

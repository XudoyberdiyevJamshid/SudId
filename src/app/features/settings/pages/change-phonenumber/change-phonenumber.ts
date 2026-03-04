import { Component, inject } from '@angular/core';
import { GCard } from '../../../../shared/components/g-card/g-card';
import { GInput } from '../../../../shared/components/g-input/g-input';
import GButton from '../../../../shared/components/g-button/g-button';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-phonenumber',
  imports: [GCard, GInput, GButton, GIcon, ReactiveFormsModule],
  templateUrl: './change-phonenumber.html',
  styleUrl: './change-phonenumber.scss',
})
export class ChangePhonenumber {
  router = inject(Router);

  fb = inject(FormBuilder);

  goBack() {
    this.router.navigate(['/dashboard/settings']);
  }

  phoneForm = this.fb.nonNullable.group({
    phone: ['', Validators.required],
  });

  onSubmit() {
    if (this.phoneForm.valid) {
      console.log("Jo'natildi:", this.phoneForm.value);
    } else {
      this.phoneForm.markAllAsTouched();
    }
  }
}

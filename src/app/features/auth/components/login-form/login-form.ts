import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GOptionNew } from '../../../../shared/components/g-select-new/g-option-new';
import { GSelectNew } from '../../../../shared/components/g-select-new/g-select-new';

import { GIcon } from '../../../../shared/components/g-icon/g-icon';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, GSelectNew, GOptionNew, GIcon],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  // Boshlanishida E-IMZO yo'q deb faraz qilamiz (Rasmdagi 1-holat)
  readonly hasEimzo = signal<boolean>(false); 

  readonly eriControl = new FormControl('');

  // Dropdown uchun namuna ma'lumotlar
  readonly eriKeys = [
    { id: '1', name: 'Nurmuhammad Sultonov Ozod o\'g\'li', jshshir: '12345678901234', date: '15.10.2029' },
    { id: '2', name: 'Eshmatov Toshmat', jshshir: '98765432109876', date: '10.05.2028' }
  ];

  // E-IMZO ni yuklab olish tugmasi bosilganda
  downloadEimzo() {
    console.log('E-IMZO yuklab olish sahifasiga o\'tish...');
  }

  // "Yangilash" tugmasi bosilganda (Hozircha test uchun hasEimzo ni true qilamiz)
  refreshEimzo() {
    console.log('E-IMZO holati tekshirilmoqda...');
    this.hasEimzo.set(true); // ERI kalitlar ro'yxati chiqadi (Rasmdagi 2-holat)
  }

  // "Kirish" tugmasi bosilganda
  onLogin() {
    if (this.eriControl.value) {
      console.log('Tizimga kirilmoqda. Tanlangan kalit ID:', this.eriControl.value);
    }
  }
}
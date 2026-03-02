import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GOptionNew } from '../../../../shared/components/g-select-new/g-option-new';
import { GSelectNew } from '../../../../shared/components/g-select-new/g-select-new';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import GButton from '../../../../shared/components/g-button/g-button';
import { GSelect, GOption } from '../../../../shared/components/g-select';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, GIcon, GButton, GSelect, GOption],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly hasEimzo = signal<boolean>(false);

  readonly eriControl = new FormControl('');

  readonly eriKeys = [
    {
      id: '1',
      name: "Nurmuhammad Sultonov Ozod o'g'li",
      jshshir: '12345678901234',
      date: '15.10.2029',
    },
    { id: '2', name: 'Eshmatov Toshmat', jshshir: '98765432109876', date: '10.05.2028' },
  ];

  downloadEimzo() {
    console.log("E-IMZO yuklab olish sahifasiga o'tish...");
  }

  refreshEimzo() {
    console.log('E-IMZO holati tekshirilmoqda...');
    this.hasEimzo.set(true);
  }

  onLogin() {
    if (this.eriControl.value) {
      console.log('Tizimga kirilmoqda. Tanlangan kalit ID:', this.eriControl.value);
    }
  }
}

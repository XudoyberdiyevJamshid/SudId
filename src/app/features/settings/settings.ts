import { Component, signal } from '@angular/core';
import { GCard } from '../../shared/components/g-card/g-card';
import { GIcon } from '../../shared/components/g-icon/g-icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [GCard, GIcon, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  menus = signal([
    { title: "Parolni o'zgaritirish", icon: 'lock', link: 'change-password' },
    { title: 'Telefon raqamini tahrirlash', icon: 'smartphone', link: 'change-phonenumber' },
    { title: 'Aktiv sessiyalar', icon: 'laptop', link: 'manage-sessions' },
    { title: 'Kirish tarixi', icon: 'timer-reset', link: 'login-history' },
  ]);
}

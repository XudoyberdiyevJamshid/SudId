import { Component } from '@angular/core';
import { Header } from './components/header/header';

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { GCard } from '../../shared/components/g-card/g-card';
import { GIcon } from '../../shared/components/g-icon/g-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Header, RouterOutlet, GCard, GIcon, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  readonly menus = [
    { path: '/dashboard/profile', icon: 'user', label: 'Foydalanuvchi profili' },
    { path: '/dashboard/sites', icon: 'link', label: 'Ulangan saytlar' },
    { path: '/dashboard/settings', icon: 'settings', label: 'Sozlamalar' },
  ];
}

import { Component, inject, signal } from '@angular/core';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import { SwitchLanguage } from '../../../components/switch-language/switch-language';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [GIcon, SwitchLanguage, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  authService = inject(AuthService);
  showLogoutModal = signal(false);

  confirmLogout() {
    this.authService.logOut();
  }
}

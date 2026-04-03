import { Component, inject, OnInit, signal } from '@angular/core';
import { GCard } from '../../shared/components/g-card/g-card';
import GButton from '../../shared/components/g-button/g-button';
import { GIcon } from '../../shared/components/g-icon/g-icon';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [GCard, GButton, GIcon],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);

  readonly userProfile = signal<any>(null);

  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const user = this.authService.getUserInfo();

    if (user) {
      this.userProfile.set({
        lastName: user.lastName ?? '',
        firstName: user.firstName ?? '',
        middleName: user.middleName ?? '',
        passport:
          user.passport_sn && user.passport_num ? `${user.passport_sn} ${user.passport_num}` : '',
        birthDate: user.birthDate ?? '',
        gender: user.gender ?? '',
        nationality: user.nationality ?? '',
        address: user.address ?? '',
        photo: user.image_b64 ? `data:image/jpeg;base64,${user.image_b64}` : null,
        jshshir: user.pnfl ?? '',
        citizenship: user.citizenship ?? '',
        username: user.username ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
      });
    }
    this.isLoading.set(false);
  }
}

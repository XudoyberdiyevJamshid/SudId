import { Component, signal } from '@angular/core';
import { GCard } from '../../shared/components/g-card/g-card';
import GButton from '../../shared/components/g-button/g-button';
import { GIcon } from '../../shared/components/g-icon/g-icon';

@Component({
  selector: 'app-profile',
  imports: [GCard, GButton, GIcon],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  readonly userProfile = signal({
    lastName: 'Familiyasi',
    firstName: 'Ismi',
    middleName: 'Sharifi',
    passport: 'AB 1234567',
    birthDate: '15.10.2000',
    gender: 'Erkak',
    nationality: "O'zbek",
    address: 'Toshkent sh., Shayhontohur tumani 7',
    photoUrl: 'https://i.pravatar.cc/300?img=11',
    jshshir: '12345678901234',
    citizenship: "O'zbekiston Respublikasi",
    username: 'Nurmuhammad.sultonov',
    phone: '+998 91 234 56 78',
    email: 'nurmuhammad.sultonov@mail.com',
  });
}

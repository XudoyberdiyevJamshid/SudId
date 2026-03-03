import { Component, signal } from '@angular/core';
import { GCard } from '../../shared/components/g-card/g-card';
import { GIcon } from '../../shared/components/g-icon/g-icon';

@Component({
  selector: 'app-sites',
  imports: [GCard, GIcon],
  templateUrl: './sites.html',
  styleUrl: './sites.scss',
})
export class Sites {
  sites = signal([
    {
      title: 'sudId',
      link: 'link',
      logo: '../../../assets/images/logo-blue.png',
    },
    {
      title: 'edo',
      link: 'https://edo.sud.uz',
      logo: '../../../assets/images/sud.png',
    },
    {
      title: 'adolat',
      link: 'https://cabinet.sud.uz',
      logo: '../../../assets/images/adolat.png',
    },
    {
      title: 'suduz',
      link: 'https://sud.uz',
      logo: '../../../assets/images/e-xsud.png',
    },
  ]);
}

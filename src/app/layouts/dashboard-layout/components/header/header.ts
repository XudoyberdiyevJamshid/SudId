import { Component } from '@angular/core';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import { SwitchLanguage } from '../../../components/switch-language/switch-language';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [GIcon, SwitchLanguage, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}

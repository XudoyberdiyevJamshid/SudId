import { Component, input } from '@angular/core';
import { GIcon } from '../g-icon/g-icon';

@Component({
  selector: 'g-icon-button',
  imports: [GIcon],
  templateUrl: './g-icon-button.html',
  styleUrl: './g-icon-button.scss',
})
export class GIconButton {
  iconName = input.required<string>();
  color = input<string>('inherit');
  size = input<string>('20px');
  title = input<string>('');
}

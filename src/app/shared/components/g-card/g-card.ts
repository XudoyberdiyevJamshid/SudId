import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GIcon } from '../g-icon/g-icon';


@Component({
  selector: 'g-card',
  imports: [GIcon,],
  templateUrl: './g-card.html',
  styleUrl: './g-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GCard {
  iconName = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  badge = input<boolean>(false);
  color = input<string>('#8A10ED');
  bgColor = input<string>('#F4D4FF4F');
}

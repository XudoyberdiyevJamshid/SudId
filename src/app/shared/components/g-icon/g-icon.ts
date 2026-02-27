import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IconService } from '../../../core/services/icon.service';
import { switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'g-icon',
  templateUrl: './g-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './g-icon.scss',
  standalone: true,
})
export class GIcon {
  private iconService = inject(IconService);

  name = input.required<string>();

  size = input<string>('20px');
  color = input<string>('inherit');

  svgContent = toSignal(
    toObservable(this.name).pipe(switchMap((iconName) => this.iconService.getIcon(iconName))),
    { initialValue: null },
  );
}

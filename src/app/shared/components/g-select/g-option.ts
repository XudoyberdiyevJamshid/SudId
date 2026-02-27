import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'g-option',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: none',
  },
})
export class GOption {
  readonly elementRef = inject(ElementRef);
  value = input.required<string>();
  icon = input<string>();
}

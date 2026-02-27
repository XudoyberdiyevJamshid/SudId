import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'g-option-new',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: none', // DOMda yashirin turadi, faqat ma'lumot tashish uchun
  },
})
export class GOptionNew {
  readonly elementRef = inject(ElementRef);
  readonly value = input.required<string>();
  readonly icon = input<string>();
}

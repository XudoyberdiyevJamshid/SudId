import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'g-option',
  standalone: true,
  template: '<ng-template><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display: none',
  },
})
export class GOption {
  readonly value = input.required<string>();
  readonly label = input<string>(''); 
  readonly subLabel = input<string>('');
  
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
}
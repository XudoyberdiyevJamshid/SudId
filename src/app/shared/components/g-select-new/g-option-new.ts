import { ChangeDetectionStrategy, Component, input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'g-option-new',
  standalone: true,

  template: '<ng-template><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GOptionNew {
  readonly value = input.required<string>();
  readonly label = input<string>(''); // Select yopilganda Inputda ko'rinadigan matn

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
}

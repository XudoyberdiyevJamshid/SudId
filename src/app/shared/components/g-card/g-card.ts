import { Component } from '@angular/core';

@Component({
  selector: 'g-card',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: `
      block
      p-5
      rounded-3xl
      bg-white
    `,
  },
})
export class GCard {}

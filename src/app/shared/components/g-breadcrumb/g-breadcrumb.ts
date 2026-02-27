import { Component, HostBinding, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { GIcon } from '../g-icon/g-icon';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'g-breadcrumb',
  standalone: true,
  imports: [RouterLink, NgClass, GIcon],
  template: `
    <nav class="breadcrumb">
      <!-- Home icon -->
      <a routerLink="/" class="breadcrumb-item">
        <g-icon name="home" [color]="color()"></g-icon>
      </a>

      <!-- Separator and Items -->
      @for (item of items(); track $index) {
        <!-- Separator -->
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          [ngClass]="{
            separator: true,
            'separator-muted': $index === items().length - 1,
          }"
        >
          <path
            d="M8.35835 9.40834L4.82502 5.87501C4.74748 5.7969 4.65541 5.73491 4.55386 5.6926C4.45231 5.65029 4.34339 5.62851 4.23335 5.62851C4.12332 5.62851 4.0144 5.65029 3.91285 5.6926C3.8113 5.73491 3.71913 5.7969 3.64168 5.87501C3.48655 6.03114 3.39941 6.24235 3.39941 6.46251C3.39941 6.68266 3.48655 6.89387 3.64168 7.05001L6.59168 10L3.64168 12.95C3.48655 13.1061 3.39941 13.3174 3.39941 13.5375C3.39941 13.7577 3.48655 13.9689 3.64168 14.125C3.71954 14.2022 3.81191 14.2633 3.91344 14.3048C4.01497 14.3463 4.12369 14.3673 4.23335 14.3667C4.34301 14.3673 4.45173 14.3463 4.55326 14.3048C4.65479 14.2633 4.74716 14.2022 4.82502 14.125L8.35835 10.5917C8.43646 10.5142 8.49845 10.422 8.5408 10.3205C8.58314 10.2189 8.60482 10.11 8.60482 10C8.60482 9.89 8.58314 9.78108 8.5408 9.67953C8.49845 9.57798 8.43646 9.48581 8.35835 9.40834Z"
            [attr.fill]="color()"
          />
        </svg>

        <!-- Item -->
        @if (item.url && $index !== items().length - 1) {
          <a [routerLink]="item.url" class="breadcrumb-item">
            {{ item.label }}
          </a>
        } @else {
          <span class="breadcrumb-item breadcrumb-item-current">
            {{ item.label }}
          </span>
        }
      }
    </nav>
  `,
  styleUrl: './g-breadcrumb.scss',
})
export class GBreadcrumb {
  items = input.required<BreadcrumbItem[]>();
  color = input<string>('white');

  @HostBinding('style.--breadcrumb-color')
  get breadcrumbColor() {
    return this.color();
  }
}

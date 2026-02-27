import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { GIcon } from '../g-icon/g-icon';
import { GOption } from './g-option';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'g-select',
  imports: [GIcon],
  templateUrl: './g-select.html',
  styleUrl: './g-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GSelect {
  private elementRef = inject(ElementRef);

  // Content children - query all g-option components
  private optionComponents = contentChildren(GOption);

  // Inputs
  value = input<string>('');
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);
  customClass = input<string>('');
  bgColor = input<string>('');
  textColor = input<string>('');
  icon = input<string>('');
  iconSize = input<string>('20px');
  iconColor = input<string>('');
  placeholderColor = input<string>('');
  selectWidth = input<string>('');

  // Outputs
  valueChange = output<string>();

  // Internal state
  isOpen = signal<boolean>(false);
  dropdownElement = viewChild<ElementRef>('dropdown');

  // Computed properties - build options array from content children
  options = computed<SelectOption[]>(() => {
    return this.optionComponents().map((optionComp) => ({
      value: optionComp.value(),
      label: this.getOptionLabel(optionComp),
      icon: optionComp.icon(),
    }));
  });

  selectedOption = computed(() => {
    const currentValue = this.value();
    return this.options().find((opt) => opt.value === currentValue) || null;
  });

  displayLabel = computed(() => {
    const selected = this.selectedOption();
    return selected ? selected.label : this.placeholder();
  });

  displayIcon = computed(() => {
    if (this.icon()) return this.icon();
    const selected = this.selectedOption();
    return selected?.icon || null;
  });

  resolvedIconColor = computed(() => {
    const hasSelected = this.hasSelection();
    // When not selected, use placeholderColor; when selected, use iconColor
    if (!hasSelected && this.placeholderColor()) {
      return this.placeholderColor();
    }
    return this.iconColor() || 'currentColor';
  });

  resolvedChevronColor = computed(() => {
    const hasSelected = this.hasSelection();
    // When not selected, use placeholderColor; when selected, use textColor
    if (!hasSelected && this.placeholderColor()) {
      return this.placeholderColor();
    }
    return this.textColor() || 'currentColor';
  });

  resolvedLabelColor = computed(() => {
    const hasSelected = this.hasSelection();
    // When not selected, use placeholderColor; when selected, use textColor
    if (!hasSelected && this.placeholderColor()) {
      return this.placeholderColor();
    }
    return this.textColor() || null;
  });

  hasSelection = computed(() => this.selectedOption() !== null);

  selectClasses = computed(() => {
    return [
      'g-select',
      this.disabled() ? 'g-select--disabled' : '',
      this.isOpen() ? 'g-select--open' : '',
      this.bgColor() ? 'g-select--custom-bg' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    // Close dropdown when clicking outside
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => {
          document.addEventListener('click', this.handleOutsideClick);
        }, 0);
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    });
  }

  private getOptionLabel(optionComponent: GOption): string {
    const element = optionComponent.elementRef.nativeElement;
    return element.textContent?.trim() || '';
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  };

  toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen.update((value) => !value);
    }
  }

  selectOption(option: SelectOption): void {
    if (!this.disabled()) {
      this.valueChange.emit(option.value);
      this.isOpen.set(false);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleDropdown();
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
        } else {
          this.navigateOptions(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.navigateOptions(-1);
        }
        break;
    }
  }

  private navigateOptions(direction: number): void {
    const opts = this.options();
    const currentIndex = opts.findIndex((opt) => opt.value === this.value());
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < opts.length) {
      this.valueChange.emit(opts[nextIndex].value);
    }
  }

  isSelected(option: SelectOption): boolean {
    return option.value === this.value();
  }
}

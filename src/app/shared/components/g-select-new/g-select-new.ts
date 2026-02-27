import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { GOptionNew } from './g-option-new';
// Agar o'zingizning g-icon ishlatsangiz: import { GIcon } from '../g-icon/g-icon';

export interface SelectOptionNew {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'g-select-new',
  standalone: true,
  imports: [NgClass, OverlayModule], // GIcon kerak bo'lsa qo'shib qo'yasiz
  templateUrl: './g-select-new.html',
  styleUrl: './g-select-new.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GSelectNew),
      multi: true,
    },
  ],
})
export class GSelectNew implements ControlValueAccessor {
  private elementRef = inject(ElementRef);
  private optionComponents = contentChildren(GOptionNew);

  // Inputs
  readonly label = input<string>('');
  readonly placeholder = input<string>('Tanlang');
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>('');
  readonly customClass = input<string>('');

  // CVA state
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private readonly disabledByForm = signal(false);

  readonly internalValue = signal<string>('');
  readonly isOpen = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  readonly options = computed<SelectOptionNew[]>(() => {
    return this.optionComponents().map((optionComp) => ({
      value: optionComp.value(),
      label: this.getOptionLabel(optionComp),
      icon: optionComp.icon(),
    }));
  });

  readonly selectedOption = computed(() => {
    const currentValue = this.internalValue();
    return this.options().find((opt) => opt.value === currentValue) || null;
  });

  readonly displayLabel = computed(() => {
    const selected = this.selectedOption();
    return selected ? selected.label : this.placeholder();
  });

  readonly hasSelection = computed(() => this.selectedOption() !== null);

  private getOptionLabel(optionComponent: GOptionNew): string {
    return optionComponent.elementRef.nativeElement.textContent?.trim() || '';
  }

  toggleDropdown(): void {
    if (this.isDisabled()) return;
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.onTouched();
      this.isFocused.set(false);
    } else {
      this.isFocused.set(true);
    }
  }

  selectOption(option: SelectOptionNew): void {
    if (this.isDisabled()) return;
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
    this.isFocused.set(false);
  }

  closeDropdown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.onTouched();
      this.isFocused.set(false);
    }
  }

  // CVA Methods
  writeValue(value: string | null | undefined): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleDropdown();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
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
    const currentIndex = opts.findIndex((opt) => opt.value === this.internalValue());
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < opts.length) {
      this.internalValue.set(opts[nextIndex].value);
      this.onChange(opts[nextIndex].value);
    }
  }
}

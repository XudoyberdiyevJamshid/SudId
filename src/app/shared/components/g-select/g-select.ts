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
  signal,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { GIcon } from '../g-icon/g-icon';
import { GOption } from './g-option';

export interface SelectOption {
  value: string;
  label: string;
  template: any;
}

@Component({
  selector: 'g-select',
  standalone: true,
  imports: [GIcon, NgClass, NgTemplateOutlet],
  templateUrl: './g-select.html',
  styleUrl: './g-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GSelect),
      multi: true,
    },
  ],
  host: {
    class: 'block w-full', // Sakrashni oldini olish uchun
  },
})
export class GSelect implements ControlValueAccessor {
  private elementRef = inject(ElementRef);
  private optionComponents = contentChildren(GOption);

  // Inputs
  readonly placeholder = input<string>('Tanlang');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');

  // CVA state
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private readonly disabledByForm = signal(false);

  readonly internalValue = signal<string>('');
  readonly isOpen = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  readonly options = computed<SelectOption[]>(() => {
    return this.optionComponents().map((opt) => ({
      value: opt.value(),
      label: opt.label(),
      template: opt.template,
    }));
  });

  readonly selectedOption = computed(() => {
    return this.options().find((opt) => opt.value === this.internalValue()) || null;
  });

  readonly hasSelection = computed(() => this.selectedOption() !== null);

  constructor() {
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

  private handleOutsideClick = (event: MouseEvent): void => {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
      this.onTouched();
      this.isFocused.set(false);
    }
  };

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

  selectOption(option: SelectOption): void {
    if (this.isDisabled()) return;
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
    this.isFocused.set(false);
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
        this.isOpen.set(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) this.isOpen.set(true);
        else this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) this.navigateOptions(-1);
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

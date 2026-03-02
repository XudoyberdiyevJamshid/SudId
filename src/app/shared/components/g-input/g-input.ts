import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { GIcon } from '../g-icon/g-icon';

export type GInputType = 'text' | 'number' | 'email' | 'password' | 'phone';

function formatNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const num = String(value).replace(/\D/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatPhone(value: string): string {
  let nums = value.replace(/\D/g, '');

  if (nums.startsWith('998')) {
    nums = nums.substring(3);
  }

  nums = nums.substring(0, 9);

  if (nums.length === 0) return '+998 ';

  let formatted = '+998 ';
  if (nums.length > 0) formatted += nums.substring(0, 2);
  if (nums.length > 2) formatted += ' ' + nums.substring(2, 5);
  if (nums.length > 5) formatted += '-' + nums.substring(5, 7);
  if (nums.length > 7) formatted += '-' + nums.substring(7, 9);

  return formatted;
}

@Component({
  selector: 'g-input',
  standalone: true,
  imports: [NgClass, GIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GInput),
      multi: true,
    },
  ],
  templateUrl: './g-input.html',
  styleUrl: './g-input.scss',
})
export class GInput implements ControlValueAccessor {
  readonly type = input<GInputType>('text');
  readonly placeholder = input<string>('');
  readonly label = input<string>('');
  readonly icon = input<string | undefined>(undefined);
  readonly iconColor = input<string | undefined>(undefined);
  readonly error = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly value = input<string | number | null | undefined>(undefined);

  readonly valueChange = output<string | number>();

  readonly internalValue = signal<string | number>('');
  readonly isFocused = signal<boolean>(false);
  private readonly disabledByForm = signal<boolean>(false);

  readonly showPassword = signal<boolean>(false);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  readonly currentType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type() === 'number' ? 'text' : this.type();
  });

  readonly displayValue = computed<string>(() => {
    if (this.type() === 'number') {
      return formatNumber(this.internalValue());
    }
    if (this.type() === 'phone') {
      return formatPhone(String(this.internalValue() ?? ''));
    }
    return String(this.internalValue() ?? '');
  });

  constructor() {
    effect(() => {
      const v = this.value();
      if (v !== undefined) {
        this.internalValue.set(v ?? '');
      }
    });
  }

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (this.type() === 'number') {
      const digitsOnly = inputElement.value.replace(/\D/g, '');
      const rawNumber = digitsOnly === '' ? '' : Number(digitsOnly);
      this.internalValue.set(rawNumber);
      this.onChange(rawNumber);
      this.valueChange.emit(rawNumber);
    } else if (this.type() === 'phone') {
      const formatted = formatPhone(inputElement.value);
      inputElement.value = formatted;
      const rawPhone = formatted.replace(/\s|-/g, '');
      this.internalValue.set(rawPhone);
      this.onChange(rawPhone);
      this.valueChange.emit(rawPhone);
    } else {
      const rawValue = inputElement.value;
      this.internalValue.set(rawValue);
      this.onChange(rawValue);
      this.valueChange.emit(rawValue);
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  writeValue(value: string | number | null | undefined): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }
}

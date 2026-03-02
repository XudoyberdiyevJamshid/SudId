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
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { GOptionNew } from './g-option-new';

@Component({
  selector: 'g-select-new',
  standalone: true,
  imports: [NgClass, OverlayModule, NgTemplateOutlet],
  templateUrl: './g-select-new.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // 💡 MILTILLASHNI O'LDIRADIGAN ASOSIY QISMI:
    class: 'block w-full',
  },
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
  readonly optionComponents = contentChildren(GOptionNew);

  readonly label = input<string>('');
  readonly placeholder = input<string>('Tanlang');
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>('');
  readonly customClass = input<string>('');
  readonly error = input<string>('');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private readonly disabledByForm = signal(false);

  readonly internalValue = signal<string>('');
  readonly isOpen = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  readonly selectedOption = computed(() => {
    return this.optionComponents().find((opt) => opt.value() === this.internalValue()) || null;
  });

  readonly displayLabel = computed(() => {
    const selected = this.selectedOption();
    return selected?.label() || this.placeholder();
  });

  readonly hasSelection = computed(() => this.selectedOption() !== null);

  toggleDropdown(): void {
    if (this.isDisabled()) return;
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.onTouched();
      this.isFocused.set(false);
    } else this.isFocused.set(true);
  }

  selectOption(option: GOptionNew): void {
    if (this.isDisabled()) return;
    this.internalValue.set(option.value());
    this.onChange(option.value());
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
        this.closeDropdown();
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
    const opts = this.optionComponents();
    const currentIndex = opts.findIndex((opt) => opt.value() === this.internalValue());
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < opts.length) {
      this.internalValue.set(opts[nextIndex].value());
      this.onChange(opts[nextIndex].value());
    }
  }
}

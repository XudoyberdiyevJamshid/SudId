import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'white'
  | 'outline-primary'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'full' | 'lg' | 'md' | 'sm' | 'none';

@Component({
  selector: 'g-button',
  imports: [],
  templateUrl: './g-button.html',
  styleUrl: './g-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
class GButton {
  readonly title = input<string>('');
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly rounded = input<ButtonRounded>('full');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly customClass = input<string>('');

  readonly variantClasses = computed(() => {
    const variants: Record<ButtonVariant, string> = {
      secondary: 'bg-[#F9F9F9] text-[#2C8CE6] hover:bg-secondary-700',
      primary: 'bg-primary-700 text-white hover:opacity-95',
      'outline-primary': ' text-primary-700  border  shadow-none!  border! active-none!  ',
      outline: 'bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-50',
      ghost: 'bg-transparent text-primary-700 hover:bg-primary-50',
      white: 'bg-white text-primary-700 hover:bg-primary-50',
      danger: 'bg-red-500 text-white  hover:bg-red-600',
    };
    return variants[this.variant()];
  });

  readonly sizeClasses = computed(() => {
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-[1.125rem] text-[13px]',
      lg: 'px-8 py-4 text-lg',
    };
    return sizes[this.size()];
  });

  readonly roundedClasses = computed(() => {
    const rounded: Record<ButtonRounded, string> = {
      full: 'rounded-full',
      lg: 'rounded-2xl',
      md: 'rounded-xl',
      sm: 'rounded-lg',
      none: 'rounded-none',
    };
    return rounded[this.rounded()];
  });

  readonly buttonClasses = computed(() => {
    return [
      'g-button font-semibold',
      this.variantClasses(),
      this.sizeClasses(),
      this.roundedClasses(),
      this.fullWidth() ? 'w-full' : '',
      this.disabled() || this.loading() ? 'opacity-80 cursor-not-allowed shadow-none' : '',
      this.customClass(),
    ]
      .filter(Boolean)
      .join(' ');
  });
}

export default GButton;

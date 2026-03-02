import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChildren,
} from '@angular/core';
import { GIcon } from '../g-icon/g-icon';
import GButton from '../g-button/g-button';

@Component({
  selector: 'app-otp-modal',
  imports: [GIcon, GButton],
  templateUrl: './otp-modal.html',
  styleUrl: './otp-modal.scss',
})
export class OtpModal implements OnInit, OnDestroy {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject(DIALOG_DATA, { optional: true });

  readonly otpValues = signal<string[]>(['', '', '', '', '', '']);
  readonly inputs = viewChildren<ElementRef<HTMLInputElement>>('otpInput');
  readonly timeLeft = signal<number>(59);
  private timerInterval: any;
  ngOnInit() {
    this.startTimer();
  }
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timeLeft.set(59);
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((t) => t - 1);
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 1) {
      value = value.slice(-1);
    }
    input.value = value;

    const currentValues = [...this.otpValues()];
    currentValues[index] = value;
    this.otpValues.set(currentValues);

    if (value && index < 5) {
      this.focusInput(index + 1);
    }

    if (currentValues.every((v) => v !== '')) {
      this.verifyOtp(currentValues.join(''));
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const currentValues = [...this.otpValues()];

      if (!currentValues[index] && index > 0) {
        this.focusInput(index - 1);
        currentValues[index - 1] = '';
      } else {
        currentValues[index] = '';
      }
      this.otpValues.set(currentValues);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusInput(index - 1);
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.focusInput(index + 1);
    }
  }

  focusInput(index: number) {
    const inputElements = this.inputs();
    if (inputElements[index]) {
      setTimeout(() => inputElements[index].nativeElement.focus(), 10);
    }
  }

  verifyOtp(code: string) {
    console.log("Jo'natilayotgan OTP:", code);

    this.dialogRef.close(code);
  }

  close() {
    this.dialogRef.close();
  }

  resend() {
    if (this.timeLeft() === 0) {
      console.log('SMS qayta yuborildi!');
      this.otpValues.set(['', '', '', '', '', '']);
      this.startTimer();
      this.focusInput(0);
    }
  }
}

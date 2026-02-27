import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

interface AuthSlide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  readonly slides = signal<AuthSlide[]>([
    {
      image: 'assets/images/sud-building.jpg',
      title: 'Sud xizmatlaridan foydalanishda, ro\'yxatdanga oluvchi yagona platforma',
      description: 'Yagona avtorizatsiya xizmati foydalanuvchilarga bir xil kirish ma\'lumotlari bilan turli xizmatlarga kirishni ta\'minlaydi. Bu xavfsizlikni oshirib, tajribani soddalashtiradi.'
    },

  ]);

  readonly currentSlide = signal<number>(0);

  nextSlide() {
    this.currentSlide.update(curr => (curr + 1) % this.slides().length);
  }

  prevSlide() {
    this.currentSlide.update(curr => curr === 0 ? this.slides().length - 1 : curr - 1);
  }
}

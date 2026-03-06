import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { GIcon } from '../../shared/components/g-icon/g-icon';

interface AuthSlide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, GIcon, RouterLinkWithHref],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  readonly slides = signal<AuthSlide[]>([
    {
      image: '../../../assets/images/court-office.png',
      title: "Sud xizmatlaridan foydalanishda, ro'yxatdanga oluvchi yagona platforma",
      description:
        "Yagona avtorizatsiya xizmati foydalanuvchilarga bir xil kirish ma'lumotlari bilan turli xizmatlarga kirishni ta'minlaydi. Bu xavfsizlikni oshirib, tajribani soddalashtiradi.",
    },
    {
      image: '../../assets/images/slied2.jpg',
      title: "Sud xizmatlaridan foydalanishda, ro'yxatdanga oluvchi yagona platforma",
      description:
        "Yagona avtorizatsiya xizmati foydalanuvchilarga bir xil kirish ma'lumotlari bilan turli xizmatlarga kirishni ta'minlaydi. Bu xavfsizlikni oshirib, tajribani soddalashtiradi.",
    },
    {
      image: '../../assets/images/slied3.jpg',
      title: "Sud xizmatlaridan foydalanishda, ro'yxatdanga oluvchi yagona platforma",
      description:
        "Yagona avtorizatsiya xizmati foydalanuvchilarga bir xil kirish ma'lumotlari bilan turli xizmatlarga kirishni ta'minlaydi. Bu xavfsizlikni oshirib, tajribani soddalashtiradi.",
    },
  ]);

  readonly currentSlide = signal<number>(0);

  nextSlide() {
    this.currentSlide.update((curr) => (curr + 1) % this.slides().length);
  }

  prevSlide() {
    this.currentSlide.update((curr) => (curr === 0 ? this.slides().length - 1 : curr - 1));
  }
}

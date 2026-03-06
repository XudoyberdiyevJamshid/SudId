import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLang = signal<string>(localStorage.getItem('lang') || 'UZ_LAT');

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.currentLang.set(lang);

    window.location.reload();
  }
}

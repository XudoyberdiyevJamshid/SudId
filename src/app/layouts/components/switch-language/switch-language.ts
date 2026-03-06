import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { GSelect } from '../../../shared/components/g-select';
import { GIcon } from '../../../shared/components/g-icon/g-icon';
import { LanguageService } from '../../../core/services/language/language';

@Component({
  selector: 'app-switch-language',
  imports: [GSelect, GIcon],
  templateUrl: './switch-language.html',
  styleUrl: './switch-language.scss',
})
export class SwitchLanguage {
  languageService = inject(LanguageService);
  elementRef = inject(ElementRef);

  isOpen = signal(false);

  languages = [
    { code: 'UZ_LAT', label: "O'zbekcha" },
    { code: 'UZ_CYR', label: 'Ўзбекча' },
    { code: 'RU', label: 'Русский' },
    { code: 'EN', label: 'English' },
  ];

  currentLangCode = this.languageService.currentLang;

  currentLangLabel() {
    return this.languages.find((l) => l.code === this.currentLangCode())?.label || "O'zbekcha";
  }

  toggle() {
    this.isOpen.update((v) => !v);
  }

  selectLang(code: string) {
    this.languageService.setLanguage(code);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}

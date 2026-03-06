import { LanguageService } from './../../services/language/language';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const languageService = inject(LanguageService);
  const currentLang = languageService.currentLang();

  const clonedRequest = req.clone({
    setHeaders: {
      lang: currentLang,
    },
  });

  return next(clonedRequest);
};

import { LanguageService } from './../../services/language/language';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const languageService = inject(LanguageService);
  const currentLang = languageService.currentLang();

  let deviceId = localStorage.getItem('device-id');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('device-id', deviceId);
  }

  const getDeviceName = () => {
    // const agent = window.navigator.userAgent;
    // if (agent.includes('Windows')) return 'Windows PC';
    // if (agent.includes('Mac')) return 'Mac OS';
    // if (agent.includes('Linux')) return 'Linux PC';
    // if (agent.includes('Android')) return 'Android Device';
    // if (agent.includes('iPhone') || agent.includes('iPad')) return 'iOS Device';
    return 'WEB';
  };

  const clonedRequest = req.clone({
    setHeaders: {
      lang: currentLang,
      'X-Real-IP': '127.0.0.1',
      'device-id': deviceId,
      'device-name': getDeviceName(),
    },
  });

  return next(clonedRequest);
};

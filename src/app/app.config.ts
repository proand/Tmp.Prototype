import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);

import { appRoutes } from './app.routes';
import { mockDbInterceptor } from './core/mock-db.interceptor';
import { prototypeRoutes } from './views/prototype/prototype.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([mockDbInterceptor])),
    provideRouter(appRoutes),
    provideRouter(prototypeRoutes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    { provide: LOCALE_ID, useValue: 'nb' },
  ],
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpTokenInterceptor } from '@core/interceptors/http-token/http-token.interceptor';
import { httpErrorInterceptor } from '@core/interceptors/http-error/http-error.interceptor';
import { StorageService } from '@core/services/app-services/storage/storage.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withFetch(),
      withInterceptors([httpTokenInterceptor, httpErrorInterceptor])
    ),
    StorageService,
  ]
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '@core/services/app-services/storage/storage.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getToken();

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }

  return next(req);
};

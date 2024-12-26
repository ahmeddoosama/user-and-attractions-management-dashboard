import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotificationService } from '@core/services/app-services/notification/notification.service';
import { StorageService } from '@core/services/app-services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const isLoggedIn = storage.isAuthorized();
  const notification = inject(NotificationService);

  if(isLoggedIn) {
    return true;
  } else {
    notification.error('You must be logged in to access this page');
    return router.navigate(['/login']);
  }
};

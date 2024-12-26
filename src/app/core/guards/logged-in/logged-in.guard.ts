import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@core/services/app-services/storage/storage.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const isLoggedIn = storage.isAuthorized();

  if(isLoggedIn) {
    return router.navigate(['/']);
  } else {
    return true;
  }
};

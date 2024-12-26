import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { loggedInGuard } from '@core/guards/logged-in/logged-in.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    canActivate: [loggedInGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

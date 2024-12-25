import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

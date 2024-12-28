import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { loggedInGuard } from '@core/guards/logged-in/logged-in.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent),
    title: 'Profile',
    canActivate: [authGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    title: 'Users',
    canActivate: [authGuard]
  },
  {
    path: 'attractions',
    loadComponent: () => import('./pages/attractions/attractions.component').then(m => m.AttractionsComponent),
    title: 'Attractions',
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent),
    title: 'Profile',
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    canActivate: [loggedInGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

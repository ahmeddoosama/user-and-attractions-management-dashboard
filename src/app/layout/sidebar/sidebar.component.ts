import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tap } from '@core/interfaces/layout.interface';

const enum Routes {
  Dashboard = '/dashboard',
  Users = '/users',
  Attractions = '/attractions'
}

const MODULES = [
  MatIconModule,
  CommonModule,
  RouterModule,
  MatInputModule,
  MatFormFieldModule
]

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MODULES],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  private readonly router: Router = inject(Router);

  readonly tabs: Tap[] = [
    { title: 'Dashboard', icon: 'dashboard', path: Routes.Dashboard },
    { title: 'Users', icon: 'people', path: Routes.Users },
    { title: 'Attractions', icon: 'attractions', path: Routes.Attractions }
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

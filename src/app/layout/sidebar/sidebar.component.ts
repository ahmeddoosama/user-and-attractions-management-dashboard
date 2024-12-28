import { Component, inject, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tap } from '@core/interfaces/layout.interface';
import { SidebarService } from '@core/services/app-changes/sidebar.service';

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
  readonly sidebarService = inject(SidebarService);

  readonly tabs: Tap[] = [
    { title: 'Dashboard', icon: 'dashboard', path: Routes.Dashboard },
    { title: 'Users', icon: 'people', path: Routes.Users },
    { title: 'Attractions', icon: 'attractions', path: Routes.Attractions }
  ];

  isExpanded$ = this.sidebarService.isExpanded$;
  isMobileOpen$ = this.sidebarService.isMobileOpen$;

  /**
   * Handle clicks outside the sidebar
   * Closes mobile sidebar when clicking outside
   */
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (window.innerWidth <= 768 && !target.closest('app-sidebar') && !target.closest('.toggle-sidebar-btn')) {
      this.sidebarService.closeMobile();
    }
  }

  /** Check if the given path is currently active */
  isActive(path: string): boolean {
    return this.router.url === path;
  }

  /**
   * Navigate to the specified path
   * Closes mobile sidebar after navigation
   */
  navigateTo(path: string): void {
    this.router.navigate([path]);
    if (window.innerWidth <= 768) {
      this.sidebarService.closeMobile();
    }
  }

  /**
   * Toggle sidebar state when clicking filter
   * On desktop: Expands if collapsed
   * On mobile: Opens if closed
   */
  toggleSidebar(): void {
    if (window.innerWidth > 768) {
      if (!this.sidebarService.isExpandedValue) {
        this.sidebarService.toggleExpanded();
      }
    } else {
      if (!this.sidebarService.isMobileOpenValue) {
        this.sidebarService.toggleMobile();
      }
    }
  }
}

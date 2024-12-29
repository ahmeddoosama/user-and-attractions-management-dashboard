import { Component, inject, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tab } from '@core/interfaces/layout.interface';
import { SidebarService } from '@core/services/app-changes/sidebar.service';
import { ActiveTabService } from '@core/services/app-changes/active-tab.service';
import { Subscription } from 'rxjs';

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

export class SidebarComponent implements OnInit, OnDestroy {
  private readonly router: Router = inject(Router);
  readonly activeTabService = inject(ActiveTabService);
  readonly sidebarService = inject(SidebarService);
  private routerSubscription?: Subscription;

  readonly tabs: Tab[] = [
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

  ngOnInit() {
    // Subscribe to route changes
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveTabFromRoute();
      }
    });
  }

  // Set initial active tab
  private setActiveTabFromRoute(): void {
    const currentPath = this.router.url;
    const activeTab = this.tabs.find(tab => tab.path === currentPath) || this.tabs[0];
    this.activeTabService.setActiveTab(activeTab);
  }

  /** Check if the given path is currently active */
  isActive(path: string): boolean {
    return this.router.url === path;
  }

  changeActiveTab(tab: Tab): void {
    this.router.navigate([tab.path]);

    if (window.innerWidth <= 768) {
      this.sidebarService.closeMobile();
    }

    this.activeTabService.setActiveTab(tab);
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

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}

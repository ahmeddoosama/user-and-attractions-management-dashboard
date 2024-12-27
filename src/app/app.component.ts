import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, SidebarComponent } from './layout';
import { filter, Subject, takeUntil } from 'rxjs';

const COMPONENTS = [HeaderComponent, SidebarComponent, FooterComponent];
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'] as const;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  private router = inject(Router);
  private destroy$ = new Subject<void>();

  isAuthRoute: boolean = false;

  constructor() {
    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isAuthRoute = AUTH_ROUTES.some(route =>
        this.router.url.startsWith(route)
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

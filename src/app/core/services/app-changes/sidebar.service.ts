import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service responsible for managing the sidebar state across the application
 * Handles both desktop (expanded/collapsed) and mobile (open/closed) states
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  /** BehaviorSubject for large screen sidebar state - starts expanded */
  private isExpandedSubject = new BehaviorSubject<boolean>(true);

  /** BehaviorSubject for small screen sidebar state - starts closed */
  private isMobileOpenSubject = new BehaviorSubject<boolean>(false);

  /** Observable for large screen sidebar state */
  isExpanded$ = this.isExpandedSubject.asObservable();

  /** Observable for small screen sidebar state */
  isMobileOpen$ = this.isMobileOpenSubject.asObservable();

  /** Get current large screen sidebar state */
  get isExpandedValue(): boolean {
    return this.isExpandedSubject.value;
  }

  /** Get current small screen sidebar state */
  get isMobileOpenValue(): boolean {
    return this.isMobileOpenSubject.value;
  }

  /** Toggle large screen sidebar between expanded and collapsed states */
  toggleExpanded(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  /** Toggle small screen sidebar between open and closed states */
  toggleMobile(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  /** Close small screen sidebar - used when navigating or clicking outside */
  closeMobile(): void {
    this.isMobileOpenSubject.next(false);
  }
}

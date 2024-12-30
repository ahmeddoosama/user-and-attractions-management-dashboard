import { Injectable } from '@angular/core';
import { Dashboard } from '@core/models/dashboard/dashboard.class';
import { CoreRequestService } from '@core/services/api-services/core-request/core-request.service';
import { format } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private coreRequest: CoreRequestService
  ) { }

  /**
   * Get daily pets sales data for a specific date
   * @param date Date to get sales data for
   * @returns Observable with pets sales data
   */
  getDailyPetsSales(date: Date): Observable<any> {
    const formattedDate = this.formatDate(date);
    return this.coreRequest.get(Dashboard.BaseUrl + '/' + formattedDate);
  }

  /**
   * Get pets data for the last 7 days from a specific date
   * @param date Reference date
   * @returns Observable with 7 days pets data
   */
  getPets7Days(date: Date): Observable<any> {
    const formattedDate = this.formatDate(date);
    return this.coreRequest.get(Dashboard.Pets7DaysUrl + '/' + formattedDate);
  }

  /**
   * Format date to YYYY-MM-DD
   * @param date Date to format
   * @returns Formatted date string
   */
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }
}

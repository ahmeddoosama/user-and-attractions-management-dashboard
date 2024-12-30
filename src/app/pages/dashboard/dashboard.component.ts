import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '@core/services/app-services/dashboard/dashboard.service';
import { ContainerComponent } from '@layout/container/container.component';
import { ChartService } from '@core/services/app-services/dashboard/chart.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DailyPetSale, PetsSalesData } from '@core/interfaces/dashboard-chart.interface';
import { BaseChartDirective } from 'ng2-charts';
import { finalize, forkJoin } from 'rxjs';
import { NotificationService } from '@core/services/app-services/notification/notification.service';

const COMPONENTS = [ContainerComponent] as const;
const MODULES = [ BaseChartDirective ] as const;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [COMPONENTS, MODULES],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  /**
   * Data for the line chart
   */
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  /**
   * Options for the line chart
   */
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  /**
   * Data for the pie chart
   */
  public pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  /**
   * Options for the pie chart
   */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  isLoading = false;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.loadDashboardData(new Date());
  }

  /**
   * Loads all dashboard data by making parallel API calls using forkJoin
   * Updates both line and pie charts with the fetched data
   * @param date The reference date for fetching data
   */
  loadDashboardData(date: Date) {
    this.isLoading = true;

    forkJoin({
      weeklyData: this.dashboardService.getPets7Days(date),
      dailyData: this.dashboardService.getDailyPetsSales(date)
    })
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: ({ weeklyData, dailyData }) => {
        this.lineChartData = this.chartService.getWeeklySalesChartData(weeklyData);
        this.pieChartData = this.chartService.getDailyPetsSalesChartData(dailyData);
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }
}

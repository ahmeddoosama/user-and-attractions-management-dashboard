import { Injectable } from '@angular/core';
import { ChartData, DailyPetSale, PetsSalesData, PieChartData } from '@core/interfaces/dashboard-chart.interface';
import { Utilities } from '@shared/utilities/utilities.class';

/**
 * Service responsible for generating and formatting chart data for the dashboard
 * Handles both weekly sales line charts and daily sales pie charts
 */
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  /** Predefined colors for different pet types in charts */
  private colors = {
    dog: 'rgb(75, 192, 192)',
    cat: 'rgb(255, 99, 132)',
    koala: 'rgb(54, 162, 235)',
    rabbit: 'rgb(255, 206, 86)',
    panda: 'rgb(153, 102, 255)',
  };

  /**
   * Transforms weekly pet sales data into a format suitable for line charts
   * @param data - Raw pet sales data containing categories and series
   * @returns Formatted chart data with labels, datasets, and styling properties
   */
  getWeeklySalesChartData(data: PetsSalesData): ChartData {
    return {
      labels: data.categories,
      datasets: data.series.map(series => ({
        label: series.name,
        data: series.data,
        borderColor: this.colors[series.name as keyof typeof this.colors],
        tension: 0.4,
        fill: false
      }))
    };
  }

  /**
   * Transforms daily pet sales data into a format suitable for pie charts
   * @param sales - Array of daily pet sales records
   * @returns Formatted pie chart data with labels, datasets, and color schemes
   */
  getDailyPetsSalesChartData(sales: DailyPetSale[]): PieChartData {
    const animalSales = sales.reduce((acc, sale) => {
      acc[sale.animal] = (acc[sale.animal] || 0) + parseFloat(sale.price);
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(animalSales);
    const data = Object.values(animalSales);
    const backgroundColor = labels.map(animal =>
      this.colors[animal as keyof typeof this.colors] || new Utilities().getRandomColor()
    );

    return {
      labels,
      datasets: [{
        data,
        backgroundColor
      }]
    };
  }
}

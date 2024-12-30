export interface PetsSalesData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
    fill: boolean;
  }[];
}

export interface DailyPetSale {
  date: string;
  animal: string;
  price: string;
}

export interface PieChartData {
  labels: string[];
  datasets: [{
    data: number[];
    backgroundColor: string[];
  }];
}
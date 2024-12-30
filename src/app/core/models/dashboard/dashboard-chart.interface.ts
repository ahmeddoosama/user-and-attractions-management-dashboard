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

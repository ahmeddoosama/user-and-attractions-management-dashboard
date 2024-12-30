export interface IAttractionsResponse {
  data: IAttraction[];
  total: number;
  page: number;
  per_page: number;
}

export interface IAttraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
  latitude: string;
  longitude: string;
}

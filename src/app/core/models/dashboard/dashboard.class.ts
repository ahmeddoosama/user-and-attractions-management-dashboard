export class Dashboard {
  private static readonly baseUrl = 'api/pets';

  static get BaseUrl(): string {
    return this.baseUrl;
  }

  static get Pets7DaysUrl(): string {
    return `${this.baseUrl}/7days`;
  }
}

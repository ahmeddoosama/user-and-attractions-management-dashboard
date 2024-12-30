export class Attraction {
  private static readonly baseUrl = 'api/attractions';
  private static readonly creationUrl = 'api/auth/attractions';

  static get BaseUrl(): string {
    return this.baseUrl;
  }

  static get CreateUrl(): string {
    return `${this.creationUrl}/create`;
  }

  static get UpdateUrl(): string {
    return `${this.creationUrl}/update`;
  }

  static get DeleteUrl(): string {
    return `${this.baseUrl}/delete`;
  }
}

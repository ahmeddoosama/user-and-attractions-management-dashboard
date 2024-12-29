export class User {
  private static readonly baseUrl = 'api/users';

  static get BaseUrl(): string {
    return this.baseUrl;
  }

  static get CreateUrl(): string {
    return `${this.baseUrl}/create`;
  }

  static get UpdateUrl(): string {
    return `${this.baseUrl}/update`;
  }

  static get DeleteUrl(): string {
    return `${this.baseUrl}/delete`;
  }
}

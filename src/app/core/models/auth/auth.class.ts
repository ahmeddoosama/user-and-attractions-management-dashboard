export class Auth {
  private static readonly baseUrl = 'api/login';
  private static readonly refreshUrl = 'api/refresh';

  static get BaseUrl(): string {
    return this.baseUrl;
  }

  static get RefreshUrl(): string {
    return this.refreshUrl;
  }
}

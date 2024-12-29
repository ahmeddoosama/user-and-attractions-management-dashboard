export class Auth {
  private static readonly baseUrl = 'api/login';

  static get BaseUrl(): string {
    return this.baseUrl;
  }
}

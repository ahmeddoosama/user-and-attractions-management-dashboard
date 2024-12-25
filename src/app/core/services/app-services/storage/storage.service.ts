import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private static readonly TOKEN_KEY = '__at';
  private static readonly ADMIN_KEY = '__ak';

  /**
   * Stores the authentication token in localStorage
   * @param token The authentication token to store
   * @throws Error if localStorage is not available
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(StorageService.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw new Error('Unable to store token');
    }
  }

  /**
   * Retrieves the authentication token from localStorage
   * @returns The stored token or null if not found
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(StorageService.TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  /**
   * Removes the authentication token from localStorage
   */
  removeToken(): void {
    try {
      localStorage.removeItem(StorageService.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  /**
   * Checks if the user is currently authorized
   * @returns true if a valid token exists, false otherwise
   */
  isAuthorized(): boolean {
    return Boolean(this.getToken());
  }

  /**
   * Stores admin data in localStorage
   * @param admin The admin data to store
   * @throws Error if localStorage is not available or invalid admin data
   */
  setAdmin(admin: any): void {
    try {
      localStorage.setItem(StorageService.ADMIN_KEY, JSON.stringify(admin));
    } catch (error) {
      console.error('Error storing admin data:', error);
      throw new Error('Unable to store admin data');
    }
  }

  /**
   * Retrieves admin data from localStorage
   * @returns The parsed admin data or null if not found
   */
  getAdmin(): any | null {
    try {
      const adminData = localStorage.getItem(StorageService.ADMIN_KEY);
      return adminData ? JSON.parse(adminData) : null;
    } catch (error) {
      console.error('Error retrieving admin data:', error);
      return null;
    }
  }

  /**
   * Removes admin data from localStorage
   */
  removeAdmin(): void {
    try {
      localStorage.removeItem(StorageService.ADMIN_KEY);
    } catch (error) {
      console.error('Error removing admin data:', error);
    }
  }

  /**
   * Logs out the user by cleaning up all stored data
   */
  logout(): void {
    this.clearStorage();
  }

  /**
   * Clears all application-related data from localStorage
   */
  private clearStorage(): void {
    this.removeToken();
    this.removeAdmin();
  }
}

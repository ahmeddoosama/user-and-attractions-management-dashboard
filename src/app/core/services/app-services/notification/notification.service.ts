import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationConfig extends Partial<MatSnackBarConfig> {
  duration?: number;
  action?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _snackBar = inject(MatSnackBar);

  private readonly defaultConfig: NotificationConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    action: 'Close'
  };

  constructor() { }

  /**
   * Show a success notification
   * @param message The message to display
   * @param config Optional configuration
   */
  success(message: string, config?: NotificationConfig): void {
    this.show(message, 'success', config);
  }

  /**
   * Show an error notification
   * @param message The message to display
   * @param config Optional configuration
   */
  error(message: string, config?: NotificationConfig): void {
    this.show(message, 'error', config);
  }

  /**
   * Show a warning notification
   * @param message The message to display
   * @param config Optional configuration
   */
  warning(message: string, config?: NotificationConfig): void {
    this.show(message, 'warning', config);
  }

  /**
   * Show an info notification
   * @param message The message to display
   * @param config Optional configuration
   */
  info(message: string, config?: NotificationConfig): void {
    this.show(message, 'info', config);
  }

  /**
   * Show a notification with custom configuration
   * @param message The message to display
   * @param type The type of notification
   * @param config Optional configuration
   */
  private show(message: string, type: NotificationType, config?: NotificationConfig): void {
    const finalConfig: MatSnackBarConfig = {
      ...this.defaultConfig,
      ...config,
      panelClass: [
        'app-notification',
        `${type}-notification`,
        ...(config?.panelClass ? (Array.isArray(config.panelClass) ? config.panelClass : [config.panelClass]) : [])
      ]
    };

    this._snackBar.open(message, 'X', finalConfig);
  }
}

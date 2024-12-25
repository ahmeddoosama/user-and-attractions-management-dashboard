import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './core/services/app-services/notification/notification.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Install angular material successfully';

  constructor(private _notificationService: NotificationService) {}
}

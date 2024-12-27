import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '@core/interfaces/auth/auth.interface';
import { StorageService } from '@core/services/app-services/storage/storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';


const MODULES = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule
]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private storageService = inject(StorageService);
  private router = inject(Router);

  admin: IUser | null = null;

  ngOnInit(): void {
    this.admin = this.storageService.getAdmin();
  }

  logout() {
    this.storageService.logout();
    this.navigateTo('/login');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

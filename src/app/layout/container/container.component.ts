import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService } from '@core/services/app-changes/active-tab.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  private readonly activeTabService = inject(ActiveTabService);

  activeTab$ = this.activeTabService.activeTab$;
}


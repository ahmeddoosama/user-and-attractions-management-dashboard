import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [
  MatIconModule,
  MatButtonModule
]

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MODULES],
  template: `
    <footer class="flex items-center justify-between bg-white p-4 shadow-sm w-full">
      <p class="text-sm text-secondary">Designed by <a class="text-primary" href="https://github.com/ahmeddoosama" target="_blank">Ahmed Osama Bedawy</a></p>
      <div class="flex items-center gap-2">
        <a class="text-sm text-secondary" mat-button href="https://www.linkedin.com/in/ahmeddoosama/" target="_blank">LinkedIn</a>
        <a class="text-sm text-secondary" mat-button href="https://github.com/ahmeddoosama" target="_blank">GitHub</a>
      </div>
    </footer>
  `
})
export class FooterComponent {

}

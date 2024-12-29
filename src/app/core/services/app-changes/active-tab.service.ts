import { Injectable } from '@angular/core';
import { Tab } from '@core/interfaces/layout.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveTabService {

  private activeTab = new BehaviorSubject<Tab | null>(null);
  activeTab$ = this.activeTab.asObservable();

  setActiveTab(tab: Tab): void {
    this.activeTab.next(tab);
  }
}


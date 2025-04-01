import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-profile-tabs',
  imports: [],
  templateUrl: './profile-tabs.component.html',
  styleUrl: './profile-tabs.component.css'
})
export class ProfileTabsComponent {
  @Output() tabchanged = new EventEmitter<number>();
  selectedTab = 0;

  selectTab(index: number) {
    this.selectedTab = index;
    this.tabchanged.emit(index);
  }
}

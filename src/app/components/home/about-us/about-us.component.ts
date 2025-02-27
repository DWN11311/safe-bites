import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [FormsModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  isExpanded = false;
  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
}

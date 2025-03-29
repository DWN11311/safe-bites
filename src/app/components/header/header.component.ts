import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  isSideOpen = false;
  showDropdown = false;
  firstName: string | null = '';
  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sideMenuCateogryToggle() {
    this.isSideOpen = !this.isSideOpen;
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
  }
  logout() {
    localStorage.removeItem('fistName');
    localStorage.removeItem('token');

    this.firstName = null;

    this.router.navigate(['/']);
  }
}

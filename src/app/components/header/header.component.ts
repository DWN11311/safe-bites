import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

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
  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sideMenuCateogryToggle() {
    this.isSideOpen = !this.isSideOpen;
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
    const token = localStorage.getItem('token');
    if (token) {
      this.usersService.scheduleAutoLogout(token);
    }
  }
  logout() {
    this.usersService.logout();
    this.firstName = null;
  }
}

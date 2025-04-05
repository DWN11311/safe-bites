import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { CartsService } from '../../services/carts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userImageFromStorage: string | null = null;
  isMenuOpen = false;
  isSideOpen = false;
  showDropdown = false;
  items = 0;
  firstName: string | null = '';
  userId: string | null = '';
  categories: Category[] = [];
  cartCount: number = 0;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private cartService: CartsService
  ) {}

  toggleMenu(e?: Event) {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sideMenuCateogryToggle() {
    this.isSideOpen = !this.isSideOpen;
  }

  ngOnInit() {
    this.checkForUserImage();
    this.firstName = localStorage.getItem('firstName');
    this.userId = localStorage.getItem('userId');
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data as Category[];
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.usersService.scheduleAutoLogout(token);
    }
  }

  logout() {
    this.usersService.logout();
    this.firstName = null;
    this.toggleMenu();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  checkForUserImage() {
    const storedImage = localStorage.getItem('profileImageUrl');

    if (storedImage) {
      this.userImageFromStorage = storedImage;
    }
  }

  search(searchParam: string) {
    this.router.navigate(['/products'], {
      queryParams: { search: searchParam },
    });
  }
}


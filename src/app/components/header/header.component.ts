import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { LoadingService } from '../../services/loading.service';
import { WishlistService } from '../../services/wishlist.service';
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
  wishlistCount: number = 0;
  cartCount: number = 0;
  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private loadingService: LoadingService,
    private wishlistService: WishlistService,
    private cartService: CartsService,
    private usersService: UsersService
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
    // this.categoriesService.getCategories().subscribe(data => {
    //   this.categories = data as Category[];
    // });
    this.loadingService.show();

    this.cartService.cart$.subscribe({
      next: cart => {
        const itemsArray = Object.values(cart);
        this.cartCount = itemsArray.reduce(
          (total, item) => total + Number(item.quantity ?? 0),
          0
        );
      },
    });

    this.categoriesService.getCategories().subscribe({
      next: data => {
        this.categories = data as Category[];

        this.loadingService.hide();
      },
      complete: () => {},
    });

    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistCount = Object.keys(wishlist).length;
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

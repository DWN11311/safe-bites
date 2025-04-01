import { ProfileComponent } from './components/profile/profile/profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsComponent } from './components/products/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { EmptyWishListComponent } from './components/empty-wish-list/empty-wish-list.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,data: { breadcrumb: 'Home' } },
  { path: 'products', component: ProductsComponent,data: { breadcrumb: 'Products' } },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'wishList', component: WishListComponent,data: { breadcrumb: 'Wishlist' } },
  { path: 'empty-wishList', component: EmptyWishListComponent,data: { breadcrumb: 'Wishlist empty' } },
  { path: 'products/:id', component: ProductDetailsComponent,data: { breadcrumb: 'Product details' } },
  { path: 'users/:id', component: ProfileComponent,data: { breadcrumb: 'Profile' } },
  { path: '**', component: ErrorComponent,data: { breadcrumb: 'Error' } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
];

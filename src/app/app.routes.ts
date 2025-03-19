import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsComponent } from './components/products/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { EmptyWishListComponent } from './components/empty-wish-list/empty-wish-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'wishList', component: WishListComponent },
  { path: 'empty-wishList', component: EmptyWishListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', component: ErrorComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
];

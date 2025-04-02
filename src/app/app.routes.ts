import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsComponent } from './components/products/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { AboutusComponent } from './components/about us/aboutus/aboutus.component';
import { CartComponent } from './components/cart/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'about-us', component: AboutusComponent },
];

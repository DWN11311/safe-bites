import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsComponent } from './components/products/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { EmptyWishListComponent } from './components/empty-wish-list/empty-wish-list.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './auth.guard';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutusComponent } from './components/about us/aboutus/aboutus.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'wishList', component: WishListComponent },
  { path: 'empty-wishList', component: EmptyWishListComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'ordersummary', component: OrderSummaryComponent },
  { path: 'paymentmethods', component: PaymentMethodsComponent },
  { path: 'confirmpayment', component: ConfirmPaymentComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent },
];

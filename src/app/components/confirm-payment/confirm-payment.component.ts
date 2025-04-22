import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-confirm-payment',
  imports: [RouterModule],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.css',
})
export class ConfirmPaymentComponent {
  constructor(
    private router: Router,
    private cartsService: CartsService
  ) {}

  goHome() {
    const token = localStorage.getItem('token');
    if (token) this.cartsService.clearCart(token);
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true, //
  imports: [RouterModule, ConfirmPaymentComponent],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  showConfirmPayment = false;

  toggleConfirmPayment() {
    this.showConfirmPayment = true;
  }
}

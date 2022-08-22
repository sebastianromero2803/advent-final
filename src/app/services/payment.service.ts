import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { TransactionDetails } from '../modules/shopping-cart/components/payment/payment.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getPaymentMethods() {
    const userId = localStorage.getItem('userId');
    return this.httpClient.get(`${environment.URL_PAYMENTS}Payment/Methods/${userId}`);
  }

  postPayment(userId: string | null, details: TransactionDetails[], paymentMethodId: string) {
    const date = new Date();
    return this.httpClient.post(`${environment.URL_PAYMENTS}Payment`, { date, userId, details, paymentMethodId });
  }

  getPayment(paymentId: number) {
    return this.httpClient.get(`${environment.URL_PAYMENTS}Payment/${paymentId}`);
  }
}

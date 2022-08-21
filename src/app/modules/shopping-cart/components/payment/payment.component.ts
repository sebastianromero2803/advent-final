import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  sources = [
    { value: 'masterCard', viewValue: 'MasterCard' },
    { value: 'visa', viewValue: 'Visa' },
    { value: 'payPal', viewValue: 'PayPal' },
  ];

  constructor() { }

}

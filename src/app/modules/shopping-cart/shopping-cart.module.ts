import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [ShoppingCartComponent, PaymentComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    AngularMaterialModule
  ]
})
export class ShoppingCartModule { }

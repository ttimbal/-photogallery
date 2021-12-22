import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import {CartRoutingModule} from "./cart-routing.module";
import { PaymentComponent } from './components/payment/payment.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }

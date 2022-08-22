import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movement, MovementsState } from '@app-core/store/models/movement.model';
import { getMovementsInfo } from '@app-core/store/selectors/movements.selector';
import { PaymentService } from '@app-services/payment.service';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

export interface PaymentMethod {
  value: string;
  viewValue: string;
}
export interface TransactionDetails {
  containerId: string;
  fee: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  paymentForm: FormGroup;
  paymentMethods: PaymentMethod[] = [];
  userId = localStorage.getItem('userId');
  paymentMethodId = '';
  paymentId!: number;
  transactionDetails!: TransactionDetails[];

  constructor(private paymentService: PaymentService, public formBuilder: FormBuilder, private fb: FormBuilder, private _snackBar: MatSnackBar, private store: Store) {

    this.paymentForm = this.fb.group({
      truckingCompany: ['', Validators.required],
      paymentSource: ['', Validators.required],
    });

    this.paymentService.getPaymentMethods().subscribe((res: any) => {
      res.content.forEach((element: any) => {
        const paymentMethod: PaymentMethod = {
          value: element.id,
          viewValue: '**** **** **** ' + element.lastDigits
        }
        this.paymentMethods.push(paymentMethod);
      });
    })

    this.store.select(getMovementsInfo).subscribe((result: MovementsState) => {
      this.transactionDetails = [];
      result.movements.forEach((element: Movement) => {
        const transactionDetail: TransactionDetails = {
          containerId: element.containerId,
          fee: element.fee
        }
        this.transactionDetails.push(transactionDetail);
      });
    })
  }

  pay() {
    Swal.fire({
    title: '¿Seguro que quieres continuar con el pago?',
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.transactionDetails.length > 0) {
        this.paymentService.postPayment(this.userId, this.transactionDetails, this.paymentForm.get("paymentSource")?.value).subscribe((res: any) => {
          res.content.details.forEach((element: any) => {
            this.checkPayment(element.paymentId);
          });
        });
      }
      else if (this.transactionDetails.length == 0) {
        this._snackBar.open("No hay movimientos para pagar", "", {
          duration: 2000,
        });
      }
    });
  }

  checkPayment(paymentId: number) {
    this.paymentService.getPayment(paymentId).subscribe((res: any) => {
      if (res.content.paymentToken != null) {
        this._snackBar.open("Pago realizado con éxito", "", {
          duration: 2000,
          panelClass: ['green']
        });
      }
      else {
        this._snackBar.open("No se pudo realizar el pago", "", {
          duration: 2000,
          panelClass: ['red']
        });
      }
    });
  }
}

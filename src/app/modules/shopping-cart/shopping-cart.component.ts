import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { getMovementsInfo } from '../../core/store/selectors/movements.selector';
import { MovementsState, Movement } from '../../core/store/models/movement.model';
import { deleteMovement } from '@app-core/store/actions/movement.action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  displayedColumns: string[] = ['containerNumber','issuedBy', 'fee', 'delete'];
  containers: any;
  total!: number;

  constructor(private store: Store) {
    this.store.select(getMovementsInfo).subscribe((result: MovementsState) => {
      this.containers = result.movements;
      this.total = 0;
      result.movements.forEach((element: Movement) => {
        this.total += element.fee;
      });
      this.containers = new MatTableDataSource(this.containers);
    });
  }

  delete(container: any) {
    const clone = JSON.parse(JSON.stringify(container))
    this.store.dispatch( deleteMovement({ deletePayload: clone }) );
  }

}

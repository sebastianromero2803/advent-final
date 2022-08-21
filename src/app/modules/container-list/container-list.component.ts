import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContainerService } from '@app-services/container.service';
import { RequestMovementComponent } from './components/request-movement/request-movement.component';
import { Container } from '../../models/container.model';
import { Store } from '@ngrx/store';
import { deleteMovement } from '@app-core/store/actions/movement.action';
import { Movement, MovementsState } from '../../core/store/models/movement.model';
import { getContainersList } from '../../core/store/selectors/containers.selector';
import { getMovementsInfo } from '@app-core/store/selectors/movements.selector';

export interface DialogData {
  container: Container[];
}
@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements AfterViewInit {

  displayedColumns: string[] = ['containerNumber', 'origin', 'status', 'description', 'book'];
  containers: any;
  containersInCart: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private store: Store) {

    this.store.select(getMovementsInfo).subscribe((result: MovementsState) => {
      this.containersInCart = result.movements;
    });

    this.store.select(getContainersList).subscribe((result: MovementsState) => {
      this.containers = JSON.parse(JSON.stringify(result.movements));
      this.containers.forEach((container: any) => {
        const condition = this.containersInCart.find((cont: any) => cont.containerId === container.containerId);
        if(condition != undefined) {
          const index = this.containers.findIndex((contain: any) => contain.containerId === container.containerId);
          this.containers[index].booked = true;
        }
      })
      this.containers = new MatTableDataSource(this.containers);
    });

  }

  ngAfterViewInit() {
    this.containers.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.containers.filter = filterValue.trim().toLowerCase();
  }

  openDialog(container: any): void {
    const dialogRef = this.dialog.open(RequestMovementComponent, {
      width: '60rem',
      data: {container: container},
    });
  }

  deleteFromCart(container: any) {
    container.booked = false;
    const clone = JSON.parse(JSON.stringify(container))
    this.store.dispatch(deleteMovement({ deletePayload: clone }));
  }

}

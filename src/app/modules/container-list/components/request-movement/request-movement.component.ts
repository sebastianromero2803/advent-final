import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { storeMovement } from '../../../../core/store/actions/movement.action';

export interface DialogData {
  container: any
}
@Component({
  selector: 'app-request-movement',
  templateUrl: './request-movement.component.html',
  styleUrls: ['./request-movement.component.scss']
})
export class RequestMovementComponent implements OnInit {

  displayedColumns: string[] = ['containerNumber','issuedBy', 'fee'];
  container: any;

  constructor(
    public dialogRef: MatDialogRef<RequestMovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addToCart(movement: any) {
    const clone = JSON.parse(JSON.stringify(movement))
    this.store.dispatch(storeMovement({ storePayload: clone }));
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.container = new MatTableDataSource([this.data.container]);
  }

}

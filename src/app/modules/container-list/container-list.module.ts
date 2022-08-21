import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerListRoutingModule } from './container-list-routing.module';
import { ContainerListComponent } from './container-list.component';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RequestMovementComponent } from './components/request-movement/request-movement.component';


@NgModule({
  declarations: [
    ContainerListComponent,
    RequestMovementComponent
  ],
  imports: [
    CommonModule,
    ContainerListRoutingModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ContainerListModule { }

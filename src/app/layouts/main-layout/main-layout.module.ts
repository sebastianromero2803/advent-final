import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "./main-layout.component";
import { AngularMaterialModule } from "@shared/angular-material/angular-material.module";
import { InterceptorService } from "@app-core/http/interceptor.service";
import { MainRoutingModule } from "./main-routing.module";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, ToolbarComponent],
  imports: [
    AngularMaterialModule,
    RouterModule,
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class MainLayoutModule {}

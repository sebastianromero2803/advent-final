import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./main-layout.component";
import { AuthGuard } from "@app-core/auth-guard/auth.guard";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "containers",
      },
      {
        path: "containers",
        pathMatch: "full",
        loadChildren: () =>
          import("../../modules/container-list/container-list.module").then(
            (m) => m.ContainerListModule
          ),
      },
      {
        path: "shopping-cart",
        pathMatch: "full",
        loadChildren: () =>
          import("../../modules/shopping-cart/shopping-cart.module").then(
            (m) => m.ShoppingCartModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

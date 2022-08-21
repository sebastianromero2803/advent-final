import { Component } from "@angular/core";
import { ContainerService } from "@app-services/container.service";
import { Store } from "@ngrx/store";
import { storeContainerList } from '../../core/store/actions/containers.actios';
import Swal from 'sweetalert2';

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent {

  opened!: boolean;

  constructor(private containerService: ContainerService, private store: Store) { }

  ngOnInit() {
    this.containerService.getContainersList().subscribe((result: any) => {
      if (result.content.length > 0) {
        const clone = [...result.content];
        this.store.dispatch(storeContainerList({ storePayload: clone }));
      }
      else
        Swal.fire('No se encontraron contenedores disponibles', '', 'error');
    });
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }
}

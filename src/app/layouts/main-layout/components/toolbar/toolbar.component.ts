import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app-core/authentication/authentication.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  @Output()
  toggleHideSidebar = new EventEmitter<boolean>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.toggleHideSidebar.emit(true);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl("login");
  }
}

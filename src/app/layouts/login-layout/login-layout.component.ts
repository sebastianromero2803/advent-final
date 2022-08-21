import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app-core/authentication/authentication.service";

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: ["./login-layout.component.scss"],
})
export class LoginLayoutComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router, public formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    
    this.formLogin = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token)
      this.goTo();
  }

  login(): void {
    this.authService.login(this.formLogin.getRawValue().username, this.formLogin.getRawValue().password).subscribe((result: any) => {
      this.authService.setToken(result.content.token);
      setTimeout(() => {
        this._snackBar.open("Bienvenido", "", {
          duration: 2000,
        });
        this.goTo();
      }, 1000);
    });
  }

  goTo(): void {
    this.router.navigate(["/containers"]);
  }
}

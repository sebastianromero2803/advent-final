import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { HttpService } from "../http/http.service";

export const TOKEN_NAME = "token";

@Injectable()
export class AuthenticationService {
  constructor(private httpService: HttpService) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME) || "";
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  isTokenExpired(_token?: string): boolean {
    if (!_token)
      _token = this.getToken();
    if (!_token)
      return true;
    const expiry = (JSON.parse(atob(_token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  login(username: string, password: string): Observable<unknown> {
    return this.httpService.post(`${environment.URL_LOGIN}Authentication`, { username, password });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from "../model/user";
import { LoginClass } from "../model/login";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginUrl: string = 'https://visitor-management-svc.cfapps.io/api/v1/validateLogin';
  isLoggedIn = false;
  user: User;

  constructor(private http: HttpClient) {
  }

  login(loginForm: LoginClass) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    return this.http.post(this.loginUrl, loginForm, httpOptions);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
  }

}

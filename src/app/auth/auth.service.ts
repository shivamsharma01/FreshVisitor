import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../model/user";
import { LoginClass } from "../model/login";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn = false;
  user: User;

  constructor(private http: HttpClient) {
  }

  login(loginForm: LoginClass) {
    return this.http.post('',loginForm)
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
  }

}

import { Injectable } from "@angular/core";

import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ROLE } from "./roles";
import { User } from "../model/user";
import { users } from "../model/users";
import { LoginClass } from "../model/login";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginStatus: Subject<string> = new BehaviorSubject('Login');
  isLoggedIn = false;
  user: User;
  redirectUrl: string;

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

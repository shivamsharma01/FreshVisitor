import { Injectable } from "@angular/core";

import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { delay, map } from "rxjs/operators";
import { ROLE } from "./roles";
import { User } from "../model/user";
import { users } from "../model/users";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginStatus: Subject<string> = new BehaviorSubject('Login');
  isLoggedIn = false;
  user: User;
  redirectUrl: string;

  login(empNumber: number): Observable<string> {
    return of(this.mockBackend(empNumber)).pipe(
      // delay(1000),
      map(val => {
        if (!!val) {
          this.user.isAuthenticated = true;
          return this.getRoute(ROLE.Employee);
        }
      })
    );
  }

  mockBackend(empNumber: number): boolean {
    this.user = users.find(user => user.empNumber === empNumber);
    return this.isLoggedIn = !!this.user;
  }

  getRoute(type) {
    if (type === ROLE.Employee) {
      return "vms/employee/dashboard";
    } else {
      return "error";
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
  }

}

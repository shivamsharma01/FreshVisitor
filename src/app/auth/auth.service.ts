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

  loginEmployee(empNumber: number): Observable<string> {
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

  loginGuest(): Observable<string> {
    this.isLoggedIn = true;
    return of(true).pipe(
      //delay(1000),
      //,tap()
      map(val => this.getRoute(ROLE.Guest))
    );
  }

  mockBackend(empNumber: number): boolean {
    this.user = users.find(user => user.empNumber === empNumber);
    return this.isLoggedIn = !!this.user;
  }

  getRoute(type) {
    if (type === ROLE.Employee) {
      return "vms/employee/employee-dashboard";
    } else {
      return "vms/visitor";
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.user = null;
  }
}

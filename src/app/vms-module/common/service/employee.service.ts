import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, Subject, BehaviorSubject } from "rxjs";

import { VMSModule } from "src/app/vms-module/vms.module";
import { concatMap, delay, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  successEmployee: Subject<number> = new BehaviorSubject(null);

  constructor(private restClient: HttpClient) {}

  validateEmployee(empNumber: number) : Observable<number> {
    return of(empNumber).pipe(
      delay(1000),
      tap(val => console.log(val))
    );
  }

}

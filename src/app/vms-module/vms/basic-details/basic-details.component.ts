import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "../../common/service/employee.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-basic-details",
  templateUrl: "./basic-details.component.html",
  styleUrls: ["./basic-details.component.css"]
})
export class BasicDetailsComponent implements OnInit, OnDestroy {
  empNumber: FormControl;
  subscription: Subscription;

  constructor(private employeeService: EmployeeService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.empNumber = this.formBuilder.control('')
  }

  validateEmployeeNumber() {
    this.subscription = this.employeeService
      .validateEmployee(this.empNumber.value)
      .subscribe(data => {
        if (!data) {
          this.router.navigate(["login"]);
        } else {
          this.employeeService.successEmployee.next(this.empNumber.value);
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../common/service/employee.service';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VMSComponent implements OnInit {
  employeeNumber: number;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeNumber = null;
    this.employeeService.successEmployee.subscribe(data => {
      this.employeeNumber = data;
    });
  }


}

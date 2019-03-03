import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VMSComponent implements OnInit {
  employeeNumber: number;

  constructor() { }

  ngOnInit() {
    this.employeeNumber = null;
  }


}

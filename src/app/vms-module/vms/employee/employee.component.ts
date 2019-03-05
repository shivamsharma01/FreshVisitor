import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  user: User; 
  showDropdown: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user;
  }

  buttonClick() {
    this.showDropdown = !this.showDropdown;
  }
  
}

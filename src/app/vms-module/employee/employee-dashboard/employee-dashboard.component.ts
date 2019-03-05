import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-employee-dashboard",
  templateUrl: "./employee-dashboard.component.html",
  styleUrls: ["./employee-dashboard.component.css"]
})
export class EmployeeDashboardComponent implements OnInit {
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

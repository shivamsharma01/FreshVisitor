import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
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

import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Visitor Management System";

  constructor(
    private location: Location,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  toggle() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  back() {
    this.location.back();
  }

}

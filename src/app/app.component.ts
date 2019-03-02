import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Visitor Management System";

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  toggle() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

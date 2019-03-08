import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  formGroup: FormGroup;
  loginMessage: string;

  constructor(public authService: AuthService, public router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) {
    this.setMessage();
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    })
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.router.navigate(['vms/dashboard']);
    console.log('login form');    
    if (this.formGroup.invalid) {
      console.log('login form invalid');
      this.loginMessage = 'Please Enter Username and Password';
      return;
    } else {
      console.log('login form submit');
      this.spinner.show();
      // this.authService.login(this.formGroup.value).subscribe(data => {
      //   if (data) {
      //     this.loginMessage = 'Success';
      //     this.router.navigate(['vms/dashboard']);
      //   }
      // });
      
    }
    console.log('login form after submit');
    this.loginMessage = 'Login Failed. Please Try Again';
    this.spinner.hide();
  }

  logout() {
    this.authService.logout();
    this.loginMessage = null;
    this.setMessage();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';


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
    const user = new User();
    user.Name = 'shivam';
    user.EmployeeId = '1315';
    user.JobLevel = '6';
    user.LoginStatus = 'Success';
    this.authService.user = user;
    this.authService.user.Email = 'asdhagd@gmail.com';
    this.authService.isLoggedIn = true;
    this.router.navigate(['vms/dashboard']);
  }
  
  // login() {
  //   this.router.navigate(['vms/dashboard']); 
  //   if (this.formGroup.invalid) {
  //     this.loginMessage = 'Please Enter Username and Password';
  //     return;
  //   } else {
  //     this.spinner.show();
  //     this.authService.login(this.formGroup.value).subscribe((data: User) => {
  //       if (data.LoginStatus === 'Success') {
  //         this.authService.isLoggedIn = true;
  //         this.loginMessage = 'Success';
  //         this.authService.user = data;
  //            this.authService.user.Email = this.formGroup.get('username').value;
  //         this.router.navigate(['vms/dashboard']);
  //       } else {
  //         this.authService.user = null;
  //       }
  //     });
      
  //   }
  //   this.loginMessage = 'Login Failed. Please Try Again';
  //   this.spinner.hide();
  // }

  logout() {
    this.authService.logout();
    this.loginMessage = null;
    this.setMessage();
  }

}

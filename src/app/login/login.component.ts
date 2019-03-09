import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/auth.service';
import { User, UserResponse } from '../model/user';


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
      employeeId: this.formBuilder.control('', Validators.required),
      employeeName: this.formBuilder.control('', Validators.required)
    })
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  // login() {
  //   const user = new User();
  //   user.Name = 'shivam';
  //   user.EmployeeId = '1315';
  //   user.JobLevel = '6';
  //   user.LoginStatus = 'Success';
  //   this.authService.user = user;
  //   this.authService.user.Email = 'jon@infosys.com';
  //   this.authService.isLoggedIn = true;
  //   this.router.navigate(['vms/dashboard']);
  // }

  login() {
    if (this.formGroup.invalid) {
      this.loginMessage = 'Please Enter Username and Password';
      return;
    } else {
      this.spinner.show();
      this.authService.login(this.formGroup.value).subscribe((data: UserResponse) => {
        if (!!data.jobLevel) {
          this.authService.isLoggedIn = true;
          this.authService.user = new User();
          this.authService.user.EmployeeId = data.employeeId;
          this.authService.user.Name = data.employeeName;
          this.authService.user.JobLevel = data.jobLevel;
          this.authService.user.Email = this.formGroup.get('employeeId').value + '@infosys.com';
          this.router.navigate(['vms/dashboard']).then(() => {
            this.spinner.hide();
          });
        } else {
          this.loginMessage = 'Login Failed. Please Try Again';
          this.authService.user = null;
          this.spinner.hide();
        }
      }, error=> {
        this.spinner.hide();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.authService.user = null;
    this.loginMessage = null;
    this.setMessage();
  }

}

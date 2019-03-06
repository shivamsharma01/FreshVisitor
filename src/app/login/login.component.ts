import { Component }        from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }      from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(empNumber) {
    
    this.message = 'Trying to log in ...';

    this.authService.login(empNumber).subscribe(route => {
      console.log(route);
      this.setMessage();
      if (this.authService.isLoggedIn) {
        this.router.navigate([route]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}

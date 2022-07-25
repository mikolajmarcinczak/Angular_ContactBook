import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';
import { IUser } from '../interfaces/iuser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService,
              public router : Router,
              private cookieService : CookieService,
              private toastr : ToastrService) { }

  logged = true;
  loggedInDb: IResponseAfterLogin;
  registerInDb : IResponseAfterLogin;
  infoInvalidData = '';
  user : IUser = {name: '', surname: '', password: '', mail: '', phoneNumber: 0}

  ngOnInit(): void {
    this.logged = true;
  }

  async logIn() {
    if (this.logged === false) {
      this.infoInvalidData = '';
      this.logged = true;
      return;
    }

    this.loggedInDb = await this.loginService.checkIsUser(this.user);

    if (this.loggedInDb.status === 'Success') {
      this.cookieService.set('userMail', this.loggedInDb.mail);
      this.cookieService.set('userId', this.loggedInDb.userID);
      this.toastr.success('Success!', 'You\'re logged in!');
      console.log(this.loggedInDb);
      console.log(this.loggedInDb.userID);
      this.router.navigate(['home']);
    }
    else {
      this.toastr.error('Invalid email or password');
      this.infoInvalidData = 'Invalid email or password';
    }
  }

  async register() {
    if (this.logged === true) {
      this.infoInvalidData = '';
      this.logged = false;
      return;
    }

    this.registerInDb = await this.loginService.register(this.user);

    if (this.registerInDb.status === 'Success') {
      this.cookieService.set('userMail', this.registerInDb.mail);
      this.cookieService.set('userId', this.registerInDb.userID);
      this.toastr.success('Success!', 'Registration complete. You\'re logged in!');
      this.router.navigate(['home']);
    }
    else {
      this.toastr.error('Register failed.');
      this.infoInvalidData = 'Register failed';
    }
  }

}

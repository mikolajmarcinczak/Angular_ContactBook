import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  selectedComponent = 'Home';

  constructor(private loginService : LoginService,
              public router : Router,
              private cookieService : CookieService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  componentSelect(chosenComponent) {
    if (chosenComponent === Logout) {
      this.cookieService.set('userMail', '');
      this.toastr.success('You logged out.');
      this.router.navigate(['login']);
    }
    this.selectedComponent = chosenComponent;
  }

}

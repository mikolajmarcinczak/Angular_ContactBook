import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  appUrl = 'https://localhost:44371';

  constructor(private http: HttpClient) { }

  checkIsUser(user: IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return firstValueFrom(this.http.post<IResponseAfterLogin>(this.appUrl + '/Account/Login', user, options));
  }

  register(user: IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return firstValueFrom(this.http.post<IResponseAfterLogin>(this.appUrl + '/Account/Register', user, options));
  }
}

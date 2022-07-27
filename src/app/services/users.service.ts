import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUsers } from '../interfaces/iusers';
import { IUser } from '../interfaces/iuser';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  appUrl = 'https://localhost:44371';

  constructor(private http : HttpClient) { }

  getAllUsers() {
    return firstValueFrom(this.http.get<IUsers>(this.appUrl + '/api/users/getAll'));
  }

  editUser(user : IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return firstValueFrom(this.http.put<IResponse>(this.appUrl + '/api/users/edit', user, options));
  }

}

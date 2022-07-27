import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';
import { IUsers } from '../interfaces/iusers';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  contactTypes: any[] = [
    {id: 1, name: 'business'},
    {id: 2, name: 'private'},
    {id: 3, name: 'other'}
  ];
  selected: number = 1;

  businessRoles: any[] = [
    {id: 1, name: 'boss'},
    {id: 2, name: 'coworker'},
    {id: 3, name: 'client'}
  ];

  selectedComponent = 'Table';
  headElements = ['Name', 'Surname', 'Mail', 'Phone Num', 'Edit'];

  response: IResponse;
  user: IUser = {mail: '', name: '', surname: '', password: '', phoneNumber: 0, birthdate: new Date('2000-01-01'), 
  contactType: '', contactRole: ''};
  elements: IUsers = {userList: Array<IUser>()};

  userEdit: IUser;
  constructor(private userService: UsersService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.elements = await this.userService.getAllUsers();
    console.log(this.elements);
  }

  editUser(userToEdit: IUser) {
    this.selectedComponent = 'Edit';
    this.userEdit = userToEdit;
  }

  async editUserInDB() {
    this.response = await this.userService.editUser(this.userEdit);

    if(this.response.status === 'Success') {
      this.toastr.success('User updated');
      this.selectedComponent = 'Table';
      this.elements = await this.userService.getAllUsers();
    }
  }

  selectOption(id: number) {
    console.log(id);
    console.log(this.selected);
  }

}

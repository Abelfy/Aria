import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/services/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users : Observable<User[]>;

  selectedUsers : User[];

  constructor(private userSrv: UserService) { }

  ngOnInit(): void {
    this.users = this.userSrv.loadAllUsers();
  }

}

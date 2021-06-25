import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  itemsUser: MenuItem[] = new Array<MenuItem>();

  constructor(public authService: AuthService,public messageService: MessageService) { }

  ngOnInit(): void {
    this.itemsUser = [
      {
        label: 'Mon profil',
        icon: 'pi pi-user-edit',
        routerLink: '/profil'
      },
      {
        label: 'Se déconnecter',
        icon: 'pi pi-power-off',
        routerLink: '/login'
      }
    ];
  }

}

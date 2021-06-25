import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: String = new String();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(8)),
  });

  constructor(
    public authSrv : AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // reset login status
    this.authSrv.SignOut()

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authSrv.SignIn(email,password).then( () =>{
      //this.messageService.add({ severity: 'success', summary: 'Vous êtes connecté ! '});
    });
  }
}

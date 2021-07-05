import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import * as firebaseui from 'firebaseui';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  model: any = {};
  loading = false;
  returnUrl: String = new String();

  ui: firebaseui.auth.AuthUI;

  loginSub: Subscription;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(8)),
  });

  constructor(
    public authSrv: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService) {

  }


  ngOnInit() {
    // reset login status
    this.authSrv.SignOut();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.loginSub = this.authSrv.SignIn(email, password).pipe(tap(user => {
      this.messageService.add({ key: 'bc', severity: 'success', summary: `Bienvenue ${user.displayName ?? user.email } ! ` });
    })
      , catchError(err => {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erreur pendant la mise à jour', detail: err });
        return throwError(err);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if(this.loginSub){
      this.loginSub.unsubscribe();
    }
  }
}

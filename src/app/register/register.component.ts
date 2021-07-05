import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { passwordMatchValidator } from '../shared/validators/validators.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerSub: Subscription;

  constructor(public authSrv : AuthService,
    private messageService: MessageService) { }

  public registerForm : FormGroup =  new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(8)),
    passwordConfirm: new FormControl('', Validators.minLength(8))
  }, {validators  : passwordMatchValidator});


  ngOnInit(): void {
    this.registerForm.setValidators(passwordMatchValidator());
     this.registerForm.valueChanges.subscribe(result => {
    }) 
  }

  register(): void {
    const { email, password } = this.registerForm.value;
    this.registerSub = this.authSrv.SignUp(email, password).pipe(tap(user => {
      this.messageService.add({ key: 'bc', severity: 'success', summary: 'Bienvenue !' ,  detail :`Un e-mail à été envoyé à l'adresse : ${email}.` });
    })
      , catchError(err => {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erreur pendant la création du compte', detail: err });
        return throwError(err);
      })
    ).subscribe();
  }
}

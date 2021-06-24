import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { passwordMatchValidator } from '../shared/validators/validators.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authSrv : AuthService) { }

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

  }
}

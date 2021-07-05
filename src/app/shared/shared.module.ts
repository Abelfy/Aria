import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './primeNg.module';
import { ShellComponent } from './shell/shell.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

const modules = [
  CommonModule,
  PrimeNGModule,
  ToastModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
];

const component = [
  ShellComponent,
]

const providers = [
  AuthGuard
]

@NgModule({
  declarations: [
    ...component
  ],
  imports: [
    ...modules
  ],
  providers: [
    ...providers
  ],
  exports : [
    ...modules,
    ...component,
  ]
})
export class SharedModule { }

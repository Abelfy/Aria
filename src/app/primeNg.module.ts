import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { StepsModule } from 'primeng/steps';

const modules = [
    PanelModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    PasswordModule,
    ToastModule,
    TabViewModule,
    DataViewModule,
    StepsModule
]

@NgModule({
    declarations: [],
    imports: [...modules],
    exports: [...modules],
})
export class PrimeNGModule { }

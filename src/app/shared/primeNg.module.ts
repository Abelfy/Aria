import { NgModule } from '@angular/core';


import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { KnobModule } from 'primeng/knob';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';


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
    TabViewModule,
    DataViewModule,
    StepsModule,
    DynamicDialogModule,
    KnobModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule
]

@NgModule({
    declarations: [],
    imports: [...modules],
    exports: [...modules],
})
export class PrimeNGModule { }

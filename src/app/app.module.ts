import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { environment } from 'src/environments/environment';

import { USE_DEVICE_LANGUAGE, SETTINGS as AUTH_SETTINGS, AngularFireAuthModule } from '@angular/fire/auth';
import { PrimeNGModule } from './primeNg.module';
import { AuthService } from './shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { NewCharacterFormComponent } from './components/new-character-form/new-character-form.component';
import { ConfirmationComponent } from './components/new-character-form/confirmation/confirmation.component';
import { IdentiteFormComponent } from './components/new-character-form/identite-form/identite-form.component';
import { StatsFormComponent } from './components/new-character-form/stats-form/stats-form.component';
import { SkillsFormComponent } from './components/new-character-form/skills-form/skills-form.component';
import { ItemModalComponent } from './shared/modals/item-modal/item-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ShellComponent,
    CharacterSheetComponent,
    NewCharacterFormComponent,
    IdentiteFormComponent,
    StatsFormComponent,
    SkillsFormComponent,
    ConfirmationComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    PrimeNGModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService,
    DialogService,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    { provide: USE_DEVICE_LANGUAGE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

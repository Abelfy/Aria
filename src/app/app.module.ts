import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, SETTINGS as AUTH_SETTINGS,USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFireFunctions, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { environment } from 'src/environments/environment';
import { PrimeNGModule } from './shared/primeNg.module';
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
import { InventoryComponent } from './components/character-sheet/inventory/inventory.component';
import { ToastModule } from 'primeng/toast';
import { SpecialSkillsComponent } from './components/character-sheet/special-skills/special-skills.component';
import { SpecialSkillModalComponent } from './shared/modals/special-skill-modal/special-skill-modal.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    VerifyEmailComponent,
    CharacterSheetComponent,
    NewCharacterFormComponent,
    IdentiteFormComponent,
    StatsFormComponent,
    SkillsFormComponent,
    ConfirmationComponent,
    ItemModalComponent,
    InventoryComponent,
    SpecialSkillsComponent,
    SpecialSkillModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AdminModule,
    ProfileModule
  ],
  providers: [
    AuthService,
    MessageService,
    DialogService,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost',9099] : undefined},
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost',8080] : undefined},
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost',5001] : undefined}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

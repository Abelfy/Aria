import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { ConfirmationComponent } from './components/new-character-form/confirmation/confirmation.component';
import { IdentiteFormComponent } from './components/new-character-form/identite-form/identite-form.component';
import { NewCharacterFormComponent } from './components/new-character-form/new-character-form.component';
import { SkillsFormComponent } from './components/new-character-form/skills-form/skills-form.component';
import { StatsFormComponent } from './components/new-character-form/stats-form/stats-form.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'character', component: CharacterSheetComponent,canActivate: [AuthGuard]},
  { path: 'new/character', component: NewCharacterFormComponent,canActivate: [AuthGuard], children : [
    { path: 'identite', component: IdentiteFormComponent,outlet: 'form'  },
    { path: 'stats', component: StatsFormComponent,outlet: 'form'  },
    { path: 'skills', component: SkillsFormComponent,outlet: 'form'  },
    { path: 'confirm', component: ConfirmationComponent,outlet: 'form'  },
    // otherwise redirect to home
    { path: '**', redirectTo: 'identite' }
  ] },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

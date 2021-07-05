import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character } from 'src/app/shared/services/models/character';

@Component({
  selector: 'app-identite-form',
  templateUrl: './identite-form.component.html',
  styleUrls: ['./identite-form.component.scss']
})
export class IdentiteFormComponent implements OnInit {

  idForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idForm = this.fb.group({
      charFirstname: ["", Validators.required],
      charLastname: ["", Validators.required],
      age: [0, Validators.required],
    })
  }

  nextPage() {
    this.characterService.createCharacter({ identite : this.idForm.value} as Character).pipe(
      tap( character => {
        this.router.navigate(['/']);
        this.messageService.add({ key: 'bc', severity: "success", summary: 'Personnage crée ! 😀' })
      }),
      catchError( err => {
        console.error(err)
        this.messageService.add({ key: 'bc', severity: "error", summary: 'Impossible de trouver votre personnage :/' })
        return throwError(err);
      })
    ).subscribe();
  }

}

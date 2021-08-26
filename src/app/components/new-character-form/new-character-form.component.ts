import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character, Item } from 'src/app/shared/services/models/character';

@Component({
  selector: 'app-new-character-form',
  templateUrl: './new-character-form.component.html',
  styleUrls: ['./new-character-form.component.scss']
})
export class NewCharacterFormComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  newCharacter: Character;
  idForm: FormGroup;

  constructor(private fb: FormBuilder,
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

  save() {
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

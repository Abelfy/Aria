import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ItemModalComponent } from 'src/app/shared/modals/item-modal/item-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { CharacterService } from '../../shared/services/character.service';
import { Character, Item } from '../../shared/services/models/character';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit, OnDestroy {

  itemsUser: MenuItem[];
  itemsCharacter: MenuItem[] = new Array<MenuItem>();
  currentCharacter: Character;
  currentCharacterId: string;
  form: FormArray;
  idForm: FormGroup;
  statsForm: FormGroup;
  skillsForm: FormGroup;
  notes: string;
  editState: boolean;
  queryParamsSub: Subscription;
  money=75863;
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private characterService: CharacterService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.queryParamsSub = this.route.queryParams.subscribe(params => {
      this.characterService.getCharacterById(params.id).subscribe(character => {
        if (character) {
          this.currentCharacter = character;
          this.currentCharacterId = character.id;
          this.notes = this.currentCharacter.notes ? this.currentCharacter.notes : '';
          this.currentCharacter.inventory = this.currentCharacter.inventory ? this.currentCharacter.inventory : new Array<Item>();

          this.idForm = this.fb.group({
            charFirstname: [this.currentCharacter.identite.charFirstname, Validators.required],
            charLastname: [this.currentCharacter.identite.charLastname, Validators.required],
            age: [this.currentCharacter.identite.age, Validators.required],
            healthPoint: [this.currentCharacter.identite.healthPoint, Validators.required],
            maxHealthPoint: [this.currentCharacter.identite.maxHealthPoint, Validators.required],
          })

          this.statsForm = this.fb.group({
            strength: [this.currentCharacter.stats?.strength ? this.currentCharacter.stats.strength : 0, Validators.required],
            dexterity: [this.currentCharacter.stats?.dexterity ? this.currentCharacter.stats.dexterity : 0, Validators.required],
            stamina: [this.currentCharacter.stats?.stamina ? this.currentCharacter.stats.stamina : 0, Validators.required],
            intelligence: [this.currentCharacter.stats?.intelligence ? this.currentCharacter.stats.intelligence : 0, Validators.required],
            charisma: [this.currentCharacter.stats?.charisma ? this.currentCharacter.stats.charisma : 0, Validators.required],
          })

          this.skillsForm = this.fb.group({
            craft: [this.currentCharacter.skills?.craft ? this.currentCharacter.skills.craft : 0, Validators.required],
            closeCombat: [this.currentCharacter.skills?.closeCombat ? this.currentCharacter.skills.closeCombat : 0, Validators.required],
            rangeCombat: [this.currentCharacter.skills?.rangeCombat ? this.currentCharacter.skills.rangeCombat : 0, Validators.required],
            natureKnowing: [this.currentCharacter.skills?.natureKnowing ? this.currentCharacter.skills.natureKnowing : 0, Validators.required],
            secretKnowing: [this.currentCharacter.skills?.secretKnowing ? this.currentCharacter.skills.secretKnowing : 0, Validators.required],
            runJump: [this.currentCharacter.skills?.runJump ? this.currentCharacter.skills.runJump : 0, Validators.required],
            stealth: [this.currentCharacter.skills?.stealth ? this.currentCharacter.skills.stealth : 0, Validators.required],
            dodge: [this.currentCharacter.skills?.dodge ? this.currentCharacter.skills.dodge : 0, Validators.required],
            law: [this.currentCharacter.skills?.law ? this.currentCharacter.skills.law : 0, Validators.required],
            intimidating: [this.currentCharacter.skills?.intimidating ? this.currentCharacter.skills.intimidating : 0, Validators.required],
            readWrite: [this.currentCharacter.skills?.readWrite ? this.currentCharacter.skills.readWrite : 0, Validators.required],
            deception: [this.currentCharacter.skills?.deception ? this.currentCharacter.skills.deception : 0, Validators.required],
            perception: [this.currentCharacter.skills?.perception ? this.currentCharacter.skills.perception : 0, Validators.required],
            driving: [this.currentCharacter.skills?.driving ? this.currentCharacter.skills.driving : 0, Validators.required],
            psychology: [this.currentCharacter.skills?.psychology ? this.currentCharacter.skills.psychology : 0, Validators.required],
            reflexes: [this.currentCharacter.skills?.reflexes ? this.currentCharacter.skills.reflexes : 0, Validators.required],
            picklocking: [this.currentCharacter.skills?.picklocking ? this.currentCharacter.skills.picklocking : 0, Validators.required],
            healing: [this.currentCharacter.skills?.healing ? this.currentCharacter.skills.healing : 0, Validators.required],
            surviving: [this.currentCharacter.skills?.surviving ? this.currentCharacter.skills.surviving : 0, Validators.required],
            stealing: [this.currentCharacter.skills?.stealing ? this.currentCharacter.skills.stealing : 0, Validators.required],
          });


          this.form = this.fb.array([
            this.idForm,
            this.statsForm,
            this.skillsForm
          ]);

          this.form.disable();
          this.form.valueChanges.subscribe(values => {
            this.currentCharacter.identite = values[0];
            this.currentCharacter.stats = values[1];
            this.currentCharacter.skills = values[2];
          })
        } else {
          this.messageService.add({ key: 'bc', severity: "error", summary: 'Impossible de trouver votre personnage :/' })
        }
      })
    })
  }

  calculateSkills() {
    this.skillsForm.patchValue(this.characterService.calculateSkills(this.currentCharacter).skills);
  }

  toggleEdit() {
    if (this.form.disabled) {
      this.form.enable();
    } else {
      this.currentCharacter.notes = this.notes;
      this.characterService.updateCharacter(this.currentCharacter.id, this.currentCharacter)
        .pipe(
          tap(character => {
            this.messageService.add({ key: 'bc', severity: 'success', summary: 'Mise à jour', detail: `Le personnage à été mis à jour.` });
            this.form.disable();
          }),
          catchError(err => {
            console.error(err);
            this.messageService.add({ key: 'bc', severity: 'Erreur', summary: 'Erreur pendant la mise à jour', detail: err });
            return throwError(err);
          })
        ).subscribe( val => {
          console.log(val)
        });
    }
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }
}

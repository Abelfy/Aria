import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  character: Character;
  currentCharacter: Character;
  form: FormArray;
  idForm: FormGroup;
  statsForm: FormGroup;
  skillsForm: FormGroup;
  notes: string;
  editState: boolean;
  queryParamsSub: Subscription;

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

        this.currentCharacter = character;
        this.notes = this.currentCharacter.notes;
        this.currentCharacter.inventory = character.inventory

        this.idForm = this.fb.group({
          charFirstname: [this.currentCharacter.identite.charFirstname, Validators.required],
          charLastname: [this.currentCharacter.identite.charLastname, Validators.required],
          age: [this.currentCharacter.identite.age, Validators.required],
          healthPoint: [this.currentCharacter.healthPoint, Validators.required],
          maxHealthPoint: [this.currentCharacter.maxHealthPoint, Validators.required],
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
          this.currentCharacter.healthPoint = values[0].healthPoint;
          this.currentCharacter.maxHealthPoint = values[0].maxHealthPoint;
          this.currentCharacter.identite = values[0];
          this.currentCharacter.stats = values[1];
          this.currentCharacter.skills = values[2];
        })
      })
    })
  }

  calculateSkills() {
    const { strength, dexterity, stamina, intelligence, charisma } = this.currentCharacter.stats;
    this.currentCharacter.skills.craft = (dexterity + intelligence) * 2;
    this.currentCharacter.skills.closeCombat = (strength + dexterity) * 2;
    this.currentCharacter.skills.rangeCombat = (dexterity + intelligence) * 2;
    this.currentCharacter.skills.natureKnowing = (dexterity + intelligence) * 2;
    this.currentCharacter.skills.secretKnowing = (intelligence + charisma) * 2;
    this.currentCharacter.skills.runJump = (dexterity + stamina) * 2;
    this.currentCharacter.skills.stealth = (dexterity + charisma) * 2;
    this.currentCharacter.skills.law = (intelligence + charisma) * 2;
    this.currentCharacter.skills.dodge = (dexterity + intelligence) * 2;
    this.currentCharacter.skills.intimidating = (strength + charisma) * 2;
    this.currentCharacter.skills.readWrite = (intelligence + charisma) * 2;
    this.currentCharacter.skills.deception = (intelligence + charisma) * 2;
    this.currentCharacter.skills.perception = (intelligence + charisma) * 2;
    this.currentCharacter.skills.driving = (dexterity + stamina) * 2;
    this.currentCharacter.skills.psychology = (stamina + intelligence) * 2;
    this.currentCharacter.skills.reflexes = (dexterity + intelligence) * 2;
    this.currentCharacter.skills.picklocking = (dexterity + stamina) * 2;
    this.currentCharacter.skills.healing = (intelligence + charisma) * 2;
    this.currentCharacter.skills.surviving = (stamina + intelligence) * 2;
    this.currentCharacter.skills.stealing = (dexterity + intelligence) * 2;

    this.skillsForm.patchValue(this.currentCharacter.skills);
  }

  toggleEdit() {
    if (this.form.disabled) {
      this.form.enable();
    } else {
      this.currentCharacter.notes = this.notes;
      this.characterService.updateCharacter(this.currentCharacter).then(_ => {
        this.messageService.add({ severity: 'success', summary: 'Mise à jour', detail: 'Le personnage à été mis à jour.' });
        this.form.disable();
      });
    }
  }

  showItemModal() {
    if (this.form.enabled) {
      const ref = this.dialogService.open(ItemModalComponent, {
        header: 'Ajouter un objet à votre iventaire',
        closeOnEscape : true,
        width: '50%'
      });
      ref.onClose.subscribe(item => {
        if(item){
          this.messageService.add({severity:'info', summary: 'Object ajouté', detail: "N'oublier pas de sauvegarder votre personnage. :)"});
          this.currentCharacter.inventory = [...this.currentCharacter.inventory,item];
        }
      })
    }
  }

  updateItem(item : Item){
    if (this.form.enabled) {
      const ref = this.dialogService.open(ItemModalComponent, {
        data: item,
        header: 'Modifier un objet de votre iventaire',
        closeOnEscape : true,
        width: '50%'
      });
      ref.onClose.subscribe((item : Item) => {
        if(item){
          this.messageService.add({severity:'info', summary: 'Object modifié', detail: "Pensez à sauvegarder votre personnage. :)"});
          const index = this.currentCharacter.inventory.findIndex(value => value == item)
          console.log(this.currentCharacter.inventory[index])
          this.currentCharacter.inventory.splice(index,1);
          this.currentCharacter.inventory = [...this.currentCharacter.inventory,item];
          console.log(this.currentCharacter.inventory)
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }
}

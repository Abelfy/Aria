import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PartialObserver } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ItemModalComponent } from 'src/app/shared/modals/item-modal/item-modal.component';
import { CharacterService } from 'src/app/shared/services/character.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { Item } from 'src/app/shared/services/models/character';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService]
})
export class InventoryComponent implements OnInit {

  items: Array<Item>;
  @Input() disabled: boolean;
  @Input() money: number;
  moneyForm: FormGroup;
  previousMoney: { moneyCuivre: number, moneyArgent: number, moneyOr: number } = {
    moneyCuivre: 0,
    moneyArgent: 0,
    moneyOr: 0
  };

  loading: boolean;

  characterId: string;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private characterService: CharacterService,
    private itemService: ItemService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {



    // 50000 => soit 5 gold soit 500 silver soit 50000 copper
    this.moneyForm = this.fb.group({
      moneyCuivre: [this.previousMoney.moneyCuivre, Validators.required],
      moneyArgent: [this.previousMoney.moneyArgent, Validators.required],
      moneyOr: [this.previousMoney.moneyOr, Validators.required],
    });
    
    this.moneyForm.valueChanges.pipe(map(values => {
      let totalMoney = (values.moneyCuivre + (values.moneyArgent * 100) + (values.moneyOr*10000) );
      this.calculateCurrency(totalMoney);
      this.characterService.updateCharacter(this.characterId, { money: totalMoney});
    })).subscribe();

    this.calculateCurrency(this.money);
    this.route.queryParams.subscribe(params => {
      this.characterId = params.id;
      this.loading = true;
      this.itemService.loadCharacterItems(params.id).subscribe(items => {
        this.items = items;
        this.loading = false
      });
    })
  }

  private calculateCurrency(money : number) {
    this.previousMoney.moneyOr = Math.floor(money / 10000);
    this.previousMoney.moneyArgent = Math.floor((money % 10000) / 100);
    this.previousMoney.moneyCuivre = Math.floor((money % 10000) % 100);
    this.moneyForm.patchValue(this.previousMoney,{ emitEvent: false });
  }

  showItemModal() {
    if (!this.disabled) {
      const ref = this.dialogService.open(ItemModalComponent, {
        header: 'Ajouter un objet à votre iventaire',
        closeOnEscape: true,
        width: '50%'
      });
      ref.onClose.subscribe(item => {
        if (item) {
          this.itemService.createItem(this.characterId, item)
          this.messageService.add({ key: 'bc', severity: 'info', summary: 'Object ajouté' });
          this.items = [...this.items, item];
        }
      })
    }
  }

  updateItem(item: Item) {
    if (!this.disabled) {
      const ref = this.dialogService.open(ItemModalComponent, {
        data: item,
        header: 'Modifier un objet de votre iventaire',
        closeOnEscape: true,
        width: '50%'
      });
      ref.onClose.subscribe((item: Item) => {
        if (item) {
          this.messageService.add({ key: 'bc', severity: 'info', summary: 'Object modifié' });
          const index = this.items.findIndex(value => value.id == item.id)
          this.items.splice(index, 1);
          this.items = [...this.items, item];
          this.itemService.updateItem(this.characterId, item).then(result => {
          });
        }
      })
    }
  }

  deleteItem(item: Item) {
    if (!this.disabled) {
      this.itemService.deleteItem(this.characterId, item).then(result => {
        const index = this.items.findIndex(value => value.id == item.id)
        this.items.splice(index, 1);
        this.items = [...this.items];
        this.messageService.add({ key: 'bc', severity: 'info', summary: 'Object supprimé' });
      })
    }
  }
}

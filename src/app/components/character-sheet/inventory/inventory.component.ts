import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ItemModalComponent } from 'src/app/shared/modals/item-modal/item-modal.component';
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

  loading: boolean;

  characterId: string;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.characterId = params.id;
      this.loading = true;
      this.itemService.loadCharacterItems(params.id).subscribe(items => {
        this.items = items;
        this.loading = false
      });
    })
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
          this.messageService.add({key : 'bc', severity: 'info', summary: 'Object ajouté'});
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
          this.messageService.add({key : 'bc', severity: 'info', summary: 'Object modifié'});
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
      this.itemService.deleteItem(this.characterId,item).then(result => {
        const index = this.items.findIndex(value => value.id == item.id)
        this.items.splice(index, 1);
        this.items = [...this.items];
        this.messageService.add({key : 'bc',  severity: 'info', summary: 'Object supprimé'});
      })
    }
  }
}

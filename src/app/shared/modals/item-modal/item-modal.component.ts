import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {

  itemForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.itemForm = this.fb.group({
      name: [this.config.data ? this.config.data.name : '', Validators.required],
      quantity: [this.config.data ? this.config.data.quantity : 0, Validators.required],
      description: [this.config.data ? this.config.data.description : ""]
    }
    )
  }

  close() {
    this.ref.close({...this.itemForm.value,id : this.config.data?.id ? this.config.data?.id : null });
  }
}

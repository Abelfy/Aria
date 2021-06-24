import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {

  itemForm: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      description: [""]
    }
    )
  }

  close() {
    this.ref.close(this.itemForm.value)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-special-skill-modal',
  templateUrl: './special-skill-modal.component.html',
  styleUrls: ['./special-skill-modal.component.scss']
})
export class SpecialSkillModalComponent implements OnInit {

  specialSkillForm: FormGroup;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.specialSkillForm = this.fb.group({
      name: [this.config.data ? this.config.data.name : '', Validators.required],
      value: [this.config.data ? this.config.data.value : 0, Validators.required],
      description: [this.config.data ? this.config.data.description : ""]
    }
    )
  }

  close() {
    this.ref.close({...this.specialSkillForm.value,id : this.config.data?.id ? this.config.data?.id : null });
  }

}

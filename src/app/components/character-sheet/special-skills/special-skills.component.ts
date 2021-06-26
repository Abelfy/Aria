import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SpecialSkillModalComponent } from 'src/app/shared/modals/special-skill-modal/special-skill-modal.component';
import { SpecialSkill } from 'src/app/shared/services/models/character';
import { SpecialSkillService } from 'src/app/shared/services/special-skill.service';

@Component({
  selector: 'app-special-skills',
  templateUrl: './special-skills.component.html',
  styleUrls: ['./special-skills.component.scss']
})
export class SpecialSkillsComponent implements OnInit {

  specialSkills: Array<SpecialSkill>;
  @Input() disabled: boolean;
  loading: boolean;
  characterId: string;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private specialSkillService: SpecialSkillService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.characterId = params.id;
      this.specialSkillService.loadCharacterSpecialSkills(this.characterId).subscribe(skills => {
        this.specialSkills = skills;
      })
    })

  }

  showSpecialSkillModal() {
    if (!this.disabled) {
      const ref = this.dialogService.open(SpecialSkillModalComponent, {
        header: 'Ajouter un objet à votre iventaire',
        closeOnEscape: true,
        width: '50%'
      });
      ref.onClose.subscribe(specialSkill => {
        if (specialSkill) {
          console.log(specialSkill)
          this.specialSkillService.createSpecialSkill(this.characterId, specialSkill)
          this.messageService.add({key : 'bc', severity: 'info', summary: 'Object ajouté'});
          this.specialSkills = [...this.specialSkills, specialSkill];
        }
      })
    }
  }

  updateSpecialSkill(specialSkill: SpecialSkill) {
    if (!this.disabled) {
      const ref = this.dialogService.open(SpecialSkillModalComponent, {
        data: specialSkill,
        header: 'Modifier un objet de votre iventaire',
        closeOnEscape: true,
        width: '50%'
      });
      ref.onClose.subscribe((item: SpecialSkill) => {
        if (item) {
          this.messageService.add({key : 'bc', severity: 'info', summary: 'Object modifié'});
          const index = this.specialSkills.findIndex(value => value.id == item.id)
          this.specialSkills.splice(index, 1);
          this.specialSkills = [...this.specialSkills, item];
          this.specialSkillService.updateSpecialSkills(this.characterId, item).then(result => {
          });
        }
      })
    }
  }

  deleteSpecialSkill(specialSkill: SpecialSkill) {
    if (!this.disabled) {
      this.specialSkillService.deleteSpecialSkill(this.characterId,specialSkill).then(result => {
        const index = this.specialSkills.findIndex(value => value.id == specialSkill.id)
        this.specialSkills.splice(index, 1);
        this.specialSkills = [...this.specialSkills];
        this.messageService.add({key : 'bc',  severity: 'info', summary: 'Object supprimé'});
      })
    }
  }

}

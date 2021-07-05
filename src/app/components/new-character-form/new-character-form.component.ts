import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Identite',
      command: (event: any) => {
        this.activeIndex = 0;
        this.router.navigate([{outlets : { form : 'identite'}}], { relativeTo: this.route })
      }},
      {label: 'Statistiques',
      command: (event: any) => {
        this.activeIndex = 1;
        this.router.navigate([{outlets : { form : 'stats'}}], { relativeTo: this.route })
      }},
      {label: 'Compétences',
      command: (event: any) => {
        this.activeIndex = 2;
        this.router.navigate([{outlets : { form : 'skills'}}], { relativeTo: this.route })        
      }},
      {label: 'Confirmation',
      command: (event: any) => {
        this.activeIndex = 3;
        this.router.navigate([{outlets : { form : 'confirm'}}], { relativeTo: this.route })
      }},
  ];
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Character } from 'src/app/shared/services/models/character';

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

  createCharacter() {
    this.newCharacter = {
      id: '',
      identite: {
        charFirstname: '',
        charLastname: '',
        age: 0
      },
      skills: {
        craft: 0,
        closeCombat: 0,
        rangeCombat: 0,
        natureKnowing: 0,
        secretKnowing: 0,
        runJump: 0,
        stealth: 0,
        dodge: 0,
        law: 0,
        intimidating: 0,
        readWrite: 0,
        deception: 0,
        perception: 0,
        driving: 0,
        psychology: 0,
        reflexes: 0,
        picklocking: 0,
        healing: 0,
        surviving: 0,
        stealing: 0
      },
      stats: {
        charisma: 0,
        dexterity: 0,
        intelligence: 0,
        stamina: 0,
        strength: 0
      },
      selected: true
    }
  }

}

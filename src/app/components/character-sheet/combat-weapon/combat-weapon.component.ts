import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

export interface Weapon {
  type: string,
  name: string,
  hitdice: string,
  range: number,
}


@Component({
  selector: 'app-combat-weapon',
  templateUrl: './combat-weapon.component.html',
  styleUrls: ['./combat-weapon.component.scss']
})
export class CombatWeaponComponent implements OnInit {

  weapons: Weapon[];

  constructor() { }

  ngOnInit(): void {
    this.weapons = [{
      type: "Combat Rapproché",
      name : "Masse d'armes",
      hitdice : "2d8",
      range : 3
    }]
  }

}

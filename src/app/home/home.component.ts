import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { CharacterService } from '../shared/services/character.service';
import { Character } from '../shared/services/models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters$: Observable<Character[]>;

  constructor(public authService: AuthService, private characterService: CharacterService) {
  }


  ngOnInit(): void {
    this.reloadCharacters();
  }

  reloadCharacters() {
    this.characters$ = this.characterService.loadCharacters();
  }

  deleteCharacter(id:string) {
    this.characterService.delete(id);
    this.reloadCharacters();
  }

}

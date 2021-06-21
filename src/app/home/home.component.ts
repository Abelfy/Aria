import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { CharacterService } from '../shared/services/character.service';
import { Character } from '../shared/services/models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  characters: Character[];
  charactersSub: Subscription

  constructor(public authService: AuthService, private characterService: CharacterService) {
  }


  ngOnInit(): void {
    this.reloadCharacters();
  }

  reloadCharacters() {
    this.charactersSub = this.characterService.loadCharacters().subscribe(characters => {
      console.log(characters);
      this.characters = characters;
    });
  }

  ngOnDestroy(): void {
    if (this.charactersSub) {
      this.charactersSub.unsubscribe();
    }
  }
}

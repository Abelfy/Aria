import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Character } from "./models/character";
import { map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { convertSnaps } from "./db-utils";

@Injectable({
    providedIn: "root"
})
export class CharacterService {
    constructor(private db: AngularFirestore, private authService: AuthService) {

    }

    loadCharacters(): Observable<Character[]> {
        return this.db.collection<Character>(`/users/${this.authService.userData.uid}/characters`)
            .get()
            .pipe(
                map(result => convertSnaps<Character>(result))
            )
    }

    updateCharacter(data: Character): Promise<void> {

        return this.db.doc<Character>(`/users/${this.authService.userData.uid}/characters/${data.id}`).update(data)
    }

    getCharacterById(id: string): Observable<Character> {
        return this.db.doc<Character>(`/users/${this.authService.userData.uid}/characters/${id}`).get().pipe(
            map(snap =>snap.data())
        );
    }

    createCharacter(data: Character) {
        data.id = this.db.createId();
        console.log(data.id);
        return this.db.collection(`/users/${this.authService.userData.uid}/characters`).add(data)
    }
}
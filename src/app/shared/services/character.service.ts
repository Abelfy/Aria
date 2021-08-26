import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { Character } from "./models/character";
import { concatMap, map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { convertSnaps } from "./helpers/db-utils";
import * as firebase from 'firebase';
import { User } from "./models/user";

@Injectable({
    providedIn: "root"
})
export class CharacterService {

    userRef;
    constructor(private db: AngularFirestore, private authService: AuthService) {
        this.userRef = this.db.doc<User>(`/users/${this.authService.userData.uid}`);
    }

    loadCharacters(): Observable<Character[]> {
        //console.log(this.userRef.ref);

        return this.db.collection<Character>(`/characters`, ref => ref.where('owner', '==', this.userRef.ref))
            .get()
            .pipe(
                map(result => convertSnaps<Character>(result))
            )
    }

    updateCharacter(characterId, changes: Partial<Character>): Observable<any> {
        changes.updatedBy = this.db.doc<User>(`/users/${this.authService.userData.uid}`).ref;
        changes.updatedAt = firebase.default.firestore.Timestamp.fromDate(new Date());
        return from(this.db.collection<Character>('characters').doc(characterId).update(changes));
    }

    getCharacterById(id: string): Observable<Character> {
        return this.db.doc<Character>(`/characters/${id}`).get().pipe(
            map(snap => {
                return {
                    id: snap.id,
                    ...snap.data()
                }
            })
        );
    }

    createCharacter(data: Character,characterId? :string)  {
        let save$ : Observable<any>;
        data.createdAt = firebase.default.firestore.Timestamp.fromDate(new Date());
        data.updatedAt = firebase.default.firestore.Timestamp.fromDate(new Date());
        data.owner = this.db.doc<User>(`/users/${this.authService.userData.uid}`).ref;

        if(characterId) {
            save$ = from(this.db.doc(`/characters/${characterId}`).set(data));
        } else {
            save$ = from(this.db.collection<Character>(`/characters`).add(data));
        }
        
        return save$.pipe(map(res => {
            return {
                id : characterId ?? res.id,
                ...data
            }
        }));
    }

    calculateSkills(character: Character){
        const { strength, dexterity, stamina, intelligence, charisma } = character.stats;
        character.skills.craft = (dexterity + intelligence) * 2;
        character.skills.closeCombat = (strength + dexterity) * 2;
        character.skills.rangeCombat = (dexterity + intelligence) * 2;
        character.skills.natureKnowing = (dexterity + intelligence) * 2;
        character.skills.secretKnowing = (intelligence + charisma) * 2;
        character.skills.runJump = (dexterity + stamina) * 2;
        character.skills.stealth = (dexterity + charisma) * 2;
        character.skills.law = (intelligence + charisma) * 2;
        character.skills.dodge = (dexterity + intelligence) * 2;
        character.skills.intimidating = (strength + charisma) * 2;
        character.skills.readWrite = (intelligence + charisma) * 2;
        character.skills.deception = (intelligence + charisma) * 2;
        character.skills.perception = (intelligence + charisma) * 2;
        character.skills.driving = (dexterity + stamina) * 2;
        character.skills.psychology = (stamina + intelligence) * 2;
        character.skills.reflexes = (dexterity + intelligence) * 2;
        character.skills.picklocking = (dexterity + stamina) * 2;
        character.skills.healing = (intelligence + charisma) * 2;
        character.skills.surviving = (stamina + intelligence) * 2;
        character.skills.stealing = (dexterity + intelligence) * 2;

        return character;
    }
    
}
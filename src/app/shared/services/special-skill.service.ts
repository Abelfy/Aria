import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { convertSnaps } from './helpers/db-utils';
import { SpecialSkill } from './models/character';

@Injectable({
  providedIn: 'root'
})
export class SpecialSkillService {

  constructor(private db: AngularFirestore, private authService: AuthService) {

  }

  createSpecialSkill(charId: string,data: SpecialSkill) {
    return this.db.collection(`/users/${this.authService.userData.uid}/characters/${charId}/special-skills`).add(data)
  }

  loadCharacterSpecialSkills(charId: string): Observable<SpecialSkill[]> {
    return this.db.collection<SpecialSkill>(`/users/${this.authService.userData.uid}/characters/${charId}/special-skills`)
      .get()
      .pipe(
        map(result => convertSnaps<SpecialSkill>(result))
      )
  }
  
  updateSpecialSkills(charId: string,data: SpecialSkill): Promise<void> {
    const path = `/users/${this.authService.userData.uid}/characters/${charId}/special-skills/${data.id}`;
    console.log(path);
    return this.db.doc<SpecialSkill>(path).update(data);
  }
  
  deleteSpecialSkill(charId: string, data:SpecialSkill) : Promise<void> {
    const path = `/users/${this.authService.userData.uid}/characters/${charId}/special-skills/${data.id}`;
    console.log(path);
    return this.db.doc<SpecialSkill>(path).delete();
  }
}

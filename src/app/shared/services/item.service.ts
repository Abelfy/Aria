import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { convertSnaps } from './db-utils';
import { Item } from './models/character';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db: AngularFirestore, private authService: AuthService) {

  }

  createItem(charId: string,data: Item) {
    data.id = this.db.createId();
    return this.db.collection(`/users/${this.authService.userData.uid}/characters/${charId}/items`).add(data)
  }

  loadCharacterItems(charId: string): Observable<Item[]> {
    return this.db.collection<Item>(`/users/${this.authService.userData.uid}/characters/${charId}/items`)
      .get()
      .pipe(
        map(result => convertSnaps<Item>(result))
      )
  }
  

  updateItem(charId: string,data: Item): Promise<void> {
    const path = `/users/${this.authService.userData.uid}/characters/${charId}/items/${data.id}`;
    console.log(path);
    return this.db.doc<Item>(path).update(data);
  }
  deleteItem(charId: string, data:Item) : Promise<void> {
    const path = `/users/${this.authService.userData.uid}/characters/${charId}/items/${data.id}`;
    console.log(path);
    return this.db.doc<Item>(`/users/${this.authService.userData.uid}/characters/${charId}/items/${data.id}`).delete();
  }
}

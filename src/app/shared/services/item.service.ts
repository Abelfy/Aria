import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { convertSnaps } from './helpers/db-utils';
import { Item } from './models/character';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db: AngularFirestore, private authService: AuthService) {

  }

  createItem(charId: string, data: Item) {
    let save$ : Observable<any>;
    data.id = this.db.createId();
    save$ = from(this.db.doc<Item>(`/characters/${charId}/items/${data.id}`).set(data))
    
    return save$.pipe(map(snap => {
      return {
        ... data
      }
    }));
  }
  
  loadCharacterItems(itemId: string): Observable<Item[]> {
    return this.db.collection<Item>(`/characters/${itemId}/items`)
      .get()
      .pipe(
        map(result => convertSnaps<Item>(result))
      )
  }
  
  updateItem(itemId: string, data: Item): Promise<void> {
    return this.db.doc<Item>(`/characters/${itemId}/items/${data.id}`).update(data);
  }
  deleteItem(itemId: string, data: Item): Promise<void> {
    return this.db.doc<Item>(`/characters/${itemId}/items/${data.id}`).delete();
  }
}

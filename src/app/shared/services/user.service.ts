import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { convertSnaps } from './helpers/db-utils';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  loadAllUsers(): Observable<User[]> {
    return this.db.collection<User>(`/users`)
      .get()
      .pipe(
        map(result => convertSnaps<User>(result))
      )
  }

  loadUser(): Observable<User> {
    return this.db.doc<User>(`/users/${this.authService.userData.uid}`).get().pipe(
      map(snap => {
        return {
            id: snap.id,
            ...snap.data()
        }
    })
    )
  }
  
  updateUser(data: User): Observable<void> {
    const path = `/users/${this.authService.userData.uid}`;
    return from(this.db.doc<User>(path).update(data));
  }
  
  deleteUser() : Promise<void> {
    const path = `/users/${this.authService.userData.uid}`; 
    return this.db.doc<User>(path).delete();
  }
}

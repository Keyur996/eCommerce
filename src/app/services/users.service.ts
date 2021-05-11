import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // we Make User Profile Section in Future
  constructor(private _db: AngularFireDatabase) {}

  // Save Firebase User into Real time Database
  save = (user: firebase.default.User): void => {
    this._db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    });
  };

  // get saved user from Firebase
  get = (uid: string): AngularFireObject<User> => {
    return this._db.object('/users/' + uid);
  };
}

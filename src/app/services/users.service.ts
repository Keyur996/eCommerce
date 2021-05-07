import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _db: AngularFireDatabase) {}

  save = (user: firebase.default.User): void => {
    this._db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  };

  get = (uid: string): AngularFireObject<User> => {
    return this._db.object('/users/' + uid);
  };
}

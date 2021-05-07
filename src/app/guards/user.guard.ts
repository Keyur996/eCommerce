import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private _afAuth: AngularFireAuth,
    private _auth: AuthService,
    private _userService: UsersService
  ) {}

  canActivate(): any {
    return this._auth.appUser$.pipe(
      map((user) => {
        console.log(user?.isAdmin);
        return user?.isAdmin;
      })
    );
  }
}

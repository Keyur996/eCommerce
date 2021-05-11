import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<firebase.default.User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UsersService
  ) {
    this.user$ = this.afAuth.authState;
    // console.log(this.user$);
  }

  logIn = (): void => {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(
      new firebase.default.auth.GoogleAuthProvider()
    );
  };

  logOut = (): void => {
    this.afAuth.signOut();
    this.router.navigate(['login'], { relativeTo: this.route });
  };

  get appUser$(): Observable<User | null> {
    return this.user$.pipe(
      switchMap((user: firebase.default.User | null) => {
        if (user === null) return of(null);

        // console.log(user);
        return this._userService.get(user.uid).valueChanges();
      })
    );
  }
}

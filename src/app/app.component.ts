import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eCommerce-ng-firebase';
  constructor(
    private __authService: AuthService,
    private router: Router,
    private _usersService: UsersService
  ) {
    __authService.user$?.subscribe((user) => {
      if (user) {
        _usersService.save(user);
        let returnUrl: string | null = localStorage.getItem('returnUrl');
        if (returnUrl !== null) {
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }
}

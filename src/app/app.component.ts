import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'eCommerce-ng-firebase';
  constructor(
    private _authService: AuthService,
    private router: Router,
    private _usersService: UsersService
  ) {
    _authService.user$?.subscribe((user) => {
      if (!user) return;

      _usersService.save(user);
      let returnUrl: string | null = localStorage.getItem('returnUrl');

      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }

  ngOnInit = () => {};
}

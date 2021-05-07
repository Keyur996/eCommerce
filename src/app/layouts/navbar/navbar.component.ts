import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser!: User | null;
  public isMenuCollapsed = true;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.appUser$.subscribe((user) => (this.appUser = user));
  }

  logOut = () => {
    this._authService.logOut();
  };
}

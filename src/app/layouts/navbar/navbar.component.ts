import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(public __authService: AuthService) {}

  ngOnInit(): void {}

  logOut = () => {
    this.__authService.logOut();
  };
}

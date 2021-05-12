import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser!: User | null;
  public isMenuCollapsed = true;
  itemCount!: number;

  constructor(
    private _authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this._authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });

    this.shoppingCartService.itemCount.subscribe((count) => {
      this.itemCount = count;
    });
  }

  logOut = () => {
    this._authService.logOut();
  };
}

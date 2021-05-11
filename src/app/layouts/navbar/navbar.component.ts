import { Component, OnInit } from '@angular/core';
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
  items!: any;

  constructor(
    private _authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this._authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });

    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe((cart) => {
      // if (!cart.payload.val()?.items) {
      this.items = { ...cart.payload.val()?.items };
      this.itemCount = 0;
      for (let productId in this.items) {
        // console.log(this.items[productId]);
        this.itemCount += this.items[productId].quantity;
      }
      console.log(this.itemCount);
      // }
    });
  }

  logOut = () => {
    this._authService.logOut();
  };
}

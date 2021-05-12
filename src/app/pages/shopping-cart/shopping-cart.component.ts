import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { ShoppingCartItems } from 'src/app/models/ShoppingCartItems.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;
  productIds!: string[];
  shoppingCart!: any;
  items!: ShoppingCartItems[];
  itemCount: number = 0;
  totalPrice!: number;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe((cart: any) => {
      this.shoppingCart = { key: cart.key, ...cart.payload.val() };
      let cartItems = { ...cart.payload.val()?.items };
      this.productIds = Object.keys(cartItems);
      this.items = [];
      this.totalPrice = 0;
      for (let productId of this.productIds) {
        this.totalPrice +=
          cartItems[productId].product.price * cartItems[productId].quantity;
        this.items.push(cartItems[productId]);
      }
      console.log(this.items);
    });
    this.shoppingCartService.itemCount.subscribe(
      (count) => (this.itemCount = count)
    );
  }

  removeFromCart = (product: Product) => {
    this.shoppingCartService.removeFromCart(product);
  };

  addToCart = (product: Product) => {
    this.shoppingCartService.addToCart(product);
  };

  clearCart = () => {
    this.shoppingCartService.clearCart();
  };
}

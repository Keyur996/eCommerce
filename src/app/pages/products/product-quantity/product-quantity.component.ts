import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart.items) {
      return 0;
    } else {
      let item = this.shoppingCart.items[this.product.key];
      return item ? item.quantity : 0;
    }
  }
}

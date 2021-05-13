import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  SnapshotAction,
} from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { ShoppingCart } from '../models/ShoppingCart.model';
import { ShoppingCartItems } from '../models/ShoppingCartItems.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _db: AngularFireDatabase) {
    this.getCart().then((cart) => {
      cart.subscribe((cart) => {
        let items = { ...cart.payload.val()?.items };
        let itemCount = 0;
        for (let productId in items) itemCount += items[productId].quantity;
        this.itemCount.next(itemCount);
      });
    });
  }

  getCart = async (): Promise<Observable<SnapshotAction<ShoppingCart>>> => {
    let cartId = await this.getOrCreateCartId();
    return this._db.object<ShoppingCart>(`/carts/${cartId}`).snapshotChanges();
  };

  addToCart = async (product: Product) => {
    this.updateQuantity(product, 1);
  };

  removeFromCart = async (product: Product) => {
    this.updateQuantity(product, -1);
  };

  clearCart = async () => {
    let cartId = await this.getOrCreateCartId();
    return this._db.object(`/carts/${cartId}/items`).remove();
  };

  private create = () => {
    return this._db.list<ShoppingCart>('/carts/').push({
      dateCreated: new Date().getTime(),
    });
  };

  private getItems = (
    cartId: string | null,
    productId: string | null
  ): AngularFireObject<ShoppingCartItems> => {
    return this._db.object<ShoppingCartItems>(
      `/carts/${cartId}/items/${productId}`
    );
  };

  private async getOrCreateCartId(): Promise<string | null> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    cartId = await this.create().key;
    if (cartId !== null) localStorage.setItem('cartId', cartId);
    return cartId;
  }

  private updateQuantity = async (product: Product, change: number) => {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId, product.key);

    items$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: SnapshotAction<any>) => {
        if (item.payload.exists()) {
          let quantity = item.payload.val().quantity + change;
          if (quantity === 0) {
            items$.remove();
          } else {
            items$.update({
              product,
              quantity: item.payload.val().quantity + change,
            });
          }
        } else {
          items$.set({ product, quantity: 1 });
        }
      });
  };
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) {}

  create = (product: any) => {
    return this._db.list('/products').push(product);
  };
}

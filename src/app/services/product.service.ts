import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) {}

  // Craeate a Product in firebase
  create = (product: Product) => {
    return this._db.list('/products').push(product);
  };

  // get All Products from firebase
  getAll = () => {
    return this._db.list<Product[]>('/products').snapshotChanges();
  };

  // only gives info without id for id
  getById = (id: string) => {
    return this._db.object<Product>(`/products/${id}`).valueChanges();
  };

  // update Product
  update = (id: string, product: Product) => {
    return this._db.object<Product>(`/products/${id}`).update(product);
  };

  // delete Product
  deleteById = (id: string) => {
    return this._db.object<Product>(`/products/${id}`).remove();
  };
}

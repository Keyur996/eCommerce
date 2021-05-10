import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) {}

  create = (product: any) => {
    return this._db.list('/products').push(product);
  };

  getAll = () => {
    return this._db.list<Product[]>('/products').snapshotChanges();
  };

  getById = (id: string) => {
    return this._db.object<Product>(`/products/${id}`).valueChanges();
  };

  update = (id: string, product: Product) => {
    // console.log('id', id);
    // console.log('Product', product);
    return this._db.object<Product>(`/products/${id}`).update(product);
  };

  deleteById = (id: string) => {
    return this._db.object<Product>(`/products/${id}`).remove();
  };
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _db: AngularFireDatabase) {}

  getCategories(): Observable<SnapshotAction<Category>[]> {
    return this._db
      .list<Category>('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }
}

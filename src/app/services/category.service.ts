import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _db: AngularFireDatabase) {}

  getCategories(): Observable<any> {
    return this._db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }
}

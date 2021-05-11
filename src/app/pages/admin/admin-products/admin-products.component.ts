import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filterProducts!: Product[];
  private _sub!: Subscription;
  collectionSize!: number;
  page: number = 1;
  pageSize: number = 4;

  constructor(
    private _productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._sub = this._productService.getAll().subscribe((res: any[]) => {
      // console.log(res);
      this.filterProducts = this.products = res.map((e) => {
        return { key: e.key, ...e.payload.val() };
      });
      console.log(this.products);
      this.collectionSize = this.products.length;
    });
  }

  onDelete = (content: any, id: string) => {
    this.modalService
      .open(content, { centered: true })
      .result.then((result) => {
        console.log(result);
        if (result === 'yes') {
          this._productService.deleteById(id);
        }
      });
    console.log(id);
  };

  filter = (query: string) => {
    // console.log(query);
    this.filterProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.collectionSize = this.filterProducts.length;
  };

  ngOnDestroy = () => {
    this._sub.unsubscribe();
  };
}

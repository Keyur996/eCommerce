import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/Category.model';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category!: string | null;
  cart!: any;
  _cartSub!: Subscription;
  _productSub!: Subscription;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this._cartSub = (await this.shoppingCartService.getCart()).subscribe(
      (res: any) => {
        this.cart = { key: res.key, ...res.payload.val() };
        // console.log(this.cart);
      }
    );

    this._productSub = this.productService
      .getAll()
      .pipe(
        switchMap((res: any[]) => {
          this.filteredProducts = this.products = res.map((e) => {
            return {
              key: e.key,
              ...e.payload.val(),
            };
          });
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.productFilter(this.category);
      });
  }

  private productFilter = (category: string | null) => {
    this.filteredProducts = category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  };

  ngOnDestroy(): void {
    this._cartSub.unsubscribe();
    this._productSub.unsubscribe();
  }
}

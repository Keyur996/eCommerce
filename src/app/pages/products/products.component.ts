import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category!: string | null;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService
      .getAll()
      .pipe(
        switchMap((res: any[]) => {
          this.filteredProducts = this.products = res.map((e) => {
            return {
              Key: e.key,
              ...e.payload.val(),
            };
          });
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;

        console.log(this.filteredProducts);
      });
  }
}

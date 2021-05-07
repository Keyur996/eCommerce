import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories!: any[];

  constructor(private _catgory: CategoryService, private _productService: ProductService) {}

  ngOnInit() {
    this._catgory.getCategories().subscribe((res: any[]) => {
      this.categories = res.map((e) => {
        return {
          key: e.key,
          ...e.payload.val(),
        };
      });
      console.log(this.categories);
    });
  }

  save = (value: any) => {
    this._productService.create(value);
  };
}

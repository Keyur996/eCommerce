import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  // @ViewChild('f') form!: NgForm;
  private _sub!: Subscription;
  id!: string | null;
  categories!: any[];
  product: Product = {
    key: '',
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };

  constructor(
    private _catgory: CategoryService,
    private _productService: ProductService,
    private route: ActivatedRoute,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this._sub = this._catgory.getCategories().subscribe((res: any[]) => {
      this.categories = res.map((e) => {
        return {
          key: e.key,
          ...e.payload.val(),
        };
      });
      console.log(this.categories);
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this._productService
        .getById(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          if (p !== null) this.product = p;
        });
    }
  }

  save = (form: NgForm) => {
    if (form.valid) {
      console.log(form.value);
      if (this.id) {
        this._toastr.warning('Product Updated..', ':)');
        this._productService.update(this.id, form.value);
        this.router.navigate(['/admin/products'], { relativeTo: this.route });
      } else {
        this._toastr.success('Product Added into List', ':)');
        this._productService.create(form.value);
        form.reset();
      }
    } else {
      this._toastr.error('Please Enter Valid Data ', 'Error');
    }
  };

  ngOnDestroy = () => {
    this._sub.unsubscribe();
  };
}

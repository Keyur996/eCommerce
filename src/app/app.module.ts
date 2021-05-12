import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ProductFormComponent } from './pages/admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomFormsModule } from 'ng2-validation';
import { SortDirective } from './directives/sort.directive';
import { ProductCardComponent } from './pages/products/product-card/product-card.component';
import { ProductFilterComponent } from './pages/products/product-filter/product-filter.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './pages/products/product-quantity/product-quantity.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    FooterComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    SortDirective,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    NgbCollapseModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
    }),
    CustomFormsModule,
  ],
  providers: [
    AuthService,
    UsersService,
    CategoryService,
    ProductService,
    ToastrService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

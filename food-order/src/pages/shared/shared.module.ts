import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories/categories';
import { CartPage } from './cart/cart';
import { ProductListPage } from './product-list/product-list';
import { ProductName } from '../../pipes/product-name';
import { ProductImage } from '../../pipes/product-image';

@NgModule({
  declarations: [
    CategoriesPage,
    CartPage,
    ProductListPage,
    ProductName,
    ProductImage
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
    IonicPageModule.forChild(CartPage),
    IonicPageModule.forChild(ProductListPage)

  ],
  entryComponents: [
    CategoriesPage,
    CartPage,
    ProductListPage

  ]
})
export class SharedPagesModule {}

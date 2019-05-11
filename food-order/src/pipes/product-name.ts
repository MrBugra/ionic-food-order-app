import { Pipe, PipeTransform } from '@angular/core';
import { ProductLazyLoad } from '../models/product';
@Pipe({
  name: 'productName',
})
export class ProductName implements PipeTransform {

  transform(value: number, ...args) {
    // This is our catch for data that hasn't interpolated
    // from its source yet, a basic async fix.
    if(value == null) return;
// Otherwise, lookup the state name from the acronym
      return ProductLazyLoad.filter(x=>x.id==value)[0].Name;
    }
  }

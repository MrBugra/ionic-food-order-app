import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Repository } from '../../../providers/firebase-repository';
import { ProductPage } from '../../product/product';
import { ProductListPage } from '../product-list/product-list';
import { ProductLazyLoad } from '../../../models/product';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage {

  categories:any;
  _repo:Repository;
  constructor(public navCtrl: NavController, public navParams: NavParams,private repo:Repository) {
    this._repo=repo;
    repo.getcategories().subscribe(x=>{this.categories=x;});
    this._repo.getWithLazyLoad('product').subscribe(x=>{
      ProductLazyLoad.push(...x);
    //console.log('products');
    console.log(ProductLazyLoad);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  private showProduct(id:number){
    
    this.navCtrl.push(ProductListPage,{CategoryId:id})
    
  }
}

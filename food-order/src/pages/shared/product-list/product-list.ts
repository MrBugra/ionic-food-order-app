import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Repository } from '../../../providers/firebase-repository';
import { Product } from '../../../models/product';
import { ProductPage } from '../../product/product';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  _repo:Repository;
  products:Product[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private repo: Repository) {
    this._repo=repo;
    this._repo.getProductByCategory(this.navParams.get('CategoryId')).subscribe(x=>{
      this.products=x;
      console.log(this.products);
    });
  }
  showProduct(id:number){
    this.navCtrl.push(ProductPage,{Id:id})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth.service';
import { Repository } from '../../../providers/firebase-repository';
import { CartProcess,CARTITEM } from '../../../models/cart-process';
import { CartService } from '../../../providers/cart.service';
import { Extensions } from '../extension';
import { CategoriesPage } from '../categories/categories';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
_repo:Repository;
_auth:AuthService;
_cartService:CartService;
cartItem=CARTITEM.filter(x=>x.parentId<0);
total:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private repo:Repository
    ,private cartService:CartService) {
    this._repo=repo;
    this._auth=authService;
    this._cartService=cartService;
console.log(CARTITEM);
      this.setTotal();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  decrease(product:CartProcess){
    this._cartService.RemoveFromCart(product.productId);
    this.setTotal();
    this.navCtrl.setRoot(CartPage);

  }
  increase(product:CartProcess){
    var added = Extensions.Clone(product);
    added.count=1;
    this._cartService.AddToCart(added);
    console.log(CARTITEM);
    this.setTotal();

  }

  public setTotal() {
    this.total=0;
    CARTITEM.forEach(element => {
      this.total+=  element.price*element.count
    });
  }  
  complete(){
    this._cartService.Complete(this._auth.getUserEmail(),'');
    this.navCtrl.setRoot(CategoriesPage);
  }
}

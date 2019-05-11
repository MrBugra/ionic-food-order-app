import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getSegmentsFromNavGroups } from 'ionic-angular/umd/navigation/url-serializer';
import { Repository } from '../../providers/firebase-repository';
import { Invoice } from '../../models/invoice';
import { AuthService } from '../../providers/auth.service';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  _repo:Repository;
  invoices:any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private repo:Repository,private auth:AuthService) {
      this._repo=repo;
      repo.getInvoicebyUser(/*auth.getUserEmail()*/'bugra_sarach@hotmail.com').subscribe(x=>{
        this.invoices=x;
        
      }); 


  }


  


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}

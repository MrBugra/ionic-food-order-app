import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController  ) {
  }
  resetPassword(){
    alert(this.email);
    this.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

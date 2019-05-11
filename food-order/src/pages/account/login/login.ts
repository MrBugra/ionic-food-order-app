import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../../models/User';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { AuthService } from '../../../providers/auth.service';
import { CategoriesPage } from '../../shared/categories/categories';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login', 
  templateUrl: 'login.html',
})
export class LoginPage {
  user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,private authService:AuthService) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login(){
    this.authService.signInWithEmail({
      email:this.user.email,password:this.user.password
    }).then(x=> {
      console.log(this.authService.user);
    });
    if(this.authService.user==null) alert("giriş başarısız")
    else    this.navCtrl.setRoot(CategoriesPage);      
  }
  navRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }
  forgotPassword(){
    let modal = this.modalCtrl.create(ForgotpasswordPage);
    modal.present();
  }
}

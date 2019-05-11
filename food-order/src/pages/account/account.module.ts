import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';
import { ForgotpasswordPage } from './forgotpassword/forgotpassword';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage,
    ForgotpasswordPage
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(LoginPage),
    IonicPageModule.forChild(RegisterPage)

  ],
  entryComponents:[
      LoginPage,
      RegisterPage,
      ForgotpasswordPage
  ]
})
export class AccountPagesModule {}

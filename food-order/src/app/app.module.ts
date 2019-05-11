import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AccountPagesModule } from '../pages/account/account.module';
import { SharedPagesModule } from '../pages/shared/shared.module';
import { AuthService } from '../providers/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from '../providers/firebase.config';
import { ProductPageModule } from '../pages/product/product.module';
import { DealsPageModule } from '../pages/deals/deals.module';
import { Repository } from '../providers/firebase-repository';
import { CartService } from '../providers/cart.service';
import { OrderPageModule } from '../pages/order/order.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    AccountPagesModule,
    SharedPagesModule,
    ProductPageModule,
    DealsPageModule,
    OrderPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), 
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    Repository,
    CartService,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

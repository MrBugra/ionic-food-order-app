import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Repository } from '../../providers/firebase-repository';
import { Product, ProductLazyLoad } from '../../models/product';
import { ProductOption, ProductExtra, ProductSize } from '../../models/product-partial';
import { CartProcess, CARTITEM } from '../../models/cart-process';
import { AuthService } from '../../providers/auth.service';
import { CartService } from '../../providers/cart.service';
import { database } from 'firebase';
import { identifierModuleUrl } from '@angular/compiler';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
    count:number=1;
    _repo:Repository;
    product:Product={
CategoryId: -1
,Description: ""
,DiscountedPrice: 0
,Name: ""
,Price: 0
,Url: ""
,id: -1
    };
    
    isFaved:boolean=false;
    favBtnText:string='Favorilere Ekle';

    productOption:ProductOption[];
    productExtra:ProductExtra[];
    productSize:ProductSize[];
    
    selectedproductOption:ProductOption[]=new Array<ProductOption>();
    selectedproductSize:any;
    selectedproductExtra:ProductExtra[]=new Array<ProductExtra>();

    

    constructor(public navCtrl: NavController, public navParams: NavParams,private repo: Repository,
      private authService:AuthService,private cartService:CartService) {
        console.log('açıldı');
        this.selectedproductOption=new Array<ProductOption>();
        this.selectedproductSize='';
        this.selectedproductExtra=new Array<ProductExtra>();
        this.count=1;
        
      //#region  insert
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:0,Description:'Domates'});
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:0,Description:'Sogan'});
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:0,Description:'Tursu'});

      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:1,Description:'Mantar'});
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:1,Description:'Sarımsak'});
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:1,Description:'Sogan'});

      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:2,Description:'Fazla Kizarmis'});
      // this.repo.insertSingleDataToDb('ProductOption',<ProductOption>{ProductId:2,Description:'Az Kizarmis'});
      
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:0,Description:'Cheddar',Price:1});
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:0,Description:'Sogan Halkasi',Price:2});
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:0,Description:'Fume Et',Price:2});

      
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:1,Description:'Ton Baligi',Price:1});
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:1,Description:'Sosis',Price:2});
      // this.repo.insertSingleDataToDb('ProductExtra',<ProductExtra>{ProductId:1,Description:'Salam',Price:2});

      
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:0,Description:'X-L',Price:8});
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:0,Description:'XX-L',Price:12});
      
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:1,Description:'X-L',Price:8});
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:1,Description:'XX-L',Price:12});
      
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:2,Description:'X-L',Price:8});
      // this.repo.insertSingleDataToDb('ProductSize',<ProductSize>{ProductId:2,Description:'XX-L',Price:12});
      
//#endregion

      this._repo=repo;
      this._repo.getProductById(this.navParams.get('Id')).subscribe(x=>{
        this.product=x[0];
        console.log(this.product);
      });
      this._repo.getProductOption().subscribe(x=>{
        this.productOption=x.filter(z=>z.ProductId==this.product.id);
  // this.selectedproductOption= Object.assign([], this.productOption);
  // console.log(this.productOption); 

      })
      this._repo.getProductExtra().subscribe(x=>{
        this.productExtra=x.filter(z=>z.ProductId==this.product.id);
  // console.log(this.productExtra); 
      })
      this._repo.getProductSize().subscribe(x=>{
        this.productSize=x.filter(z=>z.ProductId==this.product.id);
   //console.log(this.productSize); 

      })

  }
  radioChecked(data){
    //console.log(data);
    if(data!=-1) {
      this.selectedproductSize=JSON.parse(JSON.stringify(data));      
    };
    if(data==-1) this.selectedproductSize.Description='none';
  }
  checkboxChecked(pex){
    if(pex.checked){
      this.selectedproductExtra.push(pex);
    }
    else{
      var index=this.selectedproductExtra.indexOf(pex);
      if(index!=-1)this.selectedproductExtra.splice(index,1);
    }
   // console.log(this.selectedproductExtra);
  }
  optcheckboxChecked(pop){

    if(pop.checked){
      this.selectedproductOption.push(pop);
    }
    else{
      var index=this.selectedproductOption.indexOf(pop);
      if(index!=-1)this.selectedproductOption.splice(index,1);
    }
    //console.log(this.selectedproductOption);
  }
  addtoCart(){
    var _description='';
    console.log(this.selectedproductOption);
    this.productOption.forEach(element => {
      if (this.selectedproductOption.filter(x=>x.Description==element.Description).length>0) {

        _description=_description+element.Description+' var.'
      }
      else{_description=_description+element.Description+' yok.';}
    });
    this.cartService.AddToCart
    (
    <CartProcess>{
    email:this.authService.getUserEmail(),
    displayName:this.authService.getUserName(),
    productId:this.product.id,
    description:_description,
    price:this.product.Price>this.product.DiscountedPrice&&this.product.DiscountedPrice>0?this.product.DiscountedPrice:this.product.Price,
    date:new Date().toLocaleDateString(),
    parentId:-1,//=>productId
    count:this.count
    }
    );
    if(this.selectedproductExtra.length>0)
    this.selectedproductExtra.forEach(element => {
      this.cartService.AddToCart
    (
      <CartProcess>{
        email:this.authService.getUserEmail(),
        displayName:this.authService.getUserName(),
        productId:-1,
        description:element.Description,
        price:element.Price,
        date:new Date().toLocaleDateString(),
        parentId:element.ProductId,//=>productId
        count:this.count
        }
    )
    });


    if(this.selectedproductSize.Description!='none'&&this.selectedproductSize.ProductId>=0)
      this.cartService.AddToCart
    (
      <CartProcess>{
        email:this.authService.getUserEmail(),
        displayName:this.authService.getUserName(),
        productId:-1,
        description:this.selectedproductSize.Description,
        price:this.selectedproductSize.Price,
        date:new Date().toLocaleDateString(),
        parentId:this.selectedproductSize.ProductId,//=>productId
        count:this.count
        }
    )



    ;

    console.log(CARTITEM);
  }
  addtoFav(){
    this._repo.addtoFav(this.authService.getUserEmail(),this.product.id);
    this.isFaved=true;
    this.favBtnText='Eklendi';

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');

  }


}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import { Category } from '../models/category';
import { ProductOption, ProductExtra, ProductSize } from '../models/product-partial';
import { Product, ProductLazyLoad } from '../models/product';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Invoice } from '../models/invoice';
import { CartProcess } from '../models/cart-process';
@Injectable()
export class Repository {
	
_db:any;
	constructor(db:AngularFireDatabase) {
        this._db=db;        
        
    }

    getFav(email:string){
        return this.getListOfQuery<Invoice[]>('userFavs','email',email);
    }
    addtoFav(email:string,productId:number){
        this.insertSingleDataToDb('userFavs', {
          email:email,
          productId:productId
        })
      }


    getCartProcessbyGuid(guid:string):Observable<CartProcess[]>{
        return this.getListOfQuery<Invoice[]>('carts','guid',guid);
    }
    getInvoicebyUser(email:string):Observable<Invoice[]>{
        return this.getListOfQuery<Invoice[]>('invoice','email',email);
    }
    getProductById(id:number):Observable<Product[]>{
        return this.getFirstOfQuery<Product>('product','id',id);
    }
    
    getProductByCategory(categoryId:number):Observable<Product[]>{
        return  this.getListOfQuery<Product[]>('product','CategoryId',categoryId);
        
    }
    getProductOption():Observable<any>{
        return this.getWithLazyLoad('ProductOption');
       
    }
    
    getProductExtra():Observable<any>{
        return this.getWithLazyLoad('ProductExtra');
    }
    
    getProductSize():Observable<any>{
        return this.getWithLazyLoad('ProductSize');
    }

     getcategories():Observable<any>{
        return this.getWithLazyLoad('category');
        }
     public getWithLazyLoad(tableName:string):Observable<any> {
        var result:any;
        return this._db.list(tableName).valueChanges();
    }
    insertSingleDataToDb(tableName:string,data:any){                     
            this._db.list(tableName).push(data);                  
    }
    getListOfQuery<T>(tableName:string,columnName:string,equalTo:any):Observable<any>{
        var result:any;
        return this._db.list(tableName,ref => ref.orderByChild(columnName).equalTo(equalTo)).valueChanges() 
;
}
getFirstOfQuery<T>(tableName:string,columnName:string,equalTo:any):Observable<any>{
    var result:any;
    return this._db.list(tableName,ref => ref.orderByChild(columnName).equalTo(equalTo).limitToFirst(1)).valueChanges();
;
}
}
import { Injectable } from '@angular/core';
import { CartProcess, CARTITEM } from '../models/cart-process';
import { Repository } from './firebase-repository';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { Guid } from '../pages/shared/extension';

@Injectable()
export class CartService {
	public user: firebase.User;

	constructor(private repo:Repository) {

	}
	public getCart(){
		return CARTITEM;
	}
public AddToCart(item:CartProcess){
	
	var addeditem = CARTITEM.filter(x=>x.productId==item.productId&&item.parentId==-1)[0];
	console.log(addeditem);
    if (addeditem!=null) {
		addeditem.count+=item.count;
		
    }
    else {
      CARTITEM.push(item);

	}


}
public RemoveFromCart(id:number){
	var x=CARTITEM.filter(x=>x.productId==id);
	x.forEach(element => {
		CARTITEM.splice(CARTITEM.indexOf(element),1);
	});
	var xx=CARTITEM.filter(x=>x.parentId==id);
	xx.forEach(element => {
		CARTITEM.splice(CARTITEM.indexOf(element),1);
	});
}
public Complete(email:string,address:string){
	var _guid=Guid.newGuid();
	var total=0;
	CARTITEM.forEach(element => {
		element.guid=_guid;
		total+=element.price*element.count;
	this.repo.insertSingleDataToDb('carts',element);

	});
	//cartprocessler dbye yüklencek
	

	this.repo.insertSingleDataToDb('invoice',<Invoice>{
		email:email,price:total,address:address,discountedPrice:0,date:new Date().toLocaleDateString(),guid:_guid
	});
	this.ClearCart();
}
public ClearCart(){
	CARTITEM.splice(0,CARTITEM.length);
}
public getInvoicebyUser(email):Observable<Invoice[]>{
	return this.repo.getInvoicebyUser(email);
}

public getCartProcessbyGuid(guid):Observable<CartProcess[]>{
	return this.repo.getCartProcessbyGuid(guid);
}


}


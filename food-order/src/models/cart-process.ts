export class CartProcess{
    email:string;
    displayName:string;
    productId:number;
    description:string;
    price:number;
    date:string;
    parentId:number;//=>productId
    count:number;
    guid:string;

}
export const CARTITEM:CartProcess[]=[];
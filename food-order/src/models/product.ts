export class Product{
    //image:
    id:number;
    Name:string;
    Url:string;
    Price:number;
    DiscountedPrice:number;      
    Description:string;
    CategoryId:number;
}

export const ProductLazyLoad:Product[]=[];

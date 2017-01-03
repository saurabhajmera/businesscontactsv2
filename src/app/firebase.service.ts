import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Category} from "../model/Category";
import {Business} from "../model/Business";

@Injectable()
export class FirebaseService {
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;


  constructor(private af:AngularFire){
  }

  getWelcomeMessage():string{
    return "Hello!";
  }

  getItems(){
    return this.af.database.list('/items/items');
  }

  getBusinesses(category:string=null){
    if(category){
      this.businesses = this.af.database.list('/businesses',{
        query:{
          orderByChild:'categories'
        }
      }) as FirebaseListObservable<Business[]>;
    }else{

    // console.log(this.af.database.list('/businesses'));
    this.businesses = this.af.database.list('/businesses') as FirebaseListObservable<Business[]>;
    }

    return this.businesses;

  }

  getCategories(){
    this.categories = this.af.database.list('/categories/categories') as FirebaseListObservable<Category[]>;
    return this.categories;
  }

  addBusiness(newBusiness: Business) {
    // console.log(JSON.stringify(newBusiness));
    this.businesses.push(newBusiness);

  }

  updateBusiness(key:any,activeBusiness: Business) {
    this.businesses.update(key,activeBusiness);
  }

  deleteBusiness(key: any) {
    this.businesses.remove(key);
  }
}

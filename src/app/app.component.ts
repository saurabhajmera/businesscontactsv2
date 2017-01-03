import {Component, OnInit} from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {FirebaseService} from "./firebase.service";
import {Business} from "../model/Business";
import {Category} from "../model/Category";
import {ApplicationStateService} from "./application-state.service";
import {ActiveBusinessService} from "./active-business.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService,ApplicationStateService,ActiveBusinessService]
})
export class AppComponent extends OnInit{
  items: FirebaseListObservable<any[]>;
  businesses: Array<Business>;
  categories: Array<Category>;

  activeKey:any;

  title = 'app works!';

  constructor(
      private _fbSerivce:FirebaseService,
      private _appStateService:ApplicationStateService,
      private _activeBusinessService:ActiveBusinessService
  ){
    super();
  }

  ngOnInit(): void {
    this._appStateService.appState='default';
    console.log(this._fbSerivce.getWelcomeMessage());
    this.items = this._fbSerivce.getItems();

    this._fbSerivce.getBusinesses().subscribe(businesses=>{
      this.businesses=businesses;
    });

    this._fbSerivce.getCategories().subscribe(categories=>{
      // console.log(categories);

      this.categories=categories;
    });


  }

  changeState(state, key, business: Business) {
    this._appStateService.appState = state;
    if (business) {
      // console.log(business);
      this._activeBusinessService.activeBusiness=business;
    }

    if (key) {
      console.log("Keys is:" + key + " Application state is:" + this._appStateService.appState);
      this.activeKey = key;
      this._activeBusinessService.activeKey=key;

    }

  }


  filterByCategory(categoryFilterValue){
    this._fbSerivce.getBusinesses(categoryFilterValue).subscribe(resBusinesses =>{
      console.log("Looking for:"+categoryFilterValue);
      var newBusinesses:Array<Business>=[];
      for(let business of resBusinesses){
        // console.log(business.name+"||"+business.categories.toString());
        for(let category of business.categories){
          if(category === categoryFilterValue){
            newBusinesses.push(business);
          }
        }
      }

      this.businesses = newBusinesses;
    });
  }

  deleteBusiness(key){
    this._fbSerivce.deleteBusiness(key);

    this.changeState('default',null,null)

  }

}

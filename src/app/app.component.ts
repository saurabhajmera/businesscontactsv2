import {Component, OnInit} from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {FirebaseService} from "./firebase.service";
import {Business} from "../model/Business";
import {Category} from "../model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService]
})
export class AppComponent extends OnInit{
  items: FirebaseListObservable<any[]>;
  businesses: Array<Business>;
  categories: Array<Category>;
  appState:string;
  activeKey:any;

  title = 'app works!';

  constructor(private _fbSerivce:FirebaseService){
    super();
  }

  ngOnInit(): void {
    this.appState='default';
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

  changeState(state,key){
    console.log("Application state is:"+this.appState);
    this.appState = state;
    if(key){
      console.log("Keys is:"+key+" Application state is:"+this.appState);
    }
    this.activeKey=key;
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

}

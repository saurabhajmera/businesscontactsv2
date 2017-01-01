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
  businesses: Business[];
  categories: Category[];

  title = 'app works!';

  constructor(private _fbSerivce:FirebaseService){
    super();
  }

  ngOnInit(): void {
    console.log(this._fbSerivce.getWelcomeMessage());
    this.items = this._fbSerivce.getItems();

    this._fbSerivce.getBusinesses().subscribe(businesses=>{
      // console.log(businesses);
      console.log(typeof businesses);
      this.businesses=businesses;
    });

    this._fbSerivce.getCategories().subscribe(categories=>{
      console.log(categories);
      console.log(typeof categories);

      this.categories=categories;
    });

  }

}

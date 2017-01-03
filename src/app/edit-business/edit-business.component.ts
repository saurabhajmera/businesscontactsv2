import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../firebase.service";
import {Category} from "../../model/Category";
import {ActiveBusinessService} from "../active-business.service";
import {attributeMap} from "../../resources/application-constants";
import {Business} from "../../model/Business";
import {ApplicationStateService} from "../application-state.service";

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {
  categories:Array<Category>;
  activeBusinessName;
  activeCategory;
  activeBusinessAddress;
  activeBusinessCity;
  activeBusinessState;
  activeBusinessIsOpen:boolean;
  Accepts_Credit_Cards:boolean;
  Good_For_Groups:boolean;
  Outdoor_Seating:boolean;
  Happy_Hour:boolean;
  By_Appointment_Only:boolean;
  Good_For_Kids:boolean;
  Vegetarian:boolean;


  constructor(private _fbService:FirebaseService,
              private _activeBusinessService:ActiveBusinessService,
              private _appStateService:ApplicationStateService

  ) {

    if(_activeBusinessService.activeBusiness){
      var activeBusiness = _activeBusinessService.activeBusiness;
      this.activeBusinessName = activeBusiness.name;
      this.activeCategory = activeBusiness.categories[0];
      this.activeBusinessAddress = activeBusiness.full_address;
      this.activeBusinessCity = activeBusiness.city;
      this.activeBusinessState = activeBusiness.state;
      this.activeBusinessIsOpen = activeBusiness.open;
      this.Accepts_Credit_Cards = this.setAttribute(activeBusiness.attributes,attributeMap["Accepts_Credit_Cards"]);
      this.Good_For_Groups = this.setAttribute(activeBusiness.attributes,attributeMap["Good_For_Groups"]);
      this.Outdoor_Seating = this.setAttribute(activeBusiness.attributes,attributeMap["Outdoor_Seating"]);
      this.Happy_Hour = this.setAttribute(activeBusiness.attributes,attributeMap["Happy_Hour"]);
      this.By_Appointment_Only = this.setAttribute(activeBusiness.attributes,attributeMap["By_Appointment_Only"]);
      this.Good_For_Kids = this.setAttribute(activeBusiness.attributes,attributeMap["Good_For_Kids"]);
      this.Vegetarian = this.setAttribute(activeBusiness.attributes,attributeMap["Vegetarian"]);

    }else{
      throw "Active Business is not set";
    }

  }

  private setAttribute(attributes: any, attribute: string) {
    for(let a of attributes){
      if(a === attribute){
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    this._fbService.getCategories().subscribe(response=>{
      this.categories = response;
    });
  }

  editBusiness(){
    var activeBusiness = new Business();
    activeBusiness.name = this.activeBusinessName;
    activeBusiness.attributes = [];
    activeBusiness.categories = [];
    if(this.Accepts_Credit_Cards){
      activeBusiness.attributes.push(attributeMap["Accepts_Credit_Cards"]);
    }
    if(this.Good_For_Groups){
      activeBusiness.attributes.push(attributeMap["Good_For_Groups"]);
    }
    if(this.Outdoor_Seating){
      activeBusiness.attributes.push(attributeMap["Outdoor_Seating"]);
    }
    if(this.Happy_Hour){
      activeBusiness.attributes.push(attributeMap["Happy_Hour"]);
    }
    if(this.By_Appointment_Only){
      activeBusiness.attributes.push(attributeMap["By_Appointment_Only"]);
    }
    if(this.Good_For_Kids){
      activeBusiness.attributes.push(attributeMap["Good_For_Kids"]);
    }
    if(this.Vegetarian){
      activeBusiness.attributes.push(attributeMap["Vegetarian"]);
    }

    activeBusiness.categories.push(this.activeCategory);
    activeBusiness.full_address = this.activeBusinessAddress;
    activeBusiness.city = this.activeBusinessCity;
    activeBusiness.state = this.activeBusinessState;
    activeBusiness.open = this.activeBusinessIsOpen;

    this._fbService.updateBusiness(this._activeBusinessService.activeKey,activeBusiness);
    this._appStateService.appState = "default";



  }

}

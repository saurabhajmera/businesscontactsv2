import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Business} from "../../model/Business";
import {Category} from "../../model/Category";
import {FirebaseService} from "../firebase.service";
import {ApplicationStateService} from "../application-state.service";
import {attributeMap} from "../../resources/application-constants";

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css'],

})

export class AddBusinessComponent implements OnInit {
  newBusiness:Business;

  categories:Array<Category>;
  public addBusinessForm = this.fb.group({
    businessName: [],
    category: [],
    businessAddress:[],
    businessCity:[],
    businessState:[],
    businessIsOpen:[],
    Accepts_Credit_Cards:[],
    Good_For_Groups:[],
    Outdoor_Seating:[],
    Happy_Hour:[],
    By_Appointment_Only:[],
    Good_For_Kids:[],
    Vegetarian:[],
  });


  constructor(public fb: FormBuilder,private _fbSerivce:FirebaseService,private _appStateService:ApplicationStateService) { }

  ngOnInit() {
    this._fbSerivce.getCategories().subscribe(response=>{
      this.categories = response;
    });


  }

  addBusiness(event){
    console.log(event);
    let formData = this.addBusinessForm.value;
    if(formData) {
      this.newBusiness = new Business();
      this.newBusiness.categories=[];
      this.newBusiness.attributes=[];
      this.newBusiness.name = formData.businessName;
      this.newBusiness.categories.push(formData.category);
      this.newBusiness.full_address=formData.businessAddress;
      this.newBusiness.city = formData.businessCity;
      this.newBusiness.state = formData.businessState;
      this.newBusiness.open = formData.businessIsOpen;

      if(formData.Accepts_Credit_Cards){
        this.newBusiness.attributes.push(attributeMap["Accepts_Credit_Cards"]);
      }
      if(formData.Good_For_Groups){
        this.newBusiness.attributes.push(attributeMap["Good_For_Groups"]);
      }
      if(formData.Outdoor_Seating){
        this.newBusiness.attributes.push(attributeMap["Outdoor_Seating"]);
      }
      if(formData.Happy_Hour){
        this.newBusiness.attributes.push(attributeMap["Happy_Hour"]);
      }
      if(formData.By_Appointment_Only){
        this.newBusiness.attributes.push(attributeMap["By_Appointment_Only"]);
      }
      if(formData.Good_For_Kids){
        this.newBusiness.attributes.push(attributeMap["Good_For_Kids"]);
      }
      if(formData.Vegetarian){
        this.newBusiness.attributes.push(attributeMap["Vegetarian"]);
      }

      this._fbSerivce.addBusiness(this.newBusiness);
      this._appStateService.appState = "default";
    }
  }



}

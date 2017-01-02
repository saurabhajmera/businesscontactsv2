import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Business} from "../../model/Business";
import {Category} from "../../model/Category";
import {FirebaseService} from "../firebase.service";

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
  });


  constructor(public fb: FormBuilder,private _fbSerivce:FirebaseService) { }

  ngOnInit() {
    this._fbSerivce.getCategories().subscribe(response=>{
      this.categories = response;
    })
  }

  addBusiness(event){
    console.log(event);
    let formData = this.addBusinessForm.value;
    if(formData) {
      this.newBusiness = new Business();
      this.newBusiness.name = formData.businessName;


      console.log(formData.category);
    }
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";


//Must export the firebase config
export const firebaseConfig = {
  apiKey:'AIzaSyBFBUNKePS9vT84gj7qmiTssnoyN6faWo8',
  authDomain:'businesscontacts-33619.firebaseapp.com',
  databaseURL:'https://businesscontacts-33619.firebaseio.com',
  storageBucket:'businesscontacts-33619.appspot.com',
  messagingSenderId:'990065381141',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

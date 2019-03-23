import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBfaJblOpV87LYEtzDTpCFZdwH6xgysseE',
  authDomain: 'cs315-project.firebaseapp.com',
  databaseURL: 'https://cs315-project.firebaseio.com',
  projectId: 'cs315-project',
  storageBucket: 'cs315-project.appspot.com',
  messagingSenderId: '489044652164'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

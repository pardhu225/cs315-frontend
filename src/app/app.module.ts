import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { UserStatusService } from './services/user-status.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule } from '@angular/material';
import { RegisterComponent } from './components/register/register.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    NavbarComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    AuthGuard,
    UserStatusService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

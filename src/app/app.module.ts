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
import { MatFormFieldModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { RegisterComponent } from './components/register/register.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifiedUsersGuard } from './guards/verfied-users.guard';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { FacCourseManagementComponent } from './components/faculty/fac-course-management/fac-course-management.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoadingComponent } from './components/misc/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FacultyOnlyGuard } from './guards/faculty-only.guard';
import { LoadingController } from './services/loading.controller';
import { AddDropComponent } from './components/add-drop/add-drop.component';
import {MatSelectModule} from '@angular/material/select';

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
    DashboardComponent,
    EditInfoComponent,
    FacCourseManagementComponent,
    LoadingComponent,
    AddDropComponent
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
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthGuard,
    UserStatusService,
    AngularFireAuth,
    VerifiedUsersGuard,
    FacultyOnlyGuard,
    LoadingController
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoadingComponent
  ]
})
export class AppModule { }

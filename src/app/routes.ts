import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { VerifiedUsersGuard } from './guards/verfied-users.guard';
import { FacCourseManagementComponent } from './components/faculty/fac-course-management/fac-course-management.component';
import { FacultyOnlyGuard } from './guards/faculty-only.guard';
import { AddDropComponent } from './components/add-drop/add-drop.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'edit-info', component: EditInfoComponent, canActivate: [AuthGuard, VerifiedUsersGuard] },

    { path: 'faculty/manage-courses', component: FacCourseManagementComponent, canActivate: [AuthGuard, FacultyOnlyGuard]  },
    { path: 'add-drop', component: AddDropComponent, canActivate: [AuthGuard]  },

    { path: '**', component: PageNotFoundComponent }
];

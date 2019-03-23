import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];

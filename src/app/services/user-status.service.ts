import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import iziToast, { IziToastSettings } from 'izitoast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  loggedIn = new BehaviorSubject<'true' | 'false' | 'null'>('null');
  user = new BehaviorSubject<any>(null);
  fetchingDataFromDB = new BehaviorSubject<boolean>(false);
  lastRefreshed: number = null;
  refreshIntervalId: any;
  emailVerified = new BehaviorSubject<'true' | 'false' | 'null'>('null');
  coursesThisSem = new BehaviorSubject([]);
  userType: null | 'student' | 'faculty' = null;
  userProps = [
    'name',
    'address',
    'marital_status',
    'date_of_birth',
    'mobile_1',
    'alternate_email',
    'hostel',
    'room',
    'father_name',
    'mother_name',
    'father_mobile_1',
    'mother_mobile_1',
  ];

  constructor(private auth: AngularFireAuth, private http: HttpClient, private router: Router) {
    this.auth.authState.subscribe(u => {
      if (u) {
        this.refreshUser();
        this.emailVerified.next(u.emailVerified ? 'true' : 'false');
        this.refreshIntervalId = setInterval(() => this.refreshUser(), 600 * 1000);
        this.loggedIn.next('true');
      } else {
        if (this.refreshIntervalId) {
          clearInterval(this.refreshIntervalId);
          this.refreshIntervalId = null;
        }
        this.loggedIn.next('false');
        this.emailVerified.next('null');
        this.user.next(null);
        this.fetchingDataFromDB.next(false);
      }
    });
  }

  public updateUser(obj): Promise<any> {
    let url = `/api/student/update`;
    if (this.user.getValue() && this.user.getValue().userType === 'faculty') {
      url = '/api/faculty/update';
    }
    return this.auth.auth.currentUser.getIdToken().then(tok => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', tok);
      return this.http.put(url, obj, { headers })
        .toPromise()
        .then(() => this.refreshUser())
        .catch(err => Promise.reject(err));
    });
  }

  public logout() {
    this.auth.auth.signOut().then(() => {
      const c: IziToastSettings = {
        message: 'Logged out successfully',
        position: 'bottomLeft'
      };
      iziToast.success(c);
      this.router.navigate(['']);
    });
  }

  public refreshUser() {
    if (!this.auth.auth.currentUser) {
      throw new Error('No user found to refresh');
    }
    const usr = <any>{firebase: this.auth.auth.currentUser};
    return this.auth.auth.currentUser.getIdToken()
        .then(token => {
          usr.firebase.idToken = token;
          this.fetchingDataFromDB.next(true);
          return this.http.post('/api/user/me', {}, { headers: { 'Authorization': token } }).toPromise();
        })
        .then((res: any) => {
          const j = <any>res;
          j.firebase = usr.firebase;
          let completed = true;
          for ( let i = 0; i < this.userProps.length; i++) {
            if (!j.userDetails[this.userProps[i]]) {
              completed = false;
              console.log(this.userProps[i], 'not completeed');
            }
          }
          j.completed = completed;
          this.coursesThisSem.next(res.courses);
          this.user.next(j);
          this.fetchingDataFromDB.next(false);
          if (this.emailVerified.getValue() === 'true' && !completed) {
            this.router.navigate(['/edit-info']);
            iziToast.info({
              title: 'Please fill your details before you may continue',
              position: 'center',
              overlay: true
            });
          }
        })
        .catch(err => {
          this.user.next(null);
          this.coursesThisSem.next([]);
          this.fetchingDataFromDB.next(false);
        });
  }
}

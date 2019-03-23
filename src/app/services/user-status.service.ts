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

  constructor(private auth: AngularFireAuth, private http: HttpClient, private router: Router) {
    this.auth.authState.subscribe(u => {
      if (u) {
        this.refreshUser();
        this.refreshIntervalId = setInterval(() => this.refreshUser(), 600 * 1000);
      } else {
        if (this.refreshIntervalId) {
          clearInterval(this.refreshIntervalId);
          this.refreshIntervalId = null;
        }
        this.loggedIn.next('false');
        this.user.next(null);
        this.fetchingDataFromDB.next(false);
      }
    });
  }

  public updateUser(obj): Promise<any> {
    const url = `/api/user/update`;

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
          const headers = new HttpHeaders().append('Authorization', token);
          this.fetchingDataFromDB.next(true);
          return this.http.get('/api/user/me', { headers: headers }).toPromise();
        })
        .then(res => {
          this.lastRefreshed = new Date().getTime();
          const j = <any>res;
          j.firebase = usr.firebase;
          this.user.next(j);
          this.loggedIn.next('true');
          this.fetchingDataFromDB.next(false);
        })
        .catch(err => {
          this.loggedIn.next('false');
          this.user.next(null);
          this.fetchingDataFromDB.next(false);
        });
  }
}

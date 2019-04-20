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
  studentProps = [
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
  facultyProps = [
    'name',
    'address',
    'phone',
    'email',
    'address'
  ];
  userProps = [];
  idToken = null;
  dues = new BehaviorSubject<any>([]);
  currentStudents = new BehaviorSubject<any>([]);
  waitingStudents = new BehaviorSubject<any>([]);
  waitStats = <any>{};
  acceptedStats = <any>{};

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
        console.log('here what');
        this.user.next(null);
        this.fetchingDataFromDB.next(false);
      }
    });
    this.user.subscribe(r => console.log(r));
  }

  public updateUser(obj): Promise<any> {
    let url = `/api/student/update`;
    if (this.user.getValue() && this.user.getValue().userType === 'faculty') {
      url = '/api/faculty/update';
    }
    return this.auth.auth.currentUser.getIdToken().then(tok => {
      let headers = new HttpHeaders();
      console.log(tok);
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
    const usr = <any>{ firebase: this.auth.auth.currentUser };
    return this.auth.auth.currentUser.getIdToken()
    .then(token => {
      usr.firebase.idToken = token;
        this.fetchingDataFromDB.next(true);
        console.log(token);
        this.idToken = token;
        return this.http.post('/api/user/me', {}, { headers: { 'Authorization': token } }).toPromise();
      })
      .then((res: any) => {
        console.log(res);
        const j = <any>res;
        j.firebase = usr.firebase;
        let completed = true;
        this.userProps =  j.usertype === 'faculty' ? this.facultyProps : this.studentProps;
        for (let i = 0; i < this.userProps.length; i++) {
          if (!j.userDetails[this.userProps[i]]) {
            completed = false;
            console.log(this.userProps[i], 'not completeed');
          }
        }
        j.completed = completed;
        this.coursesThisSem.next(res.courses);
        console.log(j);
        this.user.next(j);
        this.fetchingDataFromDB.next(false);
        console.log(this.user.getValue().firebase.uid);
        if (this.emailVerified.getValue() === 'true' && !completed) {
          this.router.navigate(['/edit-info']);
          iziToast.info({
            title: 'Please fill your details before you may continue',
            position: 'center',
            overlay: true
          });
        }
        return this.fetchOtherDetails();
      })
      .then(results => {
        if (this.user.getValue().usertype === 'student') {
          this.coursesThisSem.next(results[0]);
          this.dues.next(results[1]);
          console.log('Extra details are:', results);
        } else if (this.user.getValue().usertype === 'faculty') {
          results[0].sort((a, b) => a.taking_as === 'Instructor Incharge' ? 1 : -1);
          this.coursesThisSem.next(results[0]);
          this.currentStudents.next(results[1]);
          // this.waitingStudents.next(results[1].filter(e => e.status === 'waiting'));
          console.log('Extra details are:', results);
        }
      })
      .catch(err => {
        console.warn(err);
        this.user.next(null);
        this.coursesThisSem.next([]);
        this.fetchingDataFromDB.next(false);
      });
  }

  /**
   * @returns = [
   *    0: The courses taken by the current student in this semester
   *    1:
   * ]
   */
  fetchOtherDetails() {
    const u = this.user.getValue();
    if (!u) {
      return;
    }
    if (u.usertype === 'student') {
      const promises: Promise<any>[] = [
        this.http.get('/api/student/courses-this-sem', { headers: { 'Authorization': this.idToken } }).toPromise(),
        this.http.post('/api/hall-dues', {}, {headers: {'Authorization': this.idToken}}).toPromise()
      ];
      return Promise.all(promises);
    } else {
      const promises: Promise<any>[] = [
        this.http.get('/api/faculty/courses-this-sem', { headers: { 'Authorization': this.idToken } }).toPromise(),
        this.http.post('/api/faculty/current-students', {}, { headers: { 'Authorization': this.idToken } }).toPromise(),
      ];
      return Promise.all(promises);
    }
  }
}

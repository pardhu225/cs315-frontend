import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { UserStatusService } from 'src/app/services/user-status.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.css']
})
export class RequestResponseComponent implements OnInit {
  currentCourse;
  currStuds = new BehaviorSubject<any>([]);
  constructor(private auth: AngularFireAuth, private http: HttpClient, public uss: UserStatusService) { }

  ngOnInit() {
  }

  showStudents() {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        console.log(this.currentCourse);
        return this.http.post('api/faculty/students-of', {
          offering_id: this.currentCourse
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(res => {
        console.log(res);
        this.currStuds.next(res);
      });
  }

  acceptThis(uid) {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('api/faculty/course-accepted', {
          offering_id: this.currentCourse, uid: uid
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(r => {
        iziToast.success({
          title: 'Action successful'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({message: 'Unsuccessful'});
      });
  }


  rejectThis(uid) {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('api/faculty/course-rejected', {
          offering_id: this.currentCourse, uid: uid
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(r => {
        iziToast.success({
          title: 'Action successful'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({message: 'Unsuccessful'});
      });
  }


  meetThis(uid) {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('api/faculty/course-ask-to-meet', {
          offering_id: this.currentCourse, uid: uid
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(r => {
        iziToast.success({
          title: 'Action successful'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({message: 'Unsuccessful'});
      });
  }

  


  acceptDrop(uid) {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('api/faculty/drop-accept', {
          offering_id: this.currentCourse, uid: uid
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(r => {
        iziToast.success({
          title: 'Action successful'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({message: 'Unsuccessful'});
      });
  }


  rejectDrop(uid) {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('api/faculty/drop-reject', {
          offering_id: this.currentCourse, uid: uid
        }, { headers: { 'Authorization': token } }).toPromise();
      })
      .then(r => {
        iziToast.success({
          title: 'Action successful'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({message: 'Unsuccessful'});
      });
  }
}

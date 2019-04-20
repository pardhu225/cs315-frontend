import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import iziToast from 'izitoast';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaint: string;
  complaintType: string;
  complaintTitle: string;
  location: string;
  history = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    console.log('ngOnInit calledS');
    this.refreshHistory();
  }

  lodge() {
    this.auth.auth.currentUser.getIdToken()
    .then(token => {
      return this.http.post('/api/push-complaint', {
        complaint: this.complaint,
        complaintType: this.complaintType,
        location: this.location,
        complaint_title: this.complaintTitle
      }, {headers: {'Authorization': token}}).toPromise();
    })
    .then(res => {
      alert(res);
      iziToast.success({
        title: 'Success',
        message: 'Complaint successfully lodged',
        overlay: true,
        position: 'center'
      });
      this.refreshHistory();
    }).catch(e => {
      console.log(e);
      iziToast.error({
        title: 'Error',
        message: 'Complaint not lodged. Try again',
        overlay: true,
        position: 'center'
      });
    });
  }

  refreshHistory() {
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        return this.http.post('/api/complaint-history', {}, {headers: {'Authorization': token}}).toPromise();
      })
      .then(res => {
        console.log(res, 'asdfasdf');
        this.history.next(res);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'src/app/services/loading.controller';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserStatusService } from 'src/app/services/user-status.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-fac-course-management',
  templateUrl: './fac-course-management.component.html',
  styleUrls: ['./fac-course-management.component.css']
})
export class FacCourseManagementComponent implements OnInit {
  courses = [];
  offeringBeingCreated: string;
  offering_as: string;
  remark: string;
  courseToBeTutor: string;
  coursesThisSem = [];
  constructor(public loadingCtrl: LoadingController, private http: HttpClient,
    private auth: AngularFireAuth, private uss: UserStatusService) {
    this.loadingCtrl.present('Loading Courses');

    this.uss.user.subscribe(u => {
      if (!u) {
        return;
      }
      this.auth.auth.currentUser.getIdToken()
        .then(token => {
          return Promise.all([
            this.http.post('/api/all-courses', {dept: u.userDetails.department}, { headers: { 'Authorization': token } }).toPromise(),
            this.http.get('/api/student/all-courses-this-sem', {headers: {'Authorization': token}}).toPromise()
          ]);
        })
        .then((res: any) => {
          this.courses = res[0];
          this.coursesThisSem = res[1];
          this.loadingCtrl.dismiss();
          console.log(u.userDetails.department, res);
        })
        .catch(err => {
          iziToast.error({
            title: 'Error',
            message: 'Unable to fetch courses from database'
          });
        });
    });
  }

  ngOnInit() {
  }

  createOffering() {
    if (!(this.courses && this.offeringBeingCreated && this.offering_as)) {
      return;
    }
    this.http.post('/api/faculty/create-offering', {
      coursecode: this.offeringBeingCreated,
      offering_as: this.offering_as,
      remarks: this.remark
    }, {headers: {'Authorization': this.uss.idToken}})
      .toPromise()
      .then(res => {
        iziToast.success({
          title: 'Success',
          message: 'You are now offering a new course: ' + this.offeringBeingCreated,
          position: 'center',
          overlay: true
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: 'New offering not created :(',
          position: 'center',
          overlay: true
        });
      });
  }

  registerAsTutor() {
    if (!(this.coursesThisSem && this.courseToBeTutor)) {
      return;
    }
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        this.http.post('/api/faculty/register-as-tutor', {offering_id: this.courseToBeTutor}, {headers: {'Authorization': token}})
          .toPromise()
          .then(res => {
            iziToast.success({
              title: 'Success',
              message: 'You are now a tutor',
              position: 'center',
              overlay: true
            });
          })
          .catch(e => {
            console.log(e);
            iziToast.error({
              title: 'Error',
              message: 'You r not one',
              position: 'center',
              overlay: true
            });
          });
    });
  }

}

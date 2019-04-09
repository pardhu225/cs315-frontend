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
  constructor(public loadingCtrl: LoadingController, private http: HttpClient,
    private auth: AngularFireAuth, private uss: UserStatusService) {
    this.loadingCtrl.present('Loading Courses');
    this.auth.auth.currentUser.getIdToken()
      .then(token => {
        const body = this.uss.user.getValue() ? this.uss.user.getValue().department : {};
        return this.http.post('/api/all-courses', body, { headers: { 'Authorization': token } }).toPromise();
      })
      .then((res: any) => {
        this.courses = res;
        this.loadingCtrl.dismiss();
      })
      .catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'Unable to fetch courses from database'
        });
      });
  }

  ngOnInit() {
  }

}

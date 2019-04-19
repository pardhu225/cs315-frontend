import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserStatusService } from 'src/app/services/user-status.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-add-drop',
  templateUrl: './add-drop.component.html',
  styleUrls: ['./add-drop.component.css']
})
export class AddDropComponent implements OnInit {
  thisSemCourses = new BehaviorSubject<any>([]);
  course: string;
  course_nature: string;
  remarks: string;
  taken_as: string;
  constructor(private http: HttpClient, private uss: UserStatusService) { }

  ngOnInit() {
    this.http.get('/api/student/all-courses-this-sem', {headers: {'Authorization': this.uss.idToken}}).toPromise()
      .then(r => this.thisSemCourses.next(r));
  }

  doRequest() {
    this.http.post('/api/student/request-course', {
      offering_id: this.course,
      course_nature: this.course_nature,
      taken_as: this.taken_as,
      remark: this.remarks
    }, {headers: {'Authorization': this.uss.idToken}}).toPromise()
      .then(r => {
        iziToast.success({
          title: 'Success',
          message: 'Course has been requested successfully'
        });
      }).catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Failed!',
          message: 'Unable to request course'
        });
      });
  }
}

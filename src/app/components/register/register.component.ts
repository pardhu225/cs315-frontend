import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import iziToast from 'izitoast';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  step = 0;
  usertype: string;
  username;
  password;
  passwordAgain;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  selectType(type) {
    this.step++;
    this.usertype = type;
  }

  createAccount() {
    if (this.usertype === 'student') {
      this.createStudentAccount();
    }
    if (this.usertype === 'faculty') {
      this.createFacultyAccount();
    }
  }

  createStudentAccount() {
    this.http.post('/api/user/register/student', {
      username: this.username,
      password: this.password
    }, {})
      .toPromise()
      .then(e => {
        iziToast.success({
          title: 'Success',
          message: 'Account successfully created! You may login now.'
        });
        this.router.navigate(['login'], { queryParams: { status: 'account-created' } });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: e.error.message,
          overlay: true,
          position: 'center'
        });
      });
  }

  createFacultyAccount() {
    this.http.post('/api/user/register/faculty', {
      username: this.username,
      password: this.password
    }, {})
      .toPromise()
      .then(e => {
        iziToast.success({
          title: 'Success',
          message: 'Account successfully created! You may login now.'
        });
        this.router.navigate(['login'], { queryParams: { status: 'account-created' } });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: e.error.message,
          overlay: true,
          position: 'center'
        });
      });
  }
}

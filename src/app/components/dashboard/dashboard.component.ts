import { Component, OnInit } from '@angular/core';
import { UserStatusService } from 'src/app/services/user-status.service';
import { AngularFireAuth } from '@angular/fire/auth';
import iziToast from 'izitoast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public uss: UserStatusService, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  resendEmail() {
    this.auth.auth.currentUser.sendEmailVerification().then(r => {
      iziToast.success({
        title: 'Success',
        message: 'Verification email has been sent'
      });
    }).catch(e => {
      console.log(e);
      iziToast.error({
        title: 'Error',
        message: 'Verification email has not been sent due to unknown error'
      });
    });
  }
}

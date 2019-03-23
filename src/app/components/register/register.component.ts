import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import iziToast from 'izitoast';
import { Router } from '@angular/router';

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

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  selectType(type) {
    this.step++;
    this.usertype = type;
  }

  createAccount() {
    this.auth.auth.createUserWithEmailAndPassword(this.username + '@iitk.ac.in', this.password).then(res => {
      res.user.sendEmailVerification().then(e => {
        iziToast.success({
          title: 'Success',
          message: 'Account successfully created and email sent'
        });
        this.router.navigate(['login'], { queryParams: {status: 'mail-sent'} });
      }).catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: 'Account successfully created but mail was not sent',
          overlay: true,
          position: 'center'
        });
      });
    }).catch(e => {
      console.log(e);
      iziToast.error({
        title: 'Error',
        message: e.message,
        overlay: true,
        position: 'center'
      });
    });
  }
}

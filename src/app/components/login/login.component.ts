import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserStatusService } from 'src/app/services/user-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  params: any;
  err: string;
  constructor(private route: ActivatedRoute, private auth: AngularFireAuth, private uss: UserStatusService,
              private router: Router) {
    this.route.queryParams.subscribe(params => this.params = params);
    this.uss.loggedIn.subscribe(r => {
      if (r === 'true') {
        this.router.navigate(['dashboard']);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
    this.err = null;
    this.auth.auth.signInWithEmailAndPassword(this.username + '@iitk.ac.in', this.password)
        .then(res => {
          this.router.navigate(['dashboard'], {queryParams: {welcome: true}});
        }).catch(e => {
          this.err = e.message;
        });
  }

}

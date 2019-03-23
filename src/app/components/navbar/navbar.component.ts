import { Component, OnInit } from '@angular/core';
import { UserStatusService } from 'src/app/services/user-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public uss: UserStatusService) { }

  ngOnInit() {
  }

}

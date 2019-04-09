import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.message = data.message;
  }

  ngOnInit() {
  }

}

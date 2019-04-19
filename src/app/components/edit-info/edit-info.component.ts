import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserStatusService } from 'src/app/services/user-status.service';
import { Validators } from '@angular/forms';
import iziToast from 'izitoast';
import { LoadingController } from 'src/app/services/loading.controller';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  loaded = false;
  editing = false;
  formControls = <any>{};
  studentProps = [
    {
      name: 'name',
      validators: [Validators.required]
    },
    {
      name: 'address',
      validators: [Validators.required]
    },
    {
      name: 'marital_status',
      validators: [Validators.required]
    },
    {
      name: 'date_of_birth',
      validators: [Validators.required]
    },
    {
      name: 'mobile_1',
      validators: [Validators.required, Validators.pattern(new RegExp(/^\d{10}$/))]
    },
    {
      name: 'mobile_2',
      validators: [Validators.pattern(new RegExp(/^\d{10}$/))]
    },
    {
      name: 'alternate_email',
      validators: [Validators.required, Validators.email]
    },
    {
      name: 'hostel',
      validators: [Validators.required]
    },
    {
      name: 'room',
      validators: [Validators.required]
    },
    {
      name: 'father_name',
      validators: [Validators.required]
    },
    {
      name: 'mother_name',
      validators: [Validators.required]
    },
    {
      name: 'father_mobile_1',
      validators: [Validators.required, Validators.pattern(new RegExp('[0-9\+]+'))]
    },
    {
      name: 'mother_mobile_1',
      validators: [Validators.required, Validators.pattern(new RegExp('[0-9\+]+'))]
    },
    {
      name: 'father_mobile_2',
      validators: [Validators.pattern(new RegExp(/^\d{10}$/))]
    },
    {
      name: 'mother_mobile_2',
      validators: [Validators.pattern(new RegExp(/^\d{10}$/))]
    },
    {
      name: 'father_email',
      validators: [Validators.email]
    },
    {
      name: 'mother_email',
      validators: [Validators.email]
    },
    {
      name: 'Income',
      validators: [Validators.required]
    },
  ];
  facultyProps = [
    {
      name: 'name',
      validators: [Validators.required]
    },
    {
      name: 'address',
      validators: [Validators.required]
    },
    {
      name: 'phone',
      validators: [Validators.required, Validators.pattern(new RegExp(/^\d{10}$/))]
    },
    {
      name: 'email',
      validators: [Validators.required, Validators.email]
    },
    {
      name: 'address',
      validators: [Validators.required]
    }
  ];
  userProps = [];
  formGroup: FormGroup;
  constructor(public uss: UserStatusService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.uss.user.subscribe(u => {
      if (u) {
        this.loaded = true;
        if (u.usertype === 'student') { this.userProps = this.studentProps; }
        if (u.usertype === 'faculty') { this.userProps = this.facultyProps; }
        console.log(u);
        this.userProps.forEach(prop => {
          this.formControls[prop.name] = new FormControl('', prop.validators);
          this.formControls[prop.name].setValue(u.userDetails[prop.name]);
        });
        this.formGroup = new FormGroup(this.formControls);
        this.loadingCtrl.dismiss();
      }
    });
  }

  enableFormControls() {
    if (!this.loaded) {
      this.loadingCtrl.present('Please wait till your data is loaded');
      return;
    }
    this.editing = true;
    this.userProps.forEach(e => (<FormControl>this.formControls[e.name]).enable());
  }

  disableFormControls() {
    this.editing = false;
    this.userProps.forEach(e => (<FormControl>this.formControls[e.name]).disable());
  }

  update() {
    const u = <any>{};
    console.log(this.uss.user.getValue());
    if (this.uss.user.getValue() && this.uss.user.getValue().usertype === 'student') {
      this.userProps.forEach(prop => u[prop.name] = this.formControls[prop.name].value);
      this.uss.updateUser(u)
      .then(r => {
        iziToast.success({
          title: 'Success',
          message: 'Your details have been updated'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: 'Details not updated due to some error'
        });
      });
    } else
    if (this.uss.user.getValue() && this.uss.user.getValue().usertype === 'faculty') {
      this.userProps.forEach(prop => u[prop.name] = this.formControls[prop.name].value);
      this.uss.updateUser(u)
      .then(r => {
        iziToast.success({
          title: 'Success',
          message: 'Your details have been updated'
        });
      })
      .catch(e => {
        console.log(e);
        iziToast.error({
          title: 'Error',
          message: 'Details not updated due to some error'
        });
      });
    }
  }

}

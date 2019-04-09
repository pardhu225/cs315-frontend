import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from '../components/misc/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingController {
  private dialogRef: MatDialogRef<LoadingComponent>;
  constructor(private dialog: MatDialog) { }

  present(message?: string) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(LoadingComponent, {
      data : { message },
      width: '17vw',
      height: '15vh',
      disableClose: true
    });
  }

  dismiss() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}

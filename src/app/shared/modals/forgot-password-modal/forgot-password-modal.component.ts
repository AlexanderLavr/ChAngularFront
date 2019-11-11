import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/header.models/dialog.data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPassworData } from 'src/app/models/header.models/forgot-password.data';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  private formForgotPassword: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForgotPassworData) {
      this.formForgotPassword = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required])
      })
    }
    closeModal(): void {
      (this.formForgotPassword.status === 'VALID') ? 
      this.dialogRef.close(this.formForgotPassword.value):
      '';
    }
  ngOnInit() {
  }

}

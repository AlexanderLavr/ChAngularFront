import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { AdminService } from 'src/app/services/admin.service';
import { DialogData } from 'src/app/models/header.models/dialog.data';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  public editUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public AdminService: AdminService,
    ) {
      this.editUserForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.email, Validators.required]),
      })
      this.editUserForm.patchValue({
        firstname: data.firstname,
        secondname: data.secondname,
        email: data.email 
      })
    }
    closeEditUsers(e: any): void{ 
    if(this.editUserForm.status === 'VALID'){
      let id: string = e.currentTarget.id.substring(2, );
      let updateUser:{} = this.editUserForm.value;
      this.AdminService.update(`users/${id}`, updateUser).subscribe(
        res=>{
          this.AdminService.getAllUser('users').subscribe(res =>{
            this.AdminService.updateAll(res.data)
          })
        }
      )
      setTimeout(()=>this.dialogRef.close(), 500)
    }
  }
  ngOnInit() {
  }
}

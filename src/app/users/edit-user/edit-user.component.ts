import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EditUserService } from 'src/app/services/edit.user.service';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  private userId: number;
  private editUserForm: FormGroup;
  private editPasswordForm: FormGroup;
  private panelOpenState: boolean = false;
  private matchPassword: boolean = true;
  
  constructor(private editUserService: EditUserService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.localStorageToken()

    this.editUserForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required])
    });
    this.editPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
    
  }

  async openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    })
  }



  localStorageToken(){
    let token = localStorage.getItem('token');
    const decoded: any = jwt_decode(token);
    this.userId = decoded.id;
    this.getEditUser(this.userId)
  }
  getEditUser(id: number){
    this.editUserService.getEditUser(`users/${id}`).subscribe(res=> {
      this.editUserForm.patchValue({
        firstname: res.data.firstname,
        secondname: res.data.secondname,
        email: res.data.email
      });
    })  
  }
  editProfile(){
    if(this.editUserForm.status === 'VALID'){
      let updateUser = this.editUserForm.value;
      this.editUserService.update(`users/user/${this.userId}`, updateUser).subscribe(
        res=>{
          this.openSnackBar(res.message)
        }
      )
    }
  }
  editPassword(){
    this.matchPassword = this.editPasswordForm.get('password').value === this.editPasswordForm.get('confirmPassword').value;
    if(this.editPasswordForm.status === 'VALID' && this.matchPassword){
      let newPssword = this.editPasswordForm.get('password').value;
      let updatePassword = {
        password: newPssword
      }
      this.editUserService.update(`users/user/${this.userId}`, updatePassword).subscribe(
        res=>{
          this.openSnackBar(res.message)
        }
      )
    }
  }
  dropError(){
    this.matchPassword = true;
  }
  ngOnInit() {
  }

}

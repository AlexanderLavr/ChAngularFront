import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditUserService } from 'src/app/services/edit.user.service';
import { HeaderService } from 'src/app/services/header.service';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private userId: number;
  private resetPasswordForm: FormGroup;
  private matchPassword: boolean = true;

  public resetPassword: any;
 
  constructor(public activatedRoute: ActivatedRoute,
    private router: Router,
    private editUserService: EditUserService,
    private headerService: HeaderService
    ) { 
      localStorage.removeItem('resetPassword')
      this.resetPasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
      })
      this.activatedRoute.params.subscribe((params: Params) => {
        const id = params.id;
        const decoded: any = jwt_decode(id);
        this.userId = decoded.id;
        localStorage.setItem('resetPassword', JSON.stringify(decoded.id))
      });
      this.checkIdUser()
    }

  checkIdUser(){
    this.resetPassword = localStorage.getItem('resetPassword');
    if(!this.resetPassword){
      this.router.navigateByUrl('/login')
    }
  }

  editPassword(){
    this.matchPassword = this.resetPasswordForm.get('password').value === this.resetPasswordForm.get('confirmPassword').value;
    if(this.resetPasswordForm.status === 'VALID' && this.matchPassword){
      let newPssword = this.resetPasswordForm.get('password').value;
      let updatePassword = {
        password: newPssword
      }
      this.editUserService.update(`users/user/${this.userId}`, updatePassword).subscribe(
        res=>{
          this.headerService.openSnackBar(res.message)
          localStorage.removeItem('resetPassword')
          this.checkIdUser()
        }
      )
    }
  }
  dropError(){
    this.matchPassword = true;
  }
  ngOnInit() {
    this.checkIdUser()
  }

}

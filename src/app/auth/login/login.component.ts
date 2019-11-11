import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { LoginService } from 'src/app/services/login.service';
import { HeaderService } from 'src/app/services/header.service';
import { ForgotPasswordModalComponent } from 'src/app/shared/modals/forgot-password-modal/forgot-password-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private error: string;

  constructor(
    private LoginService: LoginService,
    private HeaderService: HeaderService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ){ 
    localStorage.removeItem('resetPassword')
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
    this.LoginService.register$.subscribe((data :any)=> {
      this.loginForm.patchValue({
        email: data.email,
        password: data.password
      })
    })
  }
  authentication(){
    if(this.loginForm.status === 'VALID'){
      const userLogin = {
        username: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
      this.LoginService.post('login', userLogin).subscribe(
        (res: any)=>{
          const token = res.data;
          localStorage.setItem('token', token)
          localStorage.setItem('books', JSON.stringify([]))
          localStorage.setItem('countBooks', JSON.stringify(0))
          localStorage.setItem('selectAll', JSON.stringify(''))
          const decoded:any = jwt_decode(token);

          this.LoginService.getAvatar(`users/avatar/${decoded.id}`).subscribe(
            (req: any)=>this.HeaderService.getAvatar(req.data)
          )
          this.HeaderService.getToken(token)
        },
        (error: any)=>{
          this.error = error.error.error;
      })
    }
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  forgotPassword(): void{
    const dialogRef = this.dialog.open(ForgotPasswordModalComponent);

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        let confirmEmail: string = res;
        this.LoginService.forgotPassword('users/forgot/password', confirmEmail).subscribe(res => {
          this.openSnackBar(res.message)

          
        })
      }
    });
  }

  ngOnInit() {
    const token = this.HeaderService.getLocal('token');
    if(!token){
      this.router.navigateByUrl('/login')
    }
    if(token){
      const decoded: any = jwt_decode(token);
      if(decoded.isAdmin[0] === 'admin'){
        this.router.navigateByUrl('/admin')
      }
      if(decoded.isAdmin[0] === 'user'){
        this.router.navigateByUrl('/user')
      }
    }
  }
}

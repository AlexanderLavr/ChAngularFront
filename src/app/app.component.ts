import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

import { HeaderModalComponent } from 'src/app/shared/modals/header-modal/header-modal.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { async } from 'q';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private isAdmin: string;
  private email: string;
  private profile: string;
  private id: number;


  private arrayBooks = [];
  private countBooks: number;

  private resetPassword: boolean = false;

  constructor(
    private HeaderService: HeaderService,
    private UserService: UserService,
    private LoginService: LoginService,
    public dialog: MatDialog,
    private router: Router
    ) {
    this.HeaderService.$updateCart.subscribe(res => this.localStorageCart())
    this.UserService.$eventCart.subscribe(res => this.localStorageCart())
    this.HeaderService.chooseAvatar$.subscribe(img => this.profile = img)
    this.HeaderService.token$.subscribe(
      (token: any)=>{
        const decoded:any = jwt_decode(token);
        decoded.isAdmin.forEach((element: string) => {
          this.isAdmin = element;
        }); 
        this.id = decoded.id
        this.email = decoded.email
        if(decoded.isAdmin[0] === 'admin'){
          this.router.navigateByUrl('/admin')
        }
        if(decoded.isAdmin[0] === 'user'){
          this.router.navigateByUrl('/user')
        }
      }
    )
    this.HeaderService.avatar$.subscribe(img => this.profile = img)


  }
  
  async checkResetPassword(){
    let resetPassword = localStorage.getItem('resetPassword');
    if(resetPassword){
      this.resetPassword = true;
    }
  }

  getCountBook(){
    this.countBooks = JSON.parse(localStorage.getItem('countBooks'));
    return this.countBooks
  }

  openProfileModal(): void {
    this.dialog.open(HeaderModalComponent, {
      width: 'auto',
      data: {profile: this.profile, id: this.id, cartModal: false}
    });
  }
  openCartModal(): void {
    this.dialog.open(HeaderModalComponent, {
      width: 'auto',
      data: {cartModal: true, arrayBooks: this.arrayBooks}
    });
  }
  
  logOut() {
    localStorage.clear()
    this.isAdmin = undefined;
    this.router.navigate(['login'])
  }

  localStorageCart(){
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    this.arrayBooks = selectBooksArr;;
  }


  ngOnInit() {
    setTimeout(()=>{this.checkResetPassword()}, 0) 
    const token = this.HeaderService.getLocal('token');
    // if(!token){
    //   this.router.navigateByUrl('/login')
    // }
    if(token){
      const decoded: any = jwt_decode(token);
      decoded.isAdmin.forEach((element: string) => {
        this.isAdmin = element;
      });
      this.email = decoded.email;
      this.id = decoded.id
      this.LoginService.getAvatar(`users/avatar/${decoded.id}`).subscribe(
        (req: any) => this.HeaderService.getAvatar(req.data)
      )
      if(decoded.isAdmin[0] === 'admin'){
        this.router.navigateByUrl('/admin')
      }
      if(decoded.isAdmin[0] === 'user'){
        this.router.navigateByUrl('/user')
      }
    }
    this.localStorageCart()
  }
}

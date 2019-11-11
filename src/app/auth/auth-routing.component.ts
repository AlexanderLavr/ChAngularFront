import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from 'src/app/auth/registeration/registeration.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: 'regestration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset_password/:id', component: ResetPasswordComponent }
  
  ];
  
  @NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }
  
import { NgModule } from '@angular/core';
import { RegistrationComponent } from 'src/app/auth/registeration/registeration.component';
import { LoginComponent } from 'src/app//auth/login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ForgotPasswordModalComponent } from '../shared/modals/forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [ 
      AuthComponent,
      RegistrationComponent, 
      LoginComponent,
      ForgotPasswordModalComponent,
      ResetPasswordComponent
    ], 
    entryComponents:[
      ForgotPasswordModalComponent
    ],
    imports: [ 
        AuthRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: []
  })
  
  export class AuthModule { }
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UserComponent } from './user-home/user.component';
import { ViewBookComponent } from './view-book/viewBook.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.component';
import { CartComponent, PayModule } from './cart/cart.component';
import { CartService } from '../services/cart.service';
import { Module as StripeModule } from 'stripe-angular';
import { EditUserComponent } from './edit-user/edit-user.component';
import { StripePayModalComponent } from '../shared/modals/stripe-pay-modal/stripe-pay-modal.component';

@NgModule({
    declarations: [ 
      UsersComponent,
      UserComponent,
      ViewBookComponent,
      CartComponent,
      EditUserComponent,
      StripePayModalComponent
    ], 
    entryComponents:[
      StripePayModalComponent
    ],
    imports: [ 
      UsersRoutingModule,
      ReactiveFormsModule,
      MaterialModule,
      PayModule,
      StripeModule.forRoot()
    ],
    providers: [
      CartService
    ]
  })
  
  export class UsersModule { }
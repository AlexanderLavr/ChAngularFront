import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards';
import { UserComponent } from './user-home/user.component';
import { ViewBookComponent } from './view-book/viewBook.component';
import { CartComponent } from './cart/cart.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'user/:id', component: ViewBookComponent},
    { path: 'cart', component: CartComponent},
    { path: 'editUser', component: EditUserComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }
  
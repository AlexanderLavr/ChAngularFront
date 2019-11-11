import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.component';
import { AdminComponent } from './admin-home/admin.component';
import { AdminMainComponent } from './admin.main.component';

@NgModule({
    declarations: [ 
      AdminMainComponent,
      AdminComponent
    ], 
    imports: [ 
        AdminRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: []
  })
  
  export class AdminModule { }
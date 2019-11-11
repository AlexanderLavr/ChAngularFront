import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import RegisterService from './services/register.service';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { HeaderModalComponent } from './shared/modals/header-modal/header-modal.component';
import { EditUserModalComponent } from './shared/modals/edit-user-modal/edit-user-modal.component';
import { BookModalComponent } from './shared/modals/book-modal/book-modal.component';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [ 
    AppComponent,
    MainComponent,
    HeaderModalComponent,
    EditUserModalComponent,
    BookModalComponent,
  ], 
  entryComponents:[
    HeaderModalComponent,
    EditUserModalComponent,
    BookModalComponent
  ],
  imports: [ 
    UsersModule,
    AuthModule,
    AdminModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    RegisterService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

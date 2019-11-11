import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import RegisterService from 'src/app/services/register.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegistrationComponent implements OnInit{
  public registrForm: FormGroup;
  public serverError: string;
  constructor(
    private RegisterService: RegisterService,
    private LoginService: LoginService,
    private router: Router
  ) {
    this.registrForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }
  register(): any{
    if(this.registrForm.status === 'VALID'){
      const register = {
        firstname: this.registrForm.get('firstname').value,
        secondname: this.registrForm.get('secondname').value,
        email: this.registrForm.get('email').value,
        password: this.registrForm.get('password').value
      }

      this.RegisterService.post('users/register', register).subscribe(
        (data: any)=>{
          const loginData = {
            email: register.email,
            password: register.password
          }
        
          this.router.navigateByUrl('/login').then(x => {
            this.LoginService.setloginState(loginData)
          })
        },
        (error: any)=>{
          this.serverError = error.error;  
        }
      )
    }
  }
  ngOnInit() { 
  }
}

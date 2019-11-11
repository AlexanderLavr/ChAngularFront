import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private urlApi = environment.url;
  private token = new Subject<any>();
  private authAvatar = new Subject<any>();
  private chooseAvatar = new Subject<string>();
  private updateCart = new Subject<string>();
  token$ = this.token.asObservable(); 
  avatar$ = this.authAvatar.asObservable(); 
  chooseAvatar$ = this.chooseAvatar.asObservable();
  $updateCart = this.updateCart; 
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  getToken(token: {}){
    this.token.next(token)
  }
  getAvatar(avatar: string){
    this.authAvatar.next(avatar)
  }
  getLocal(name: string){
    const datalocal = localStorage.getItem(name);
    return datalocal
  }
  chooseImg(img: string){
    this.chooseAvatar.next(img)
  }
  updateCartModal(){
    this.updateCart.next()
  }
  saveChooseImg(url, profile): Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, profile)
  }


  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

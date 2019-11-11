import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private urlApi = environment.url;
constructor(private http: HttpClient) { }

  
  getEditUser(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  update(url: string, updateUser: {}): Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, updateUser)
  }

}

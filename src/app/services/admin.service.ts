import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlApi = environment.url;
  private updateAllTables = new Subject<any>();
  $updateAllTables = this.updateAllTables;
constructor(private http: HttpClient) { }

  getAllUser(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  deletUser(url: string): Observable<any>{  
    return this.http.delete(`${this.urlApi}${url}`)
  }
  findOne(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  update(url: string, updateUser: {}): Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, updateUser)
  }

  updateAll(array:[]){
    this.updateAllTables.next(array)
  }

  getAllBooks(url: string):Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  addBook(url: string, book: {}):Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, book)
  }
  deleteBook(url: string): Observable<any>{
    return this.http.delete(`${this.urlApi}${url}`)
  }
  selectBook(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  updatBook(url: string, bookObject:{}): Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, bookObject)
  }
  sortBooks(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
}

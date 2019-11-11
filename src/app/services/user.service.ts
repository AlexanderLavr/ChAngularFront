import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi = environment.url;
  private book = new Subject<any>();
  private eventCart = new Subject<any>();
  $book = this.book;
  $eventCart = this.eventCart;
constructor(private http: HttpClient) { }

  getAllBooks(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }
  selectBook(url: string): Observable<any>{
    return this.http.get(`${this.urlApi}${url}`)
  }

  chooseBook(book: {}){
    this.book.next(book)
  }
  toCart(){
    this.eventCart.next()
  }

  searchBook(url: string): Observable<any> {
    return this.http.get(`${this.urlApi}${url}`).pipe(
        catchError(err => of(null))
    );
  }
  getMatch(selectBooksArr:any, id:string){
    let match: boolean = false;
    for(let element of selectBooksArr){
        if(id === String(element._id)){
          if(element.totalCount == element.amount){
            match = true;
            return {match: match, fullCount: true}
          }
          element.totalCount++
          localStorage.setItem('books', JSON.stringify(selectBooksArr))
          match = true;
          return {match: match, fullCount: false}
        }
    }
    return {match: match, fullCount: false}
  }
}

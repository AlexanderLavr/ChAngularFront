import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { debounceTime } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserBooks } from 'src/app/models/users.models/user.books';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private arrayBooks: UserBooks[] = [];
  private downloadArrayBook: boolean = false;
  private searchForm: FormGroup;
  private booksNotFound: boolean = false;

  constructor(
    public userService: UserService,
  ) { 
    this.searchForm = new FormGroup({
      serchBook: new FormControl('')
    });

    this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    switchMap((title) => { 
      if(title.serchBook === ''){
        return this.userService.getAllBooks('books')
      }
      return this.userService.searchBook(`books/search/${title.serchBook}`)
    })
    ).subscribe(res =>{ 
      this.arrayBooks = res.data;
    });
  }
  viewBook(e: any){
    let id: string = e.currentTarget.id.substring(2, );
    this.userService.selectBook(`books/takeEditBook/${id}`).subscribe(
      res => this.userService.chooseBook(res.data)
    )
  }
  inCart(e: any){
    let id: string = e.currentTarget.id.substring(2, );
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    let countBooks = JSON.parse(localStorage.getItem('countBooks'));

    let ismatch: any = this.userService.getMatch(selectBooksArr, id)
    if(!ismatch.match){
      this.userService.selectBook(`books/takeEditBook/${id}`).subscribe(
        res => {
          let data = res.data;
          data.totalCount = 1;
          data.checked = '';
          selectBooksArr.push(data)
          localStorage.setItem('books', JSON.stringify(selectBooksArr))
          countBooks++
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          this.userService.toCart()
        }
      )
    }else{
      if(ismatch.fullCount){
        return
      }
      countBooks++
      localStorage.setItem('countBooks', JSON.stringify(countBooks))
      this.userService.toCart()
    }
  }
  
  ngOnInit() {
    this.userService.getAllBooks('books').subscribe(res => {
      let notNullBook = [];
      res.data.forEach(el => {
        if(el.amount !== 0){
          notNullBook.push(el)
        }
      });
      this.arrayBooks = notNullBook;
      this.downloadArrayBook = res.success;
    })
  }
  
}

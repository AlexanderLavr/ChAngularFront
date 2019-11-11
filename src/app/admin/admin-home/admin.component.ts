import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import  { AdminService } from 'src/app/services/admin.service';
import { EditUserModalComponent } from 'src/app/shared/modals/edit-user-modal/edit-user-modal.component';
import { BookModalComponent } from 'src/app/shared/modals/book-modal/book-modal.component';

import { UsersArray } from 'src/app/models/admin.models/users.array';
import { BooksArray } from 'src/app/models/admin.models/books.array';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private arrayUser: UsersArray[] = [];
  private displayedColumns: string[] = ['id', 'firstname', 'secondname', 'email', 'edit', 'delete'];
​  private dataSource: any;

  private arrayBooks: BooksArray[] = [];
  private displayedColumnsBooks: string[] = ['id', 'title', 'price', 'amount', 'edit', 'delete'];
​  private dataSourceBook: any;
  public allPages: number;
  public currentPage: number = 0;

  constructor(private AdminService: AdminService,
    public dialog: MatDialog,
    public dialog2: MatDialog
    ) {
    this.getAllUsers()
    this.getAllBooks()
    this.AdminService.$updateAllTables.subscribe(res=>this.dataSource = res)
    this.AdminService.$updateAllTables.subscribe(res=>{
      this.getAllBooks()
      this.getAllUsers()
    })
   }

  editUser(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.findOne(`users/${id}`).subscribe(
      (res: any)=>{
        this.openModalEditUser(res.data)
      }
    )
  }
  deleteUser(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.deletUser(`users/${id}`).subscribe(
      res => this.getAllUsers()
    )
  }
  getAllUsers(){
    this.AdminService.getAllUser('users').subscribe(res => {
      this.arrayUser = res.data;
      this.dataSource = this.arrayUser;
    })
  }
  openModalEditUser(editUser: {}): void{
    this.dialog.open(EditUserModalComponent, {
      width: 'auto',
      data: editUser
    });
  }
  openModalBook(): void{
    this.dialog2.open(BookModalComponent, {
      width: 'auto',
      data: {title: 'Add Book'}
    });
  }
  openModalEditBook(e: any): void{
    let id: string = e.currentTarget.id.substring(2, );
    this.AdminService.selectBook(`books/takeEditBook/${id}`).subscribe(res => {
      this.dialog2.open(BookModalComponent, {
        width: 'auto',
        data: {
          title: 'Edit Book', 
          editBook: true,
          data: res
        }
      });
    })
  }

  getAllBooks(){
    this.currentPage = 0;
    this.AdminService.getAllBooks(`books/${0}`).subscribe(res =>{
      this.updateBooksTable(res)})
  }
  updateBooksTable(res){
    this.allPages = res.allPages;
    this.arrayBooks = res.data;
    this.dataSourceBook = this.arrayBooks;
    this.dataSourceBook = new MatTableDataSource(this.arrayBooks);
  }
  nextPage(){
    if(this.currentPage === this.allPages - 1){
      return
    }
    this.currentPage++
    this.AdminService.getAllBooks(`books/${this.currentPage}`).subscribe(res=>this.updateBooksTable(res))
  }
  previousPage(){
    if(this.currentPage === 0){
      return
    }
    this.currentPage--
    this.AdminService.getAllBooks(`books/${this.currentPage}`).subscribe(res=>{this.updateBooksTable(res)})
  }
  sort(e: any){
    let nameOfColumn: string = e.currentTarget.id;
    let currentPage = this.currentPage;
    this.AdminService.sortBooks(`books/sort/${nameOfColumn}/${currentPage}`).subscribe(
      res => this.updateBooksTable(res)  
    )
  }
  deleteBook(e: any){
    let id: string = e.currentTarget.id.substring(2, )
    this.AdminService.deleteBook(`books/${id}`).subscribe(res=>this.getAllBooks())
  }
  ngOnInit() {
  }
}

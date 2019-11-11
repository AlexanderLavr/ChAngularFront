import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { AdminService } from 'src/app/services/admin.service';
import { EditBook } from 'src/app/models/admin.models/edit.books';
import { DataModalBooks } from 'src/app/models/admin.models/data.modal.books';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {
  public bookForm: FormGroup;
  public imgBook: string;
  private editBook: EditBook;
  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModalBooks,
    public AdminService: AdminService,
    ) {
      this.bookForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        choosePhoto: new FormControl('', [Validators.required]),
      })  
      if(this.data.editBook){ 
        this.editBook = this.data.data.data;
        this.imgBook = this.editBook.choosePhoto;
        this.bookForm.patchValue({
          title: this.editBook.title,
          price: this.editBook.price,
          amount: this.editBook.amount,
          description: this.editBook.description,
          choosePhoto: this.editBook.choosePhoto
        })
      }
    }
    selectPhoto(event: any){
      const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function Main(){
        const file: any = event.target.files[0];
        if(!file){
            alert('Файл не выбран!')
        }
        return await toBase64(file)
    }
    Main().then((res: string) =>{
      this.imgBook = res;
      this.bookForm.patchValue({
        choosePhoto: res
      })
    })
    }
    closeAddBooks(): void{ 
      if(this.bookForm.status === 'VALID'){
        let bookObject:{} = this.bookForm.value;
        this.AdminService.addBook('books', bookObject).subscribe(
          res=>{
            this.AdminService.updateAll([])
          }
        )
        setTimeout(()=>this.dialogRef.close(), 500)
      }
    }
    closeEditBook(): void{ 
      if(this.bookForm.status === 'VALID'){
        let bookObject: {} = this.bookForm.value;
        let id: number = this.editBook._id;
        this.AdminService.updatBook(`books/${id}`, bookObject).subscribe(
          res => this.AdminService.updateAll([])
        )
        setTimeout(()=>this.dialogRef.close(), 500)
      }
    }

  ngOnInit() {
  }
}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { StripeScriptTag, StripeToken, StripeSource } from 'stripe-angular';

import { NgModule } from '@angular/core';
import { Module as StripeModule } from 'stripe-angular';
import { StripePayModalComponent } from 'src/app/shared/modals/stripe-pay-modal/stripe-pay-modal.component';
import * as jwt_decode from 'jwt-decode';
 
@NgModule({
  imports: [ StripeModule.forRoot() ]
}) export class PayModule {}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private arrayBooks = [];
  private countBooks: number = 0;
  private selectAll: string;
  private selectBook: boolean;
  private userEmail: string;

  private usdCourse: string | number;
  private publishableKey: string = 'pk_test_MPpUOinkG8qy97Xj0T0IdjGR00JAyqSYzN';
 
  constructor(public HeaderService: HeaderService,
    public cartService: CartService,
    public StripeScriptTag: StripeScriptTag,
    public dialog: MatDialog) { 
      this.StripeScriptTag.setPublishableKey( this.publishableKey )
      this.localStorageCart()
      this.checkSeleck()
      this.getLocalStorageCheckAll()  
  }
  localStorageCart(): void{
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    let countBooks = JSON.parse(localStorage.getItem('countBooks'));
    this.arrayBooks = selectBooksArr;
    this.countBooks = countBooks;
  }
  getLocalStorageCheckAll(): void{
    this.selectAll = JSON.parse(localStorage.getItem('selectAll'));
  }

 
  getLocalStorageUserEmail(): void{
    let token = localStorage.getItem('token');
    const decoded: any = jwt_decode(token);
    this.userEmail = decoded.email;
  }

  checkSeleck(){
    let select: boolean = false;
    let selectBooksArr = JSON.parse(localStorage.getItem('books') || '[]');
    for(let i of selectBooksArr){
      if(i.checked === 'checked'){
        select = true;
      }
    }
    this.selectBook = select;
  }

  buttonDelete(e: any, arr: any){
    let id:string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id ===  String(element._id)){
          let countBooks = JSON.parse(localStorage.getItem('countBooks'));
          countBooks -= element.totalCount;
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          let index = arr.indexOf(element);
          arr.splice(index, 1);
      }
    }
    localStorage.setItem('books', JSON.stringify(arr))
    this.HeaderService.updateCartModal()
  }
  buttonAdd(e: any){
    let arr = this.arrayBooks;
    let id: string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id === String(element._id)){
        if(element.totalCount === Number(element.amount)){
            return
        }else{
            element.totalCount++
            let countBooks = JSON.parse(localStorage.getItem('countBooks'));
            countBooks++
            localStorage.setItem('countBooks', JSON.stringify(countBooks))
            localStorage.setItem('books', JSON.stringify(arr))
            this.HeaderService.updateCartModal()
        }
      }
    }
  }
  buttonMult(e: any){
    let arr = this.arrayBooks;
    let id:string = e.currentTarget.id.substring(2, )
    for(let element of arr){
      if(id === String(element._id)){
        if(element.totalCount === 1){
            return
        }else{
          element.totalCount--
          let countBooks = JSON.parse(localStorage.getItem('countBooks'));
          countBooks--
          localStorage.setItem('countBooks', JSON.stringify(countBooks))
          localStorage.setItem('books', JSON.stringify(arr))
          this.HeaderService.updateCartModal()
        }
      }
    }
  }
  countTotalPrice(arr: any): number{
    let totalPrace:number = 0;
    for(let element of arr){
      if(element.checked){
        totalPrace += (element.totalCount * parseInt(element.price))
      }
    }
    return totalPrace
  }

  
  checkAll(e: any): void {
    if(this.selectAll){
      this.selectAll = '';
      localStorage.setItem('selectAll', JSON.stringify(this.selectAll))
      this.arrayBooks.forEach(el => {
        el.checked = '';
      }); 
    }else{
      this.selectAll = 'checked';
      localStorage.setItem('selectAll', JSON.stringify(this.selectAll))
        this.arrayBooks.forEach(el => {
          el.checked = 'checked';
      });
    }
    localStorage.setItem('books', JSON.stringify(this.arrayBooks))
    this.checkSeleck()
  }
  check(e: any){
    e.preventDefault();
    const mainCustom: any = document.getElementById('main-custom');
    const secondaryCheckbox: any = document.querySelectorAll('.secondary-checkbox');

    if(mainCustom.checked){
      mainCustom.checked = false;
      this.selectAll = '';
      localStorage.setItem('selectAll', JSON.stringify(this.selectAll))
    }

    let component = e.currentTarget;
    let id: string = component.id.substring(2, );
    for(let element of this.arrayBooks){
      if(id === String(element._id)){
        if(element.checked){
          element.checked = '';
        }else{
          element.checked = 'checked';
        }
        localStorage.setItem('books', JSON.stringify(this.arrayBooks))
        this.localStorageCart()
      } 
    }
    const ckeckAllArr: string[] = [];
    this.arrayBooks.forEach(el => {
      if(el.checked === 'checked'){
        ckeckAllArr.push(el.checked)
      }
    });
    if(ckeckAllArr.length === secondaryCheckbox.length){
      mainCustom.checked = true;
      this.selectAll = 'checked';
      localStorage.setItem('selectAll', JSON.stringify(this.selectAll))
    }
    this.checkSeleck()
  }

  getBooksBuyArray(){
    let booksBuyArray = [];
    this.arrayBooks.forEach(el=>{
      if(el.checked === 'checked'){
        booksBuyArray.push(el)
      }
    })
    return booksBuyArray;
  }

  buy(){
    let priceUAN = this.countTotalPrice(this.arrayBooks);
    let totalPrice: any = priceUAN / Number(this.usdCourse);
    totalPrice = parseInt(totalPrice.toFixed(2)) * 100; // price in USD to stripe
  
    const buyBooks = this.getBooksBuyArray();
    const dialogRef = this.dialog.open(StripePayModalComponent, {
      width: '400px',
      data: { price: totalPrice, buyBooks: buyBooks, userEmail: this.userEmail }
    });

    dialogRef.afterClosed().subscribe(res => {
      let checkBook = this.getBooksBuyArray()
      localStorage.setItem('books', JSON.stringify(checkBook));
      let countBooks: number = 0;
      checkBook.forEach(el =>{
        if(el.checked === 'checked'){
          countBooks =+ el.totalCount
        }
      })
      localStorage.setItem('countBooks', JSON.stringify(countBooks))
      setTimeout(()=>{this.arrayBooks = JSON.parse(localStorage.getItem('books'))}, 3000)
    });
  }

  getСourseUSD(url: string, method: string){
    let req = new XMLHttpRequest();
    req.open(method, url, false);
    req.overrideMimeType('text/json');
    req.send();
    if (req.status != 200) {
      return 25;
    } else {
      this.usdCourse = JSON.parse(req.response)[0].sale  
    }  
  }
  ngOnInit() {
    this.getСourseUSD('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', 'GET')
    this.getLocalStorageUserEmail()
  }

}

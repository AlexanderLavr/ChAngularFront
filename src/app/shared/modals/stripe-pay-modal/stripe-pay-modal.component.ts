import { Component, OnInit, Inject } from '@angular/core';
import { StripeToken, StripeSource } from 'stripe-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stripe-pay-modal',
  templateUrl: './stripe-pay-modal.component.html',
  styleUrls: ['./stripe-pay-modal.component.scss']
})
export class StripePayModalComponent implements OnInit {
  private totalPrice: number;
  private buyBooks: [];
  private userEmail: string;
  constructor(
    public dialogRef: MatDialogRef<StripePayModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private headerService: HeaderService,
    private userService: UserService) {
      this.totalPrice = data.price;
      this.buyBooks = data.buyBooks;
      this.userEmail = data.userEmail;
    }


  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token: StripeToken ){
    console.log('Stripe token', token)
   
    this.cartService.buyProducts('users/stripe/payment/product', { 
      stripeToken: token,
      price: this.totalPrice,
      buyBooks: this.buyBooks,
      userEmail: this.userEmail
    }).subscribe(res=>{
      this.userService.getAllBooks('books').subscribe(allBooks=>{
        allBooks.data.forEach((allBooks: any) => {
          this.buyBooks.forEach((buyBooks: any)=> {
            if(allBooks._id === buyBooks._id){
              buyBooks.amount = allBooks.amount
              localStorage.setItem('books', JSON.stringify(this.buyBooks))
            }
          })
        });
      })
      this.headerService.openSnackBar(res.status)
    })
    this.dialogRef.close();
  }
 
  setStripeSource( source: StripeSource ){
    console.log(123, 'Stripe source', source)
  }
 
  onStripeError( error:Error ){
    this.dialogRef.close();
    this.headerService.openSnackBar(error.message)
  }
  ngOnInit() {
  }

}

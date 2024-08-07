
import { Component, OnInit } from '@angular/core';
//import { BookService } from '../../services/book.service';
//import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone : true ,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent  {
  books: any;
  //cart: any[] = [];

  constructor(private http:HttpClient) {
    this.fetchData();
  }
  fetchData(){
    this.http.get('http://localhost:3306/').subscribe((data:any)=>{
      this.books=data;
    });
  }
 
  // ngOnInit(): void {
  //  this.bookService.getBooks().subscribe(data => {
  //    this.books = data;
  //  });
  // }

  // addToCart(bookId:number): void {
  //   this.cart.push(bookId);
  // }

//   buyNow(): void {
//     const order = {
//       books: this.cart,
//       userEmail: 'user-email@example.com'
//     };

//     this.bookService.buyBooks(order).subscribe(response => {
//       alert('Order placed successfully!');
//     });
// }


 
 
  
 }

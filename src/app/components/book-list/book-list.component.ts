
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BookService } from '../../services/book.service';
import { Book } from '../../book';
import { EditComponent } from '../../edit/edit.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators }from'@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone : true ,
  imports: [ButtonModule,FormsModule, EditComponent,DialogModule,CommonModule,ReactiveFormsModule,InputTextModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService)
  displayDialog: boolean = false;
  selectedBook!:Book;
  employeeForm:FormGroup;
  dialogDisplay: boolean = false;

// newEmployee: Employee = {
//   EmployeeID: 0,
//   FirstName: '',
//   LastName: '',
//   City: '',
// };
  data: any[]=[];
  books: Book[] = []; //your list of books
  constructor(private fb: FormBuilder){
    this.employeeForm = this.fb.group({
      BookID: ['', Validators.required],
      BookName: ['', Validators.required],
      AuthorName: ['', Validators.required],
      BookType: ['', Validators.required]
    });
  }
  showDialog(): void {
    this.dialogDisplay = true;
  }
 
  onDialogHide(): void {
    this.dialogDisplay = false;
  }
 
  
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.bookService.getBooks().subscribe({
      next: (displays:any)=>{
        this.data = displays;
        console.log('Data Fetched successfully');
      },
      error: (error) => console.log('error fetching display:', error),
    });
  }

  deleteDisplay(BookID: number) {
    this.bookService.deleteBook(BookID).subscribe(() => {
      this.fetchData(); // Refresh the book list after deleting
      console.log('Data deleted successfully');
    });
  }
 
  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.bookService.addBook(this.employeeForm.value).subscribe({
        next: (response) => {
          console.log('Book added successfully', response);
          this.onDialogHide(); // Close dialog on success
          this.fetchData();
        },
        error: (error) => {
          console.error('Error adding book', error);
        }
      });
    }
  }
  editBook(book: Book): void {
    this.selectedBook = { ...book }; // Pass a copy of the selected book
    this.displayDialog = true;
  }
  handleDialogClose(success: boolean): void {
    this.displayDialog = false;
    if (success) {
      // Refresh the book list or show a success message
      this.fetchData();
      console.log('Data Updated Successfully', success);
    }else{
      console.log('Error Occured')
 
    }
  }


 
 
  
 }

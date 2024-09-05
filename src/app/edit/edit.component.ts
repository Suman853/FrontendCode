import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { Book } from '../book';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DialogModule,CommonModule ,ReactiveFormsModule,ButtonModule, InputTextModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() display: boolean = false;
  @Input() book!: Book; // The book to be edited
  @Output() onClose = new EventEmitter<boolean>();
  @Output() displayChange = new EventEmitter<boolean>();
  editEmployeeForm: FormGroup;
 
  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.editEmployeeForm = this.fb.group({
      BookName: ['', Validators.required],
      AuthorName: ['', Validators.required],
      BookType: ['', Validators.required]
    });
  }
  ngOnChanges(): void {
    if (this.book) {
      this.editEmployeeForm.patchValue(this.book);
    }
  }
  onEdit(): void {
    if (this.editEmployeeForm.valid) {
      this.bookService.editBook(this.book.BookID, this.editEmployeeForm.value).subscribe({
        next: () => {
          // Handle successful update
          this.onClose.emit(true);
          this.closeDialog();
        },
        error: (error) => {
          // Handle error
          console.error(error);
          this.onClose.emit(false);
          this.closeDialog();
        }
      });
    }
  }
  onCancel(): void {
    this.onClose.emit(false);
  }
  closeDialog(): void {
    this.displayChange.emit(false);
  }
 
}




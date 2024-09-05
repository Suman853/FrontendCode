
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3306';

  constructor(private http: HttpClient) {}

  // 
  // Fetch all employees
  getBooks(){
    return this.http.get(`${this.apiUrl}`);
  }

  // Add a new employee
  addBook(book: Book): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-Book`, book);
  }

  // Edit an existing employee
  editBook(BookID: number, book: Book): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit-Book/${BookID}`, book);
  }

  // Delete an employee
  deleteBook(BookID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-Book/${BookID}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3306';

  constructor(private http: HttpClient) {}

  // 
  // Fetch all employees
  getEmployees(){
    return this.http.get(`${this.apiUrl}`);
  }

  // Add a new employee
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-Employee`, employee);
  }

  // Edit an existing employee
  editEmployee(EmployeeID: number, employee: Employee): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit-Employee/${EmployeeID}`, employee);
  }

  // Delete an employee
  deleteEmployee(EmployeeID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-Employee/${EmployeeID}`);
  }
}

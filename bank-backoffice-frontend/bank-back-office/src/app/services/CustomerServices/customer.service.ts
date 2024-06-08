import { response } from 'express';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { Customer, Manager } from '../../interfaces/users';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000/customers'; 
  private token = localStorage.getItem('token');

  httpoptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    }),  };

  constructor(private http:HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router:Router
  ) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.apiUrl,this.httpoptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Customer[]>('getCustomers',[]))
      );
  }
  AddCustomer(Customer: Omit<Customer, 'CustomerNumber'>): Observable<Customer> {
    return this.http
      .post<Customer>(`${this.apiUrl}/add`, Customer, this.httpoptions)
      .pipe(
        tap(() => {
          this.router.navigate(['customers']);
        }),
        catchError(this.errorHandlerService.handleError<Customer>('AddCustomer'))
      );
  }
  DeleteCustomer(CustomerNumber: Pick<Customer, 'CustomerNumber'>): Observable<{}> {
    return this.http
      .delete<Customer>(`${this.apiUrl}/${CustomerNumber.CustomerNumber}`, this.httpoptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Customer>('DeleteCustomer'))
      );
  }
  
  updateCustomer(id: string, customer: Omit<Customer, 'CustomerNumber'>): Observable<{}> {
    return this.http
      .put<Customer>(`${this.apiUrl}/${id}`, customer, this.httpoptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Customer>('updateCustomer'))
      );
  }
  
  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>('http://localhost:5000/managers')
  }
  
}

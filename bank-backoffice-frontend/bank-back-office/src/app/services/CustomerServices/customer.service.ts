import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Manager } from '../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) {}


  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:5000/customers')
  }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>('http://localhost:5000/managers')
  }
}

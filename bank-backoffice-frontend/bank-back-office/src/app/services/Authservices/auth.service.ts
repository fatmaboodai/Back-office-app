import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<Manager> {
    return this.http.post<any>(`${this.apiUrl}/managers/login`, credentials);
  }

  register(manager: any): Observable<Manager> {
    return this.http.post<any>(`${this.apiUrl}/managers/register`, manager);
  }
}

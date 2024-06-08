// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { Manager } from '../../interfaces/users';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/managers';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  private token = localStorage.getItem('token');

  ManagerId!: Pick<Manager, 'ManagerID'>;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    // Check if the token is still valid on initialization
    
    const token = localStorage.getItem('token');
    if (token) {
      this.isUserLoggedIn$.next(true);
    }
  }

  register(manager: Omit<Manager, 'ManagerID'>): Observable<Manager> {
    return this.http
      .post<Manager>(`${this.apiUrl}/register`, manager, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Manager>('register'))
      );
  }

  login(
    Email: Pick<Manager, 'Email'>,
    Password: Pick<Manager, 'Password'>
  ): Observable<{
    token: string;
    ManagerId: Pick<Manager, 'ManagerID'>;
  }> {
    return this.http
      .post(`${this.apiUrl}/login`, { Email, Password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.isUserLoggedIn$.next(true);
          this.ManagerId = tokenObject.ManagerId;
          localStorage.setItem('token', tokenObject.token);
          localStorage.setItem('ManagerID', tokenObject.ManagerId);
          this.router.navigate(['customers']);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            ManagerId: Pick<Manager, 'ManagerID'>;
          }>('login')
        )
      );
  }
}

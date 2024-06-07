import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

// my user model
import { Manager } from '../../interfaces/users';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/managers'; // Replace with your backend API URL

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  ManagerId:Pick<Manager, "ManagerID"> | undefined
  
  httpoptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router:Router
  ) {}
  register(manager: Omit<Manager, 'ManagerID'>): Observable<Manager> {
    return this.http
      .post<Manager>(`${this.apiUrl}/register`, manager, this.httpoptions)
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
      .post(`${this.apiUrl}/login`, { Email, Password }, this.httpoptions)
      .pipe(
        first(),
        tap((tokenObject: any) => { // Change any to the expected type
          this.isUserLoggedIn$.next(true);
          this.ManagerId = tokenObject.ManagerId;
          localStorage.setItem('token', tokenObject.token);
          localStorage.setItem('ManagerId', JSON.stringify(tokenObject.ManagerId));
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

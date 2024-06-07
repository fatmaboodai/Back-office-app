import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { first,catchError } from 'rxjs/operators';

// my user model
import { Manager } from '../../interfaces/users';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/managers/register'; // Replace with your backend API URL
  httpoptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient , private errorHandlerService:ErrorHandlerService) {}
  // login(credentials: object): Observable<Manager> {
  //   return this.http.post<Manager>(
  //     `${this.apiUrl}/managers/login`,
  //     credentials
  //   );
  // }
  register(manager: Omit<Manager, 'ManagerID'>): Observable<Manager> {
    return this.http
      .post<Manager>(this.apiUrl, manager, this.httpoptions)
      .pipe(first(),
      catchError(this.errorHandlerService.handleError<Manager>("register")))
  }
}

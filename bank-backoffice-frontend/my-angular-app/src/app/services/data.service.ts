import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Data} from '../interfaces/data';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  getData() {
    return ['data1', 'data2', 'data3']
  }
  getPosts(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiURL);
  };
}

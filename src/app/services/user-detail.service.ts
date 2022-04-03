import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private http: HttpClient) { }

  public fetchUserDetails(): Observable<any>{
    const url = 'assets/modal/todo-list.json';
    return this.http.get(url);
  }
}

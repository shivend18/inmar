import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public fetchLoginData(): Observable<any>{
    const url = 'assets/modal/user-responses.json';
    return this.http.get(url);
  }
}

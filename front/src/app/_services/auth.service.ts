import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API+ 'signin', {email, password},httpOptions);
  }

  signup(name: string, telNumber: string, email: string, password:string, roles:string[]): Observable<any>{
    return this.http.post(AUTH_API+'signup',
      {name,telNumber,email,password,roles},
      httpOptions
    );
  }

  logout(): Observable<any>{
    return this.http.post(AUTH_API+'signout', { }, httpOptions);
  }
}

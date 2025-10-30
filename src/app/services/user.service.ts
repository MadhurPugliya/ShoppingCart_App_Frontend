import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5027/api/Users/profile';

  constructor(private http: HttpClient) {}

  // Method to get user details
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage after login
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl, { headers });
  }
}

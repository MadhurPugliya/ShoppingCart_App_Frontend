import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_BASE_URL = 'http://localhost:5027/api/Users';
  private tokenKey = 'token'; // Key for token storage in localStorage

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    const url = `${this.API_BASE_URL}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, userData, { headers }).pipe(
      catchError((error) => {
        console.error('Registration error details:', error);
        return throwError(() =>
          new Error(
            error.error?.message ||
              `Registration failed with status ${error.status}. Please try again.`
          )
        );
      })
    );
  }

  // Login method to authenticate user
  login(credentials: { username: string; password: string }): Observable<any> {
    const url = `${this.API_BASE_URL}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Login error details:', error);
        return throwError(() =>
          new Error(
            error.error?.message ||
              `Login failed with status ${error.status}. Please try again.`
          )
        );
      })
    );
  }

   // Save the token to localStorage
   saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Remove the token from localStorage (log out)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the user is logged in by verifying the token
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && !this.isTokenExpired(token);
  }

  // Get user role from local storage
  getRole(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token to get user details
      return decodedToken?.role; // Assuming the role is in the token
    }
    return '';
  }
  
  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token without verifying the signature
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the payload part of the JWT
        // console.log('Decoded Token:', decodedToken); // Check if the token is decoded properly
        
        // Extract UserId from the decoded token
        return decodedToken?.UserId ?? null; // Return UserId if exists, otherwise null
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null; // Return null if token doesn't exist or is invalid
  }

  private decodeToken(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if the JWT token is expired
  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl = 'http://localhost:5027/api/Wallet'; // Base API URL

  constructor(private http: HttpClient) {}

  // Get wallet balance
  getWalletBalance(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/balance`, { headers });
  }

  // Top-up wallet
  topUpWallet(amount: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/top-up/${amount}`, {}, { headers });
  }

  // Get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}

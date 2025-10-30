import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentEndpoint = 'http://localhost:5027/api/Payment/make-payment';

  constructor(private http: HttpClient) {}

  // makePayment(paymentDetails: any): Observable<any> {

  //       const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
  //       const headers = new HttpHeaders({
  //         'Authorization': `Bearer ${token}`,
  //       });

  //       console.log(paymentDetails);

    
  //   return this.http.post(this.paymentEndpoint, paymentDetails, {headers});
  // }

  makePayment(paymentDetails: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    console.log(paymentDetails); // Just for debugging purposes
  
    return this.http.post(this.paymentEndpoint, paymentDetails, { headers });
  }
  
}

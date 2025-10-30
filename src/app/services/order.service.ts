import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private cartDetailsEndpoint = 'http://localhost:5027/api/Cart/details';
  private placeOrderEndpoint = 'http://localhost:5027/api/Order';
  private AllOrderUnderUser = "http://localhost:5027/api/Order/user-orders";
  private deleteOrderEndpoint = "http://localhost:5027/api/Order";
  private paymentEndpoint = 'http://localhost:5027/api/Payment/make-payment'; // Payment endpoint

  constructor(private http: HttpClient) {}

  // Fetch cart details
  getCartDetails(): Observable<any> {

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        });
    return this.http.get<any>(this.cartDetailsEndpoint, { headers });
  }

  // Place the order
  placeOrder(orderData: { userId: number; shippingAddress: string; pinCode: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    return this.http.post<any>(this.placeOrderEndpoint, orderData, {headers});
  }

  getUserOrders(): Observable<any> {

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    return this.http.get<any>(this.AllOrderUnderUser, {headers});
  }

  deleteOrder(orderId: number): Observable<any> {

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      
    return this.http.delete(`${this.deleteOrderEndpoint}/${orderId}`, {headers});
  }

  makePayment(orderId: number, amount: number, paymentMode: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Payment data to send in the request body
    const paymentData = {
      OrderId: orderId,
      Amount: amount,
      PaymentMode: paymentMode, // Wallet, CreditCard, COD
    };

    return this.http.post<any>(this.paymentEndpoint, paymentData, { headers });
  }

}

// cart.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartApiUrl = 'http://localhost:5027/api/Cart';

  constructor(private http: HttpClient) {}

  // Retrieve the cart items from the backend
  getCartItems(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.cartApiUrl}/details`, { headers });
  }

  // Add an item to the cart
  addCartItem(data: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(`${this.cartApiUrl}/add-to-cart`, data, { headers });
  }

  // Update the quantity of a cart item
  updateCartItem(productId: number, newQuantity: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(`${this.cartApiUrl}/update-quantity`, { productId: productId, quantity: newQuantity }, { headers });
  }

  // Delete a cart item
  deleteCartItem(productId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(`${this.cartApiUrl}/remove-from-cart/${productId}`, { headers });
  }

  // Fetch total cart price
  getTotalAmount(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.cartApiUrl}/total`, { headers });
  }

  // Fetch cart details specifically for the checkout page
  getCartDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.cartApiUrl}/details`, { headers });
  }
}

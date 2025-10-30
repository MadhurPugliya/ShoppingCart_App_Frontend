// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'http://localhost:5027/api/Product'; // Your API URL

//   constructor(private http: HttpClient) {}

//   // Fetch categories from the backend
//   getCategories(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/categories`);
//   }

//   // Add a new product
//   addProduct(formData: FormData): Observable<any> {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem('token'); 

//     // Ensure the token exists; handle unauthorized access
//     if (!token) {
//       throw new Error('User is not authenticated. Please log in.');
//     }

//     // Set the Authorization header with the token
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     // Send the POST request with the form data
//     return this.http.post(`${this.apiUrl}`, formData, { headers });
//   }

//   // Fetch all products from the backend
//   getAllProducts(): Observable<any[]> {
//     const token = localStorage.getItem('token'); // Retrieve the token (if using JWT for authentication)
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
//   }

//   getProductsByCategory(categoryName: string, p0: { page: number; sort: string; }): Observable<any> {
//     return this.http.get(`${this.apiUrl}/category/${categoryName}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5027/api/Product'; // Your API URL

  constructor(private http: HttpClient) {}

  // Fetch categories from the backend
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  // Add a new product
  addProduct(formData: FormData): Observable<any> {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Ensure the token exists; handle unauthorized access
    if (!token) {
      throw new Error('User is not authenticated. Please log in.');
    }

    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the POST request with the form data
    return this.http.post(`${this.apiUrl}`, formData, { headers });
  }

  // Fetch all products from the backend
  getAllProducts(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve the token (if using JWT for authentication)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  // Fetch products by category
  getProductsByCategory(categoryName: string, p0: { page: number; sort: string; }): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryName}`);
  }

  // Update an existing product
  updateProduct(id: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers });
  }
  // Fetch product details by ID
  getProductById(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token (if using JWT for authentication)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  deleteProduct(productId: number): Observable<void> {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (!token) {
      throw new Error('User is not authenticated. Please log in.');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers });
  }

  getOrderSummary(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/summary`, { headers })
  }
  
}

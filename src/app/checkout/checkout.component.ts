import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartsService } from '../services/cart.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-checkout',
  imports: [NgIf, CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  grandTotal: number = 0;
  loading: boolean = true;
  error: string | null = null;

  // Variables for shipping details
  shippingAddress: string = '';
  pinCode: string = '';

  // private cartDetailsEndpoint = 'http://localhost:5027/api/Cart/details';
  private placeOrderEndpoint = 'http://localhost:5027/api/Order'; // Backend endpoint for placing an order

  constructor(private cartService: CartsService,private authService: AuthService ,private router: Router, private http: HttpClient, private paymentService: PaymentService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchCartDetails();
  }

  // Fetch cart details using CartsService
  fetchCartDetails(): void {
    this.cartService.getCartDetails().subscribe({
      next: (data) => {
        this.cartItems = data.cartItems;
        this.grandTotal = data.totalPrice;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cart details:', err);
        this.error = err.error || 'Failed to fetch cart details.';
        this.loading = false;
      },
    });
  }

  // Place the order and call backend API
   // Place the order by calling the order service
  //  placeOrder(): void {
  //   const userId = this.authService.getUserId(); // Get UserId from AuthService

  //   // Validate inputs
  //   if (!userId || !this.shippingAddress || !this.pinCode) {
  //     console.log('User ID from AuthService:', userId);
  //     alert('Please provide all required details.');
  //     return;
  //   }

  //   const orderData = {
  //     userId: +userId, // Convert userId to number
  //     shippingAddress: this.shippingAddress,
  //     pinCode: this.pinCode,
  //   };

  //   // Call placeOrder method from OrderService
  //   this.orderService.placeOrder(orderData).subscribe({
  //     next: (response) => {
  //       // alert(response.Message); // Display success message from backend
  //       this.redirectToPaymentPage(response.order.orderId); // Redirect to payment page
  //     },
  //     error: (err) => {
  //       console.error('Error placing order:', err);
  //       this.error = err.error || 'Failed to place the order.';
  //     },
  //   });
  // }

  placeOrder(): void {
    const userId = this.authService.getUserId(); // Get UserId from AuthService

    // Validate inputs
    if (!userId || !this.shippingAddress || !this.pinCode) {
      alert('Please provide all required details.');
      return;
    }

    const orderData = {
      userId: +userId, // Convert userId to number
      shippingAddress: this.shippingAddress,
      pinCode: this.pinCode,
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response) => {
        const orderId = response.order.orderId; // Assuming response contains order ID

        // Save payment details in local storage
        const paymentDetails = {
          orderId: orderId,
          amount: this.grandTotal,
        };
        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        // Redirect to payment page
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error('Error placing order:', err);
        this.error = err.error || 'Failed to place the order.';
      },
    });
  }

  // Redirect to payment page with order ID and total amount
  redirectToPaymentPage(orderId: number): void {
    this.router.navigate(['/payment', { orderId: orderId, amount: this.grandTotal }]);
  }
}

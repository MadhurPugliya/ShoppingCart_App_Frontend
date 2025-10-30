import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports:[FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  // router: any;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserOrders();
  }

  // Fetch all orders for the logged-in user
  fetchUserOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (response) => {
        this.orders = response; // Assign the orders from the backend response
        this.loading = false;
        console.log(response)
      },
      error: (err) => {
        console.error('Error fetching user orders:', err);
        this.error = err.error || 'Failed to fetch orders.';
        this.loading = false;
      },
    });
  }

  deleteOrder(orderId: number): void {
    if (!confirm('Are you sure you want to cancel this order?')) {
      return ;
    }

    this.orderService.deleteOrder(orderId).subscribe({
      next: (response) => {
        alert(response); // Display success message from backend
        this.fetchUserOrders(); // Refresh the list of orders
      },
      error: (err) => {
        console.error('Error deleting order:', err);
        // alert(`Failed to delete the order.: ${err.error.message}`);
      },
    });
  }

  // Handle payment for pending orders
// makePayment(orderId: number, amount: number): void {
//   const paymentMode = 'Wallet'; // For example, assume Wallet payment, you can extend this logic for CreditCard and COD
//   this.orderService.makePayment(orderId, amount, paymentMode).subscribe({
//     next: () => {
//       alert('Payment successful!');
//       this.fetchUserOrders(); // Refresh the order list after payment
//     },
//     error: (err) => {
//       console.error('Error processing payment:', err);
//       alert('Payment failed. Please try again.');
//     },
//   });
// }

placeOrder(userId: number, shippingAddress: string, pinCode: string): void {
  const orderData = {
    userId: userId,
    shippingAddress: shippingAddress,
    pinCode: pinCode,
  };

  this.orderService.placeOrder(orderData).subscribe({
    next: (response) => {
      // Assume the response contains orderId and totalAmount
      const paymentDetails = {
        orderId: response.orderId,
        amount: response.totalAmount,
      };

      // Store payment details in localStorage
      localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

      // Redirect to the payment page
      this.router.navigate(['/payment']);
    },
    error: (err) => {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    },
  });
}

storePaymentDetailsAndRedirect(orderId: number, amount: number): void {
  const paymentDetails = {
    orderId,
    amount,
  };

  // Store the payment details in localStorage
  localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

  // Redirect to the payment page
  this.router.navigate(['/payment']); // Adjust this route based on your app's routing
}

  
}

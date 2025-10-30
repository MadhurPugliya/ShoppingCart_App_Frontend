import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports:[FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  orderId: number = 0;
  amount: number = 0;
  paymentMethod: string = 'Wallet'; // Default payment method

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // Retrieve the orderId and amount from the route parameters
  //   this.route.params.subscribe((params) => {
  //     this.orderId = +params['orderId'];
  //     this.amount = +params['amount'];
  //   });
  // }

  ngOnInit(): void {
    // Fetch payment details from localStorage
    const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
    if (!paymentDetails || !paymentDetails.orderId || !paymentDetails.amount) {
      alert('No payment details found. Redirecting to orders page.');
      this.router.navigate(['/order']); // Redirect if no details are found
      return;
    }
    this.orderId = paymentDetails.orderId;
    this.amount = paymentDetails.amount;
  }

  // Handle the payment
  // makePayment(): void {
  //   const paymentDetails = {
  //     orderId: this.orderId,
  //     amount: this.amount,
  //     paymentMode: this.paymentMethod,
  //   };

  //   this.paymentService.makePayment(paymentDetails).subscribe({

  //     next: (response) => {
  //       console.log('Payment Successful:', response);
  //       this.router.navigate(['/order']); // Redirect to success page or order summary
  //     },
  //     error: (error) => {
  //       // console.log(paymentDetails);
  //       alert('Payment Failed!');
  //       console.error('Payment Error:', error);
  //     },
  //   });
  // }

  proceedToPay(): void {
    const paymentDetails = {
      orderId: this.orderId,
      amount: this.amount,
      paymentMode: this.paymentMethod,
    };

    this.paymentService.makePayment(paymentDetails).subscribe({
      next: (response) => {
        console.log('Payment Successful:', response);
        localStorage.removeItem('paymentDetails');
        this.router.navigate(['/order']); // Redirect to success page or order summary
      },
      error: (error) => {
        alert('Payment Failed!');
        console.error('Payment Error:', error);
      },
    });
  }

  // makePayment(): void {
  //   // Retrieve the payment details from localStorage
  //   const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails') || '{}');
  
  //   if (!paymentDetails || !paymentDetails.orderId || !paymentDetails.amount || !paymentDetails.paymentMode) {
  //     alert('No payment details found. Please try again.');
  //     return;
  //   }
  
  //   // Now use these details to proceed with the payment
  //   this.paymentService.makePayment(paymentDetails).subscribe({
  //     next: (response) => {
  //       console.log('Payment Successful:', response);
  //       this.router.navigate(['/order']); // Redirect to success page or order summary
  //     },
  //     error: (error) => {
  //       alert('Payment Failed!');
  //       console.error('Payment Error:', error);
  //     },
  //   });
  // }
  
  ngOnDestroy(): void {
    // Remove payment details from localStorage if the user leaves the page
    localStorage.removeItem('paymentDetails');
  }
}

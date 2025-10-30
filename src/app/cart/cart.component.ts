// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any;
  totalCost: number = 0;
product: any;
item: any;

  constructor(private cartService: CartsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    this.fetchTotalCost();
    this.loadCart();
    // this.calculateTotal();
    // Fetch the total cost on page load
  }

  proceedToCheckout() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Save cart items to local storage
    this.router.navigate(['/checkout']); // Navigate to checkout
  }
  loadCart(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        console.log(this.cartItems)
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      },
    });
  }

  calculateTotal(): void {
    this.totalCost = 0;
    for (let item of this.cartItems.cartItems) {
      this.totalCost += item.price * item.quantity;
    }
  }

  // Fetch total amount from the backend
  fetchTotalCost(): void {
    this.cartService.getTotalAmount().subscribe({
      next: (response) => {
        this.totalCost = response.TotalAmount;
      },
      error: (err) => {
        console.error('Error fetching total cost:', err);
      },
    });
  }

  updateCartItem(cartItem: any): void {
    this.cartService.updateCartItem(cartItem.productId, cartItem.quantity).subscribe({
      next: (response) => {
        this.loadCart();
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
      },
    });
  }

  removeItem(cartItem: any): void {
    this.cartService.deleteCartItem(cartItem.productId).subscribe(() => {
      this.cartItems.cartItems = this.cartItems.cartItems.filter(
        (item: any) => item.cartItemId !== cartItem.cartItemId
      );
      this.calculateTotal();
      alert('Item removed from cart');
    });
  }
}

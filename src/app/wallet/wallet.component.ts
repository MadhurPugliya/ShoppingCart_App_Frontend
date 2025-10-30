import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WalletService } from '../services/wallet.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-wallet',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  walletForm!: FormGroup; // Form group for the top-up form
  balance: number = 0; // Wallet balance to display
  errorMessage: string | null = null; // Error message
  successMessage: string | null = null; // Success message

  constructor(private fb: FormBuilder, private walletService: WalletService) {}

  ngOnInit(): void {
    // Initialize the top-up form
    this.walletForm = this.fb.group({
      topUpAmount: [null, [Validators.required, Validators.min(1)]],
    });

    // Fetch wallet balance on component initialization
    this.fetchWalletBalance();
  }

  // Fetch wallet balance from the backend
  fetchWalletBalance(): void {
    this.walletService.getWalletBalance().subscribe({
      next: (response) => {
        this.balance = response.balance; // Update the wallet balance
        this.errorMessage = null; // Clear any error messages
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch wallet balance. Please try again.';
        this.successMessage = null; // Clear success message on error
      },
    });
  }

  // Handle top-up form submission
  topUp(): void {
    if (this.walletForm.invalid) {
      return;
    }

    const amount = this.walletForm.value.topUpAmount; // Get the top-up amount from the form

    this.walletService.topUpWallet(amount).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Top-up successful!'; // Display success message
        this.errorMessage = null; // Clear error messages
        this.walletForm.reset(); // Reset the form
        this.fetchWalletBalance(); // Fetch the updated balance
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error topping up wallet. Please try again.';
        this.successMessage = null; // Clear success message on error
      },
    });
  }

  // Manual check balance action
  checkBalance(): void {
    this.fetchWalletBalance();
  }
}

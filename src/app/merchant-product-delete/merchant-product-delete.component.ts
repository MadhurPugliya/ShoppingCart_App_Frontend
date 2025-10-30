import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgIf } from '@angular/common';
import { FormsModule, FormSubmittedEvent } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MerchantNavbarComponent } from "../merchant-navbar/merchant-navbar.component";

@Component({
  selector: 'app-merchant-delete',
  imports: [NgIf, FormsModule, RouterLink, MerchantNavbarComponent],
  templateUrl: './merchant-product-delete.component.html',
  styleUrls: ['./merchant-product-delete.component.css'],
})
export class MerchantDeleteComponent {
  productId!: number; // Product ID to delete
  successMessage: string | null = null; // Success message
  errorMessage: string | null = null; // Error message

  constructor(private productService: ProductService) {}

  deleteProduct() {
    if (!this.productId) {
      this.errorMessage = 'Please enter a Product ID.';
      this.successMessage = null;
      return;
    }

    this.productService.deleteProduct(this.productId).subscribe(
      () => {
        this.successMessage = 'Product deleted successfully!';
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to delete the product.';
        this.successMessage = null;
      }
    );
  }
}

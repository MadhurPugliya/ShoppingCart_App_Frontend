import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Correct import
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MerchantNavbarComponent } from "../merchant-navbar/merchant-navbar.component";

@Component({
  selector: 'app-merchant-view-products',
  imports: [NgIf, CommonModule, RouterLink, MerchantNavbarComponent],
  templateUrl: './merchant-view-products.component.html',
  styleUrls: ['./merchant-view-products.component.css']
})
export class MerchantViewProductsComponent implements OnInit {
  products: any[] = []; // To store the fetched products
  errorMessage: string | null = null;
  successMessage: string | null = null;  // Add successMessage property

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products when component initializes
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products; // Store fetched products in the array
        this.successMessage = 'Products fetched successfully!'; // Success message
      },
      error: () => {
        this.errorMessage = 'Failed to fetch products. Please try again.'; // Error handling
      }
    });
  }
}

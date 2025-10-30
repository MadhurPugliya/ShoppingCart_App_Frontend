import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'; // Correct import
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MerchantNavbarComponent } from "../merchant-navbar/merchant-navbar.component";

@Component({
  selector: 'app-merchant-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MerchantNavbarComponent],
  templateUrl: './merchant-add-products.component.html',
  styleUrls: ['./merchant-add-products.component.css']
})
export class MerchantAddProductsComponent implements OnInit {
  productForm!: FormGroup;
  categories: { categoryId: number; categoryName: string }[] = []; // Explicit typing for categories
  imageFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCategories(); // Fetch categories when component initializes
  }

  // Initialize the reactive form
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required] // Store categoryId directly
    });
  }

  // Fetch categories from the backend
  fetchCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories; // Assuming the response contains [{ categoryId, categoryName }]
      },
      error: () => {
        this.errorMessage = 'Failed to fetch categories. Please try again.';
      }
    });
  }

  // Handle image file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.imageFile = fileInput.files[0];
    }
  }

  // Submit the product form
  submitProduct(): void {
    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('stockQuantity', this.productForm.value.stockQuantity);
    formData.append('categoryId', this.productForm.value.category); // Use categoryId directly

    if (this.imageFile) {
      formData.append('imageUrl', this.imageFile);
    }

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.successMessage = 'Product added successfully!';
        this.errorMessage = null;
        this.productForm.reset();
        this.imageFile = null;
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage =
          err.error?.message || 'Failed to add product. Please try again.';
      }
    });
  }
}

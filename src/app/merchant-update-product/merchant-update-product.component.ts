import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MerchantNavbarComponent } from "../merchant-navbar/merchant-navbar.component";

@Component({
  selector: 'app-merchant-update-product',
  imports: [NgIf, CommonModule, FormsModule, RouterLink, MerchantNavbarComponent],
  templateUrl: './merchant-update-product.component.html',
  styleUrls: ['./merchant-update-product.component.css']
})
export class MerchantUpdateProductComponent {
  productId!: number;
  product: any = {
    name: '',
    price: null,
    stockQuantity: null,
    categoryId: null
  };
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProduct() {
    if (!this.productId) {
      this.errorMessage = 'Please enter a Product ID.';
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.product.name);
    formData.append('Price', this.product.price.toString());
    formData.append('StockQuantity', this.product.stockQuantity.toString());
    formData.append('CategoryId', this.product.categoryId.toString());
    if (this.selectedFile) {
      formData.append('ImageUrl', this.selectedFile, this.selectedFile.name);
    }

    this.productService.updateProduct(this.productId, formData).subscribe(
      () => {
        this.successMessage = 'Product updated successfully!';
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error.error || 'Failed to update the product.';
        this.successMessage = null;
      }
    );
  }
}

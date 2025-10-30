import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CartsService } from '../services/cart.service';
// import { AuthService } from '../services/auth/auth.service';
import { response } from 'express';
 
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  // Corrected the property name here
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredcategpries:any[]=[];
  selectedCategory: string = '';
  message!: string;
 
  sampletoken = localStorage.getItem('token');
  // {headers} =  Bearer 'sampletokwen'
 
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    // private dataService:AuthService,
    private cartservice:CartsService,
    private router:Router
  ) {}
 
  ngOnInit(): void {
 
  //   this.productService.currentMessage.subscribe({
  //     next:(msg) => {this.message = msg;
  //       this.searchCat();
  //     }
  // });
 
    this.route.paramMap.subscribe(params => {
      const categoryName = params.get('categoryName');  // Extract from route
      if (categoryName) {
        this.selectedCategory = categoryName;
        console.log('Category selected:', this.selectedCategory);
        this.fetchProducts();
      } else {
        console.error('Category name is missing from URL');
      }
    });
  }
 
  // fetchProducts(): void {
  //   if (!this.selectedCategory) {
  //     console.error('Cannot fetch products, category is not set.');
  //     return;
  //   }
 
  //   this.productService.getProductsByCategory(this.selectedCategory, { page: 1, sort: 'price' }).subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       this.filteredcategpries=data;

  //       console.log(`Products for ${this.selectedCategory}:`, this.products);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching products:', error);
  //     },
  //   });
  // }

  fetchProducts(): void {
    if (!this.selectedCategory) {
      console.error('Cannot fetch products, category is not set.');
      return;
    }
  
    this.productService.getProductsByCategory(this.selectedCategory, { page: 1, sort: 'price' }).subscribe({
      next: (data) => {
        // Filter out products where stockQuantity is 0
        this.products = data.filter((product: any) => product.stockQuantity > 0);
        this.filteredcategpries = this.products;
  
        if (this.filteredcategpries.length === 0) {
          this.cartMessage = "No products available in this category.";
        } else {
          this.cartMessage = ''; // Clear message if products are found
        }
  
        console.log(`Available Products for ${this.selectedCategory}:`, this.products);
      },
      error: (error) => {
        if (error.status === 404) {
          this.cartMessage = "No products available in this category.";
        } else {
          console.error('Error fetching products:', error);
          this.cartMessage = 'Error fetching products.';
        }
      },
    });
  }
  
  
  cartMessage:string ='';
  addToCart(product:any)
  {
    console.log('Product added:',product);
    this.cartMessage='Item Updated to cart';
    setTimeout(() => {
      this.cartMessage = '';
    }, 3000);
 
    product.quantity=1;
    console.log(product);
    this.cartservice.addCartItem(product).subscribe({
      next:(response)=>{
        console.log(response);
       
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
 
  searchCat()
  {
    this.filteredcategpries = this.products.filter((x: { name: string; })=>x.name.toLowerCase().includes(this.message.toLocaleLowerCase()))
 
  }
}
 
 


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { CommonModule, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-product',
//   imports:[NgIf, CommonModule],
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   categoryName: string = '';
//   products: any[] = [];
//   errorMessage: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';
//     this.fetchProducts();
//   }

//   fetchProducts(): void {
//     this.productService.getProductsByCategory(this.categoryName).subscribe(
//       (data) => {
//         this.products = data;
//         this.errorMessage = '';
//         console.log(this.products); 
//       },
//       (error) => {
//         this.errorMessage = error.error || 'Failed to load products.';
//       }
//     );
//   }
// }

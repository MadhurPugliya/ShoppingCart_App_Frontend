import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';  // Update with your actual path
import { RouterLink } from '@angular/router';
import { MerchantNavbarComponent } from '../merchant-navbar/merchant-navbar.component';

@Component({
  selector: 'app-mercahnt',
  imports: [RouterLink, MerchantNavbarComponent],
  templateUrl: './mercahnt.component.html',
  styleUrls: ['./mercahnt.component.css']
})
export class MercahntComponent implements OnInit {
  orderSummary: any = { TotalOrders: 0, PendingOrders: 0, SuccessfulOrders: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getOrderSummary().subscribe(
      (data) => {
        console.log(data);
        this.orderSummary = data;
      },
      (error) => {
        console.error('Error fetching order summary', error);
      }
    );
  }
}

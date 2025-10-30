import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  categories = [
    {
      name: 'Electronics',
      items: 238,
      imageUrl: 'Electronics.jpg',
    },
    {
      name: 'Fashion',
      items: 456,
      imageUrl: 'Fashion.jpg',
    },
    {
      name: 'Home Appliances',
      items: 324,
      imageUrl: 'Home-Appliances.jpg',
    },
    {
      name: 'Books',
      items: 189,
      imageUrl: 'Books.jpg',
    },
    {
      name: 'Toys',
      items: 567,
      imageUrl: 'Toys.jpg',
    },
    {
      name: 'Beauty & Personal Care',
      items: 312,
      imageUrl: 'BeautyPersonalCare.jpg',
    },
    {
      name: 'Sports',
      items: 423,
      imageUrl: 'Sports.jpg',
    },
    {
      name: 'Groceries',
      items: 98,
      imageUrl: 'Groceries.jpg',
    },
    {
      name: 'Automotive',
      items: 672,
      imageUrl: 'Automotive.jpg',
    },
    {
      name: 'Health & Wellness',
      items: 275,
      imageUrl: 'HealthWellness.jpg',
    },
  ];
}

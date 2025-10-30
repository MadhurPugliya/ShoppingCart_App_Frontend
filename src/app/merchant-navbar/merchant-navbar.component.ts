import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-merchant-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import CommonModule & RouterModule
  templateUrl: './merchant-navbar.component.html',
  styleUrls: ['./merchant-navbar.component.css']
})
export class MerchantNavbarComponent {}

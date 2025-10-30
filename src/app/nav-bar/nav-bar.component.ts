import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  userRole: string = '';
  searchQuery: string = '';

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();
  }
  // Handle the search functionality
  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Redirect to the category's product page
      this.router.navigate([`/products/${this.searchQuery.trim()}`]);
    } else {
      alert('Please enter a category name');
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}

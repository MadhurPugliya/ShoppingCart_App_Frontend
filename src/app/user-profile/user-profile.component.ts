import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Import the user service
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports:[NgIf],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true, // Mark as standalone component
})

export class UserProfileComponent implements OnInit {
  user: any = {}; // To hold the user details
  loading: boolean = true;
  error: string = '';
  // router: any;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Call the service to fetch user details when the component initializes
    this.userService.getUserDetails().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false; // Set loading to false after data is received
      },
      error: (err) => {
        this.error = 'Failed to load user details';
        this.loading = false;
      },
    });
  }

  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      // localStorage.removeItem('token');
      localStorage.clear();
      console.log('User logged out successfully');
      this.router.navigate(['/sign-up']);
    }
  }
}

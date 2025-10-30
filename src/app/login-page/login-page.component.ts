import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports:[NgIf, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginData = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        // Store the JWT token in localStorage
        localStorage.setItem('token', response.token);

    const userId = this.authService.getUserId();
    console.log("UserId: ", userId)

        // localStorage.setItem('userId', response.userId);
        // Check the role and redirect
        
        const userRole = this.authService.getRole();
        if (userRole === 'Customer') {
          this.router.navigate(['/home']);  // Redirect to home page for Customer
        } else if (userRole === 'Merchant') {
          this.router.navigate(['/merchant']);  // Redirect to merchant dashboard
        }
      },
      error: (err: any) => {
        console.error('Login failed', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}

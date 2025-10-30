import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; // Ensure ReactiveFormsModule is imported
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink], // Ensure ReactiveFormsModule is imported
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent {
  registrationForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      const formData: { [key: string]: any } = this.registrationForm.value;

      console.log(this.registrationForm.valid);
      console.log(this.registrationForm.value);

      this.authService.register(formData).subscribe({
        next: (response) => { 
          console.log('Registration successful:', response);
          this.isSubmitting = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage =
            error.message || 'Registration failed. Please try again.';
          this.isSubmitting = false;
        },
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please correct the errors in the form and try again.';
    }
  }
}

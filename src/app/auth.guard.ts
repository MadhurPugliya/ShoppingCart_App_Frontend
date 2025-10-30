import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
// import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Role required for this route
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getRole();

    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      // Redirect unauthorized users
      this.router.navigate(['/unauthorized']); 
      return false;
    }

    return true;
  }
}

// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,private storageService:StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // Simulated check - replace with your actual role validation logic
    const userRoles = this.getUserRoles(); // Replace with your actual method to get user roles

    const requiredRoles = route.data['roles'] as Array<string>; // Get roles defined in route data

    if (!requiredRoles || requiredRoles.some(role => userRoles.includes(role))) {
      return true; // Allow access if any required role matches the user's roles
    }

    // Redirect if user does not have the required role
    this.router.navigate(['/unauthorized']);
    return false;
  }

  // Simulated method to get user roles - replace with actual role retrieval logic
  private getUserRoles(): string[] {
    // Replace this with your real authentication service logic
    const token = this.storageService.isLoggedIn(); 
    if (token) {
      // Parse roles from token or fetch from your service
      // Example hardcoded roles
      return this.storageService.getUser().roles; // Replace this with your actual roles retrieval logic
    }
    return [];
  }
}

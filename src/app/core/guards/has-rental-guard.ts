import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RentalService } from '../services/rental';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class HasRentalGuard implements CanActivate {
  constructor(private rs: RentalService, private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.rs.hasActiveRentalForCurrentUser()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

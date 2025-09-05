import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { RentalService } from '../../core/services/rental';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {

  constructor(public auth: AuthService, public rental: RentalService) {}

}

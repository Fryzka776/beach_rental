import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RentalService } from '../../core/services/rental';
import { EquipmentService } from '../../core/services/equipment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-rent-confirm',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rent-confirm.html',
  styleUrl: './rent-confirm.scss'
})
export class RentConfirmComponent {
  private rs = inject(RentalService);
  cart$ = this.rs.cart$; 
  total$ = this.rs.total$;

  constructor(private es: EquipmentService, private router: Router) {}

  inc(id: string, currQty: number) {
    const eq = this.es.equipment$.value.find(e => e.id === id);
    if (!eq) return;
    if (currQty < eq.available) {
      this.rs.setQty(id, currQty + 1);
    }
  }

  dec(id: string, currQty: number) {
    if (currQty > 1) {
      this.rs.setQty(id, currQty - 1);
    } else {
      this.remove(id);
    }
  }

  remove(id: string) {
    this.rs.removeFromCart(id);
  }

  confirm() {
  this.rs.cart$.value.forEach(item => {
    this.es.updateAvailability(item.equipmentId, -item.qty);
  });
  this.rs.confirmRental();
  this.router.navigate(['/']);
}

  cancel() {
    this.rs.clearCart();
  }

  getStock(id: string): number {
    const eq = this.es.equipment$.value.find(e => e.id === id);
    return eq ? eq.stock : 0;
  }
}


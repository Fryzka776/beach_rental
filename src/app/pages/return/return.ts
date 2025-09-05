import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RentalService } from '../../core/services/rental';
import { EquipmentService } from '../../core/services/equipment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-return',
  imports: [CommonModule, FormsModule],
  templateUrl: './return.html',
  styleUrl: './return.scss'
})
export class ReturnComponent {

  private rs = inject(RentalService);
  rental$ = this.rs.activeRental$;

  constructor(private es: EquipmentService, private router: Router) {}

  returnAll(id: string) {
    const rental = this.rental$.value;
    if (!rental) {
      return;
    }
    const item = rental.items.find(i => i.equipmentId === id);
    if (!item) {
      return;
    }

    this.es.updateAvailability(id, item.qty);
    rental.items = rental.items.filter(i => i.equipmentId !== id);
    this.rental$.next({ ...rental });
  }

  confirm() {
    const rental = this.rental$.value;
    if (rental) {
      rental.items.forEach(i => this.es.updateAvailability(i.equipmentId, i.qty));
    }
    this.rental$.next(null);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}

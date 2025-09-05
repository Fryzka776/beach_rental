import { Component, inject } from '@angular/core';
import { EquipmentService } from '../../core/services/equipment';
import { RentalService } from '../../core/services/rental';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rent',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rent.html',
  styleUrl: './rent.scss'
})
export class RentComponent {

  private es = inject(EquipmentService);
  equipment$ = this.es.equipment$;
  qty: Record<string, number> = {};

  constructor(public rs: RentalService) {}

  getCartQty(id: string): number {
    const item = this.rs.cart$.value.find(i => i.equipmentId === id);
    return item ? item.qty : 0;
  }

  add(e: any) {
    const q = this.qty[e.id] ?? 1;
    if (q <= 0) {
      alert('Wybierz poprawną ilość');
      return;
    }

    const inCart = this.rs.cart$.value.find(i => i.equipmentId === e.id)?.qty ?? 0;
    if (q + inCart > e.stock) {
      alert(`Nie możesz dodać więcej niż dostępne na stanie: ${e.stock}. W koszyku masz już ${inCart}.`);
      return;
    }
    this.rs.addToCart({ equipmentId: e.id, name: e.name, pricePerDay: e.pricePerDay }, q);
    this.qty[e.id] = 1;
  }
}

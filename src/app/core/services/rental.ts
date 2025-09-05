import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem, Rental } from '../../models';
import { StorageService } from './storage';
import { AuthService } from './auth';

const CART_KEY = 'br_cart';
const RENTAL_KEY = 'br_active_rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  cart$ = new BehaviorSubject<CartItem[]>([]);
  activeRental$ = new BehaviorSubject<Rental | null>(null);
  total$ = this.cart$.pipe(map(items => items.reduce((s,i)=> s + i.pricePerDay * i.qty, 0)));

  constructor(private storage: StorageService, private auth: AuthService) {
    this.cart$.next(this.storage.get<CartItem[]>(CART_KEY, []));
    this.activeRental$.next(this.storage.get<Rental | null>(RENTAL_KEY, null));
  }

  addToCart(item: Omit<CartItem,'qty'>, qty = 1) {
    const list = [...this.cart$.value];
    const idx = list.findIndex(i => i.equipmentId === item.equipmentId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], qty: list[idx].qty + qty };
    }
    else {
      list.push({ ...item, qty });
    }
    this.cart$.next(list); 
    this.storage.set(CART_KEY, list);
  }

  setQty(equipmentId: string, qty: number) {
    const list = this.cart$.value.map(i => i.equipmentId === equipmentId ? { ...i, qty } : i).filter(i => i.qty > 0);
    this.cart$.next(list);
    this.storage.set(CART_KEY, list);
  }

  removeFromCart(equipmentId: string) {
    const list = this.cart$.value.filter(i => i.equipmentId !== equipmentId);
    this.cart$.next(list); this.storage.set(CART_KEY, list);
  }

  clearCart() { 
    this.cart$.next([]); this.storage.set(CART_KEY, []); 
  }

  confirmRental() {
    const user = this.auth.currentUser$.value;
    if (!user) {
      throw new Error('Musisz być zalogowany');
    }
    const items = this.cart$.value;
    const rental: Rental = { userId: user.id, items, startDate: new Date().toISOString() };
    this.activeRental$.next(rental);
    this.storage.set(RENTAL_KEY, rental);
    this.clearCart();
  }

  hasActiveRentalForCurrentUser(): boolean {
    const user = this.auth.currentUser$.value;
    const r = this.activeRental$.value;
    return !!(user && r && r.userId === user.id && r.items.length > 0);
  }

  returnRental() {
    this.activeRental$.next(null); 
    this.storage.set(RENTAL_KEY, null);
  }
}

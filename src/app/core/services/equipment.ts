import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipment, EquipmentType } from '../../models';
import { StorageService } from './storage';
import { v4 as uuid } from 'uuid';

const EQUIP_KEY = 'br_equipment';
const IMG_BY_TYPE: Record<EquipmentType, string> = {
  'ręcznik': 'assets/images/towel.jpg',
  'parasol': 'assets/images/umbrella.jpg',
  'leżak': 'assets/images/deckchair.jpg',
  'parawan': 'assets/images/windbreak.jpg'
};

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  equipment$ = new BehaviorSubject<Equipment[]>([]);

  constructor(private storage: StorageService) {
    const seeded = this.storage.get<Equipment[]>(EQUIP_KEY, []);
    if (seeded.length === 0) {
      const initial: Equipment[] = [
        { id: uuid(), type: 'ręcznik', name: 'Ręcznik plażowy XL', available: 12, stock: 12, pricePerDay: 10, img: IMG_BY_TYPE['ręcznik'] },
        { id: uuid(), type: 'parasol', name: 'Parasol duży', available: 6, stock: 6, pricePerDay: 25, img: IMG_BY_TYPE['parasol'] },
        { id: uuid(), type: 'leżak', name: 'Leżak premium', available: 8, stock: 8, pricePerDay: 30, img: IMG_BY_TYPE['leżak'] },
        { id: uuid(), type: 'parawan', name: 'Parawan 3m', available: 10, stock: 10, pricePerDay: 18, img: IMG_BY_TYPE['parawan'] },
      ];
      this.storage.set(EQUIP_KEY, initial);
      this.equipment$.next(initial);
    } else {
      this.equipment$.next(seeded);
    }
  }

  addEquipment(type: EquipmentType, name: string, available: number, pricePerDay: number) {
    const curr = this.equipment$.value;
    const next: Equipment = {
      id: uuid(), type, name, available, stock: available, pricePerDay, img: IMG_BY_TYPE[type]
    };
    const list = [next, ...curr];
    this.equipment$.next(list);
    this.storage.set(EQUIP_KEY, list);
  }

  updateAvailability(id: string, delta: number) {
    const list = this.equipment$.value.map(e => {
      if (e.id === id) {
        const nextAvailable = Math.max(0, Math.min(e.stock, e.available + delta));
        return { ...e, available: nextAvailable };
      }
      return e;
    });
    this.equipment$.next(list);
    this.storage.set(EQUIP_KEY, list);
  }
}
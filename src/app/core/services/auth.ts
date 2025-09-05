import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage';
import { User } from '../../models';
import { v4 as uuid } from 'uuid';

const USERS_KEY = 'br_users';
const CURRENT_KEY = 'br_current_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users$ = new BehaviorSubject<User[]>([]);
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private storage: StorageService) {
    const seeded = this.storage.get<User[]>(USERS_KEY, []);
    if (seeded.length === 0) {
      const initial: User[] = [
        { 
          id: uuid(), username: 'admin', password: 'admin123', role:'admin'
        },
        { 
          id: uuid(), username: 'jan', password: 'jan123', role: 'user'
        },
        ];
      this.storage.set(USERS_KEY, initial);
      this.users$.next(initial);
    } else {
      this.users$.next(seeded);
    }
    const current = this.storage.get<User | null>(CURRENT_KEY, null);
    this.currentUser$.next(current);
  }

  register(username: string, password: string) {
    const users = this.users$.value;
    if (users.some(u => u.username === username)) throw new Error('Login zajęty');
    const newUser: User = { id: uuid(), username, password, role: 'user' };
    const next = [...users, newUser];
    this.users$.next(next);
    this.storage.set(USERS_KEY, next);
  }

  login(username: string, password: string): boolean {
    const users = this.users$.value;
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) {
      return false;
    }
    this.currentUser$.next(found);
    this.storage.set(CURRENT_KEY, found);
    return true;
  }

  logout() {
    this.currentUser$.next(null);
    this.storage.remove(CURRENT_KEY);
  }
}

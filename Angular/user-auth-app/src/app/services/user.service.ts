// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = false;

  register(user: User) {
    localStorage.setItem(user.email, JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const userData = localStorage.getItem(email);
    if (userData) {
      const user = JSON.parse(userData);
      if (user.password === password) {
        this.isLoggedIn = true;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('loggedInUser');
  }

  getUser(): User | null {
    const data = localStorage.getItem('loggedInUser');
    return data ? JSON.parse(data) : null;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('loggedInUser');
  }
}

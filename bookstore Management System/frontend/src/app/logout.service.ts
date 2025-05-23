import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);  // Default value is false

  constructor() {
    // Check localStorage for token on initialization to set login state
    if (localStorage.getItem('token')) {
      this.loggedInSubject.next(true);  // Set as logged in if token exists
    }
  }

  // Observable for login status
  get isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  // Set login status to true
  login(): void {
    this.loggedInSubject.next(true);
  }

  // Set login status to false (logout)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedInSubject.next(false);  // Set as logged out
  }
}

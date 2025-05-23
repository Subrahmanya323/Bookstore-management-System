import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogoutService } from './logout.service';  // Import LogoutService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  navOpen = false; // To toggle navigation visibility
  isLoggedIn = false;  // Track login status
  showLogoutMenu = false;  // Toggle logout menu visibility
  userRole: string = ''; // Store the role of the logged-in user

  constructor(private router: Router, private logoutService: LogoutService) {}

  ngOnInit(): void {
    // Subscribe to login status changes from LogoutService
    this.logoutService.isLoggedIn.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (status) {
        this.userRole = localStorage.getItem('role') || ''; // Fetch role from localStorage if logged in
      }
    });
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen; // Toggle the navigation menu visibility
  }

  toggleLogoutMenu(): void {
    this.showLogoutMenu = !this.showLogoutMenu;  // Toggle logout menu visibility
  }

  logout(): void {
    this.logoutService.logout();  // Call logout from LogoutService
    this.router.navigate(['/login']);  // Redirect to login page
  }
}

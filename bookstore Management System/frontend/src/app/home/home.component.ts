import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // Include only valid imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Correct property name
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToBooks(): void {
    this.router.navigate(['/login']); // Adjust the route as needed
  }
}

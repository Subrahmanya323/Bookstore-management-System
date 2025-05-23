import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService, LoginUser } from '../user.service'; // Import LoginUser interface
import { LogoutService } from '../logout.service'; // Import LogoutService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUser = {
    email: '',
    password: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private logoutService: LogoutService // Inject the LogoutService
  ) {}

  ngOnInit(): void {
    // Redirect to dashboard if already logged in
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        this.router.navigate(['/book']); // Admin dashboard
      } else if (role === 'user') {
        this.router.navigate(['/userbook']); // User dashboard
      }
    }
    this.resetForm();
  }

  resetForm(): void {
    this.user = {
      email: '',
      password: '',
      role: ''
    };
  }

  onLogin(): void {
    if (!this.user.role) {
      alert('Please select a role!');
      return;
    }

    this.userService.loginUser(this.user.email, this.user.password).subscribe(
      (response: any) => {
        console.log('Login successful:', response.message);
        alert('Login successful! Verifying your role...');

        // Save token and role to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', this.user.role);

        // Fetch the user details to verify the role
        this.userService.getUserByEmail(this.user.email).subscribe(
          (userDetails: LoginUser) => {
            if (userDetails.role === this.user.role) {
              // Update login status in LogoutService
              this.logoutService.login();

              // Navigate based on the role
              if (this.user.role === 'admin') {
                this.router.navigate(['/book']); // Admin dashboard
              } else if (this.user.role === 'user') {
                this.router.navigate(['/userbook']); // User dashboard
              } else {
                alert('Invalid role. Please try again.');
                this.logout(); // Log out if role mismatch
              }
            } else {
              alert('Role mismatch. Please ensure your selected role is correct.');
              this.logout(); // Log out if role mismatch
            }
          },
          (error) => {
            console.error('Failed to fetch user details:', error);
            alert('Unable to verify user role. Please try again.');
            this.logout(); // Log out if user details fetch fails
          }
        );
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Invalid credentials. Please try again.');
      }
    );
  }

  private logout(): void {
    this.logoutService.logout(); // Call logout from LogoutService
    this.router.navigate(['/login']);
  }
}

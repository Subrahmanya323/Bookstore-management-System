import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService, User } from '../user.service'; // Ensure correct path to user.service.ts
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  };

  // Validation messages
  validationMessages = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  // Validation functions
  validateName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50 && /^[a-zA-Z\s]*$/.test(name);
  }

  validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  validatePassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  validateForm(form: NgForm): boolean {
    let isValid = true;
    this.validationMessages = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: ''
    };

    // First Name validation
    if (!this.user.firstname || !this.validateName(this.user.firstname)) {
      this.validationMessages.firstname = 'First name should contain only letters and be 2-50 characters long';
      isValid = false;
    }

    // Last Name validation
    if (!this.user.lastname || !this.validateName(this.user.lastname)) {
      this.validationMessages.lastname = 'Last name should contain only letters and be 2-50 characters long';
      isValid = false;
    }

    // Email validation
    if (!this.user.email || !this.validateEmail(this.user.email)) {
      this.validationMessages.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!this.user.password || !this.validatePassword(this.user.password)) {
      this.validationMessages.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      isValid = false;
    }

    // Role validation
    if (!this.user.role) {
      this.validationMessages.role = 'Please select a role';
      isValid = false;
    }

    return isValid;
  }

  onRegister(form: NgForm): void {
    if (!this.validateForm(form)) {
      return;
    }

    console.log('Registering user:', this.user);
    this.userService.registerUser(this.user).subscribe(
      (response: any) => {
        console.log('Registration successful:', response);
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error registering user:', error);
        alert('Registration failed. Please check the details and try again.');
      }
    );
  }
}

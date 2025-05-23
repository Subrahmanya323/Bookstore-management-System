import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUser {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token?: string;  // Assuming JWT token is returned on successful login
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8086/api/v1/user'; // Update with your backend URL

  constructor(private httpClient: HttpClient) {}

  // Register a new user
  registerUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  // Get user by email
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${email}`);
  }

  // Update user details
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseURL}/${user.email}`, user);
  }

  // Delete user by email
  deleteUser(email: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${email}`);
  }

  // Login user (check credentials)
  loginUser(email: string, password: string, role?: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseURL}/login`, { email, password });
  }
}

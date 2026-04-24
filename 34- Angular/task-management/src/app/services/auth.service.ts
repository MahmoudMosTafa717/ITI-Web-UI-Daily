import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_KEY = 'task_app_logged_in';
  private readonly CURRENT_USER_KEY = 'task_app_current_user';

  constructor(private apiService: ApiService) {}

  signup(user: User): Observable<User> {
    return this.apiService.register(user);
  }

  login(email: string, password: string): Observable<{ success: boolean; message: string; user?: User }> {
    return this.apiService.getUsers().pipe(
      map(users => {
        const user = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );
        if (user) {
          localStorage.setItem(this.LOGIN_KEY, 'true');
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
          return { success: true, message: 'Login successful', user };
        }
        return { success: false, message: 'Invalid email or password' };
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.LOGIN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  }
}

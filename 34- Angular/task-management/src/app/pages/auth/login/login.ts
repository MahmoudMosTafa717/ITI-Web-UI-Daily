import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  emailTouched = false;
  passwordTouched = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  get emailInvalid(): boolean {
    return this.emailTouched && !this.email.trim();
  }

  get passwordInvalid(): boolean {
    return this.passwordTouched && !this.password.trim();
  }

  get formValid(): boolean {
    return !!this.email.trim() && !!this.password.trim();
  }

  onSubmit(): void {
    this.emailTouched = true;
    this.passwordTouched = true;

    if (!this.formValid) {
      this.notificationService.add('Please fill in all fields', 'warning');
      return;
    }

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (result) => {
        if (result.success) {
          this.notificationService.add(result.message, 'success');
          this.router.navigate(['/']);
        } else {
          this.notificationService.add(result.message, 'error');
        }
      },
      error: () => {
        this.notificationService.add('An error occurred during login', 'error');
      }
    });
  }
}

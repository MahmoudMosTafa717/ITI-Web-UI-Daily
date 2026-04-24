import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  private passwordMatchValidator(
    group: FormGroup,
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value as string;
    const confirmPassword = group.get('confirmPassword')?.value as string;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.notificationService.add(
        'Please fix the form errors',
        'warning',
      );
      return;
    }

    const { name, email, password } = this.signupForm.value as {
      name: string;
      email: string;
      password: string;
    };

    this.authService.signup({ name, email, password }).subscribe({
      next: () => {
        this.notificationService.add('Account created successfully', 'success');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.notificationService.add('An error occurred during signup', 'error');
      }
    });
  }
}

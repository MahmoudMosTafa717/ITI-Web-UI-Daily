import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  counter = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }

  get clockValue(): string {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timerId = setInterval(() => {
        this.counter++;
        this.ngZone.run(() => {});
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

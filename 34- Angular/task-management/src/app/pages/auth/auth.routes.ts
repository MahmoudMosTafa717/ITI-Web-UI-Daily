import { Routes } from '@angular/router';
import { guestGuard } from '../../guards/guest.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./signup/signup').then((m) => m.Signup),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

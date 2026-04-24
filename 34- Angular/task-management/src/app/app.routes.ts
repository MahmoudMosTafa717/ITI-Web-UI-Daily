import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/tasks/tasks.routes').then((m) => m.tasksRoutes),
  },
  {
    path: 'add-task',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/tasks/add-task-page/add-task-page').then(
        (m) => m.AddTaskPage,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('../app/features/auth/pages/login/login').then((m) => m.Login),
      },
    ],
  },
  {
    path: 'complete-register',
    loadComponent: () =>
      import('../app/features/auth/pages/complete-register/complete-register').then(
        (m) => m.CompleteRegister,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/layouts/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () => import('../app/features/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'sites',
        loadComponent: () => import('../app/features/sites/sites').then((m) => m.Sites),
      },
      {
        path: 'settings',
        loadComponent: () => import('../app/features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
];

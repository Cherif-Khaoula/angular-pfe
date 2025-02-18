import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { userGuard } from './guards/user.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin/dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AdminGuard]
      }
      ,
      
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),canActivate: [AdminGuard]
      },
     
     
     
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'user/dashboard',
    loadComponent: () => import('./views/pages/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),canActivate: [userGuard],
    data: {
      title: 'Page user'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),canActivate: [AuthGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

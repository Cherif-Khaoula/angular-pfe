import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
     
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(m => m.usersComponent),
        data: {
          title: 'users'
        }
      },
      {
        path: 'ajouteuser',
        loadComponent: () => import('./ajouteuser/ajouteuser.component').then(m => m.AppajouteuserComponent),
        data: {
          title: 'ajouteuser'
        }
      },
     
    ]
  }
];



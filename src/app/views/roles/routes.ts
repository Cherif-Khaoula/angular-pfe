import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rôles'
    },
    children: [
      {
        path: 'list',
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent),
        data: { title: 'Liste des rôles', permissions: ['GETALLROLE'] } // 🔒 Vérifie si les permissions sont bien gérées
      }
    ]
  }
];

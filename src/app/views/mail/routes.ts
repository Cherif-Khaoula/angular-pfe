import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mails'
    },
    children: [
      {
        path: 'send',
        loadComponent: () => import('./send/send.component').then(m => m.SendComponent),
       
      }
    ]
  }
];

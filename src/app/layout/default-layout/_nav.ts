import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Accueil',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    
  },
  {
    title: true,
    name: 'Menu'
  },



  {
    name: 'Utilisateurs',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
     
      {
        name: 'Gestion des Utilisateurs',
        url: '/base/users',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Ajouter un utilisateur ',
        url: '/base/ajouteuser',
        icon: 'nav-icon-bullet'
      },
      
    ]
  },
];
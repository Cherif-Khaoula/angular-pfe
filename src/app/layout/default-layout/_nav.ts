import { INavData } from '@coreui/angular';
import { StorageService } from '../../service/storage-service/storage.service'; // Assure-toi que ce service récupère le rôle de l'utilisateur

export function getNavItems(): INavData[] {
  const role = StorageService.getUserRole(); // Récupère le rôle de l'utilisateur connecté

  const navItems: INavData[] = [
    {
      name: 'Accueil',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' },
    },
    {
      title: true,
      name: 'Menu'
    }
  ];

  if (role === 'ADMIN') {
    navItems.push({
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
          name: 'Ajouter un utilisateur',
          url: '/base/ajouteuser',
          icon: 'nav-icon-bullet'
        }
      ]
    });
  }

  if (role === 'USER') {
    navItems.push({
      name: 'Mon Profil',
      url: '',
      iconComponent: { name: 'cil-user' },
    });
  }

  return navItems;
}

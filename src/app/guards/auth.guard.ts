import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../service/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = StorageService.isLoggedIn(); // Vérifie si l'utilisateur est connecté

    if (isLoggedIn) {
      const role = StorageService.getUserRole(); // Récupère le rôle de l'utilisateur (par exemple 'admin', 'user', etc.)

      if (role === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']); // Rediriger vers le tableau de bord de l'admin
      } else if (role === 'USER') {
        this.router.navigate(['/user/dashboard']); // Rediriger vers le tableau de bord de l'utilisateur
      } else {
        this.router.navigate(['/home']); // Si l'utilisateur a un autre rôle, le rediriger vers une page par défaut
      }

      return false; // Empêche l'accès à la page de login
    } else {
      return true; // Si l'utilisateur n'est pas connecté, il peut accéder à la page login
    }
  }
}

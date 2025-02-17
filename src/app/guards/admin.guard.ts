import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../service/storage-service/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = StorageService.getUserRole(); // Récupérer le rôle de l'utilisateur

    if (role === 'ADMIN') {
      return true; // ✅ Accès autorisé
    } else {
      this.router.navigate(['/login']); // 🚫 Redirection vers la page de login
      return false;
    }
  }
}

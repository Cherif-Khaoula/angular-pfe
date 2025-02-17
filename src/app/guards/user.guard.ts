import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../service/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class userGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = StorageService.getUserRole();
    console.log("🔍 Rôle de l'utilisateur:", role);

    if (role === 'USER') {
      console.log("✅ Accès autorisé au dashboard utilisateur");
      return true;
    } else {
      console.warn("🚫 Accès refusé ! Redirection vers login...");
      this.router.navigate(['/login']);
      return false;
    }
  }
}

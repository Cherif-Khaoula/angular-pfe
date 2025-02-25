import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const USER = "c_user";
const TOKEN = "c_token";
const PERMISSIONS = "c_permissions";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Méthode pour enregistrer le token
  saveToken(token: string): void {
    window.localStorage.setItem(TOKEN, token);
  }

  // Récupérer le token
  getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  // Récupérer les informations utilisateur
  getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  // Récupérer le nom de l'utilisateur
  getUserName(): string {
    const user = this.getUser();
    return user ? user.name : 'Utilisateur';
  }

  // Vérifie si l'utilisateur est ADMIN
  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.getUserRole() === 'ADMIN';
  }

  // Vérifie si l'utilisateur est USER
  isUserLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.getUserRole() === 'USER';
  }

  // Enregistrer l'utilisateur dans le localStorage
  saveUser(user: any): void {
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Effacer l'utilisateur du localStorage
  clearUser(): void {
    window.localStorage.removeItem(USER);
  }

  // Vérifie si un utilisateur est connecté (si un token est présent)
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Récupérer le rôle de l'utilisateur
  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || '';
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return '';
    }
  }

  // Récupérer les permissions de l'utilisateur
  getPermissions(): string[] {
    const permissions = localStorage.getItem(PERMISSIONS);
    return permissions ? JSON.parse(permissions) : [];
  }

  // Sauvegarder les permissions
  savePermissions(permissions: string[]): void {
    localStorage.setItem(PERMISSIONS, JSON.stringify(permissions));
  }

  // Effacer toutes les données de l'utilisateur (déconnexion)
  clearStorage(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    localStorage.removeItem(PERMISSIONS);
  }
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
  
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décoder le token
      return decodedToken.roles || []; // Retourner les rôles
    } catch (e) {
      console.error("Erreur lors du décodage du token :", e);
      return [];
    }
  }
  
}

import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
const USER = "c_user";
const TOKEN = "c_token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Méthode pour enregistrer le token
  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN, token);
  }

  // Méthode statique pour récupérer le token
  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  // Méthode statique pour récupérer les informations utilisateur
  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }


  // Méthode statique pour récupérer le nom de l'utilisateur
  static getUserName(): string {
    const user = this.getUser();
    return user ? user.name : 'Utilisateur';
  }

  // Vérifie si l'utilisateur est connecté en tant qu'ADMIN
  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  // Vérifie si l'utilisateur est connecté en tant qu'USER
  static isUserLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const role = this.getUserRole();
    return role === 'USER';
  }

  // Méthode pour enregistrer l'utilisateur dans le localStorage
  public saveUser(user: any): void {
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Méthode pour effacer l'utilisateur du localStorage
  public clearUser(): void {
    window.localStorage.removeItem(USER);
  }

  // Méthode pour vérifier si l'utilisateur est connecté (token présent)
  static isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  static getUserRole(): string {
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
}


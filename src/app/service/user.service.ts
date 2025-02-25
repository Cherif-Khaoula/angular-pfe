import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { StorageService } from './storage-service/storage.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
const BASE_URL = "http://localhost:8080/api/";
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private http: HttpClient, private storage: StorageService , private router: Router) { }

  // Méthode centralisée pour obtenir l'authentification header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('c_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }



  // Fonction pour récupérer tous les utilisateurs
  getAllUsers(): Observable<any> {
    return this.http.get(`${BASE_URL}users`, { headers: this.getAuthHeaders() }).pipe(
      tap(users => console.log("Utilisateurs récupérés :", users)) // Log des utilisateurs
    );
  }
  
 getAllRoles(): Observable<any> {
    return this.http.get(`${BASE_URL}roles`, { headers: this.getAuthHeaders() });
  }

  // Fonction pour récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}users/${id}`, { headers: this.getAuthHeaders() });
  }

  // Fonction pour créer un utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post(`${BASE_URL}users`, user, { headers: this.getAuthHeaders() });
  }


  // Fonction pour mettre à jour un utilisateur
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${BASE_URL}users/${id}`, user, { headers: this.getAuthHeaders() });
  }

  // Fonction pour supprimer un utilisateur

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}users/${id}`, { 
      headers: this.getAuthHeaders(), 
      responseType: 'text' 
    }).pipe(
      tap(() => console.log(`Utilisateur avec ID ${id} supprimé`)),
      catchError(err => {
        console.error("Erreur lors de la suppression de l'utilisateur", err);
        return throwError(() => new Error('Suppression échouée'));
      })
    );
  }
  
  // Fonction de déconnexion
  logout(): void {
    localStorage.removeItem('c_token');
    localStorage.removeItem('c_role');
    localStorage.removeItem('c_user');
    localStorage.removeItem('c_permissions');
    this.router.navigate(['/login']);
  }

  // Fonction pour gérer les logs
  logAuthentication(message: string): void {
    console.log(message);
  }
}



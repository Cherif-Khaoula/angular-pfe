import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { StorageService } from './storage-service/storage.service';
import { Router } from '@angular/router';

const BASE_URL = "http://localhost:8080/api/";
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private storage: StorageService , private router: Router) { }

  // Méthode centralisée pour obtenir l'authentification header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('c_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Connexion de l'utilisateur
  login(email: string, password: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${BASE_URL}authenticate`, { email, password }, { observe: 'response' })
      .pipe(
        tap(() => this.logAuthentication("User Authentication")),
        map((res: HttpResponse<any>) => {
          const userData = res.body;
          this.storage.saveUser(userData);
          const authHeader = res.headers.get(AUTH_HEADER);
          if (authHeader) {
            const bearerToken = authHeader.substring(7);
            this.storage.saveToken(bearerToken);
  
            // Afficher le token dans la console
            console.log('Token enregistré:', bearerToken);
          } else {
            console.error("Erreur: Aucun token trouvé dans l'en-tête de la réponse");
          }
  
          // Rediriger l'utilisateur après une connexion réussie
          
          return res;
        }),
        catchError((error) => {
          console.error('Authentication failed', error);
          // Afficher un message d'erreur et rediriger vers la page de login
          this.router.navigate(['/login']);
          throw error;
        })
      );
  }

  // Fonction pour récupérer tous les utilisateurs
  getAllUsers(): Observable<any> {
    return this.http.get(`${BASE_URL}users`, { headers: this.getAuthHeaders() });
  }

  // Fonction pour récupérer un utilisateur par ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}users/${id}`, { headers: this.getAuthHeaders() });
  }

  // Fonction pour créer un utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post(`${BASE_URL}users/create/`, user, { headers: this.getAuthHeaders() });
  }


  // Fonction pour mettre à jour un utilisateur
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${BASE_URL}users/modifier/${id}`, user, { headers: this.getAuthHeaders() });
  }

  // Fonction pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}users/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  // Fonction de déconnexion
  logout(): void {
    localStorage.removeItem('c_token');
    localStorage.removeItem('c_role');
    this.router.navigate(['/login']);
  }

  // Fonction pour gérer les logs
  logAuthentication(message: string): void {
    console.log(message);
  }
}

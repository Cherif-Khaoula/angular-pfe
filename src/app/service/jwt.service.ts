import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from './storage-service/storage.service';

const BASE_URL = "http://localhost:8080/api/";
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${BASE_URL}authenticate`, { 
      email, 
      password 
    }, { observe: 'response' })
    .pipe(
      tap(() => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
        const userData = res.body; // ✅ Récupération complète des données utilisateur
        this.storage.saveUser(userData); // ✅ Stocker l'utilisateur avec son nom

        console.log("User info:", userData);
        console.log("Token enregistré:", localStorage.getItem('c_token'));
        console.log("Rôle enregistré:", localStorage.getItem('role'));

        // ✅ Vérification si le token est bien présent
        const authHeader = res.headers.get(AUTH_HEADER);
        if (authHeader) {
          const bearerToken = authHeader.substring(7); // Retirer "Bearer "
          this.storage.saveToken(bearerToken);
        } else {
          console.error("Erreur: Aucun token trouvé dans l'en-tête de la réponse");
        }

        return res; // ✅ Retourner la réponse
      })
    );
  }
  
    // Fonction pour récupérer tous les utilisateurs
    getAllUsers(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('c_token')}` // ✅ Ajouter le token JWT
      });
  
      return this.http.get(`${BASE_URL}users`, { headers });
    }
  
  log(message: string) {
    console.log(message);
  }
  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('c_token')}`
    });

    return this.http.get(`${BASE_URL}users/${id}`, { headers });
  }

  // Fonction pour créer un utilisateur
  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('c_token')}`
    });

    return this.http.post(`${BASE_URL}users/create/`, user, { headers });
  }

  // Fonction pour mettre à jour un utilisateur
  updateUser(id: number, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('c_token')}`
    });

    return this.http.put(`${BASE_URL}users/modifier/${id}`, user, { headers });
  }

  // Fonction pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('c_token')}`
    });

    return this.http.delete(`${BASE_URL}users/supprimer/${id}`, { headers });
  }

}

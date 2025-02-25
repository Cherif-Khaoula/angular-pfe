import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { StorageService } from './storage-service/storage.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = "http://localhost:8080/api/";
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) { }

  // Méthode pour obtenir l'authentification header
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
        tap(() => this.logAuthentication('User Authentication')),
        map((res: HttpResponse<any>) => {
          const userData = res.body;
          this.storage.saveUser(userData);

          const authHeader = res.headers.get(AUTH_HEADER);
          if (authHeader) {
            const bearerToken = authHeader.substring(7);
            this.storage.saveToken(bearerToken);

            try {
              const decodedToken: any = jwtDecode(bearerToken);
              
              // Stocker le rôle
              const role = decodedToken.roles ? decodedToken.roles[0] : 'USER';
              localStorage.setItem('c_role', role);

              // Stocker les permissions
              const permissions = decodedToken.permissions || [];
              localStorage.setItem('c_permissions', JSON.stringify(permissions));

            } catch (error) {
              console.error('Erreur lors du décodage du token:', error);
            }

            console.log('Token enregistré:', bearerToken);
          } else {
            console.error('Erreur: Aucun token trouvé dans l’en-tête de la réponse');
          }

          return res;
        }),
        catchError((error) => {
          console.error('Authentication failed', error);
          this.router.navigate(['/login']);
          throw error;
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

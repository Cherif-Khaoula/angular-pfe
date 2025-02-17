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
        console.log("Token enregistré:", localStorage.getItem('token'));
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

  log(message: string) {
    console.log(message);
  }
}

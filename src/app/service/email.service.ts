import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const BASE_URL = 'http://localhost:8082/email/';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('c_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  sendEmail(emailData: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('text', emailData.text);
  
    if (file) {
      formData.append('file', file, file.name);
    }
  
    return this.http.post<any>(`${BASE_URL}send-email-attachment`, formData, {
      headers: this.getAuthHeaders(),  // ✅ Ajout du token ici
      responseType: 'json'
    }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        return throwError(() => new Error(error.error?.error || 'Problème de communication avec le serveur'));
      })
    );
  }
   getAllemails(): Observable<any> {
      return this.http.get(`${BASE_URL}archive`, { headers: this.getAuthHeaders() });
    }
    getemailsenvoyer(): Observable<any> {
      return this.http.get(`${BASE_URL}sent`, { headers: this.getAuthHeaders() });
    }
    getemailsrecevoir(): Observable<any> {
      return this.http.get(`${BASE_URL}received`, { headers: this.getAuthHeaders() });
    }
  
  
}



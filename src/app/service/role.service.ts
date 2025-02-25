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
export class RoleService {
  constructor(private http: HttpClient, private storage: StorageService , private router: Router) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('c_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createRole(role: any): Observable<any> {
    return this.http.post(`${BASE_URL}roles`, role, { headers: this.getAuthHeaders() });
  }

  getAllRoles(): Observable<any> {
    return this.http.get(`${BASE_URL}roles`, { headers: this.getAuthHeaders() });
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}roles/${id}`, { headers: this.getAuthHeaders() });
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put(`${BASE_URL}roles/${id}`, role, { headers: this.getAuthHeaders() });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}roles/${id}`, { headers: this.getAuthHeaders() });
  }
}
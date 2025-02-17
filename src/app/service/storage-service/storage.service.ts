import { Injectable } from '@angular/core';

const USER = "c_user";
const TOKEN = "c_token";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN) ?? null;
}

static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
}


static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
        return '';
    }
    return user.role;
}
static getUserName(): string {
  const user = this.getUser();
  return user && user.name ? user.name : 'Utilisateur'; // ✅ Assurer que la clé correcte est utilisée
}

static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) {
        return true;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN";
}

static isUserLoggedIn(){
  if (this.getToken() == null) {
    return true;
}
const role: string = this.getUserRole();
return role == "USER";

}
  public saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser() {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  public clearUser() {
    window.localStorage.removeItem(USER);
  }

}

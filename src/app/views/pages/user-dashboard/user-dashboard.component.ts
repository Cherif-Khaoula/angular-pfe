import { Component } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';
import { StorageService } from 'src/app/service/storage-service/storage.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  username: string = 'Utilisateur';
  role: string = 'Utilisateur'; // ✅ Variable pour le rôle
  users: any[] = [];
  selectedUser: any = {};

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    this.username = StorageService.getUserName(); // ✅ Récupérer le nom
    this.role = StorageService.getUserRole();
   
  }

  
  // Méthode appelée lors du clic sur le bouton de déconnexion
  onLogout(): void {
    this.jwtService.logout();
  }



}

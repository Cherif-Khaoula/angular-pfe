import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { StorageService } from '../../../service/storage-service/storage.service';
import {  
  CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, IconDirective, ReactiveFormsModule, TableDirective]
})
export class usersComponent implements OnInit {
  username: string = 'Utilisateur';
  users: any[] = [];
  selectedUser: any = {};
  permissions: string[] = [];
  roles: string[] = []; 
  canModifyUser: boolean = false;
  canDeleteUser: boolean = false;

  constructor(private userService: UserService, private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.getUsers();
  }

  /**
   * Charge les informations de l'utilisateur connecté depuis le token
   */
  loadUserData() {
    this.username = this.storageService.getUserName();

    // Récupération des rôles et permissions depuis le token
    this.roles = this.storageService.getUserRoles();
    this.permissions = this.storageService.getPermissions();

    // Vérification des permissions de l'utilisateur
    this.canModifyUser = this.permissions.includes('MODIFIERUSER');
    this.canDeleteUser = this.permissions.includes('SUPPRIMERUSER');
  }
  getUserRoles(user: any): string {
    if (!user.roles || user.roles.length === 0) {
      return 'Aucun rôle';
    }
    return user.roles.map((role: any) => role.nom).join(', ');
  }
  
  /**
   * Récupérer tous les utilisateurs et ajouter une vérification des rôles
   */
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.map((user: any) => ({
          ...user,
          roles: user.roles && user.roles.length > 0 ? user.roles : [{ name: "Aucun rôle" }]
        }));
  
        console.log("Utilisateurs récupérés :", this.users);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des utilisateurs", err);
      }
    });
  }
  

  /**
   * Modifier un utilisateur si l'utilisateur a la permission
   */
     // Mettre à jour un utilisateur
editUser(userId: number): void {
  console.log(`Navigation vers edit-user/${userId}`);
  this.router.navigate(['/base/edit-user', userId]);
}

    // Supprimer un utilisateur
    deleteUser(id: number) {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
      if (confirmation) {
        console.log(`Tentative de suppression de l'utilisateur avec ID: ${id}`);
    
        this.userService.deleteUser(id).subscribe({
          next: (response) => {
            console.log("Réponse de l'API :", response);
            alert("Utilisateur supprimé avec succès !");
            this.getUsers(); // Recharger la liste des utilisateurs
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'utilisateur", err);
            alert("Erreur lors de la suppression de l'utilisateur. Consultez la console.");
          }
        });
      }
    }
    
    
  /**
   * Déconnexion de l'utilisateur
   */
  onLogout(): void {
    this.userService.logout();
  }
}

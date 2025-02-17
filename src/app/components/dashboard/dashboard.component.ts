import { Component } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { StorageService } from '../../service/storage-service/storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class DashboardComponent {
  username: string = 'Utilisateur';
  role: string = 'Utilisateur'; // ✅ Variable pour le rôle
  users: any[] = [];
  selectedUser: any = {};

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    this.username = StorageService.getUserName(); // ✅ Récupérer le nom
    this.role = StorageService.getUserRole();
    this.getUsers(); // ✅ Récupérer les utilisateurs
  }

  // Récupérer tous les utilisateurs
  getUsers() {
    this.jwtService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Stocker les utilisateurs
        console.log("Utilisateurs récupérés :", this.users);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des utilisateurs", err);
      }
    });
  }

  // Récupérer un utilisateur par ID
  getUser(id: number) {
    this.jwtService.getUserById(id).subscribe({
      next: (data) => {
        this.selectedUser = data; // Utilisateur sélectionné
        console.log("Utilisateur récupéré :", this.selectedUser);
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
      }
    });
  }

  // Créer un nouvel utilisateur
  createUser(user: any) {
    this.jwtService.createUser(user).subscribe({
      next: (data) => {
        console.log("Utilisateur créé :", data);
        this.getUsers(); // Recharger la liste des utilisateurs
      },
      error: (err) => {
        console.error("Erreur lors de la création de l'utilisateur", err);
      }
    });
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, user: any) {
    this.jwtService.updateUser(id, user).subscribe({
      next: (data) => {
        console.log("Utilisateur mis à jour :", data);
        this.getUsers(); // Recharger la liste des utilisateurs
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur", err);
      }
    });
  }

  // Supprimer un utilisateur
  deleteUser(id: number) {
    this.jwtService.deleteUser(id).subscribe({
      next: () => {
        console.log("Utilisateur supprimé");
        this.getUsers(); // Recharger la liste des utilisateurs
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'utilisateur", err);
      }
    });
  }

}

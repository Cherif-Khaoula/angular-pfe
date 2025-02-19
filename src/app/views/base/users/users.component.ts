import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import {  CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../service/storage-service/storage.service';
import { Router } from '@angular/router';




@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    imports: [CommonModule ,TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, IconDirective, ReactiveFormsModule, TableDirective]
  })
export class  usersComponent implements OnInit {
    username: string = 'Utilisateur';
    role: string = 'Utilisateur'; // ✅ Variable pour le rôle
    users: any[] = [];
    selectedUser: any = {};
  
  
    constructor(private jwtService: JwtService, private storageService: StorageService ,private router :Router) {}

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
   // Mettre à jour un utilisateur
editUser(userId: number): void {
  console.log(`Navigation vers edit-user/${userId}`);
  this.router.navigate(['/base/edit-user', userId]);
}

    // Supprimer un utilisateur
    deleteUser(id: number) {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
      if (confirmation) {
        this.jwtService.deleteUser(id).subscribe({
          next: () => {
            alert("Utilisateur supprimé avec succès !");
            this.getUsers(); // Recharger la liste des utilisateurs
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'utilisateur", err);
          }
        });
      }
    }
    
    // Méthode appelée lors du clic sur le bouton de déconnexion
    onLogout(): void {
      this.jwtService.logout();
    }
  }
import { Component } from '@angular/core';
import { RoleService } from '../../../service/role.service';
import { StorageService } from '../../../service/storage-service/storage.service';
import {  
  CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-list',
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
   imports: [CommonModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, IconDirective, ReactiveFormsModule, TableDirective]
  
})
export class ListComponent {
  editrole(userId: number): void {
   
  }
  
      // Supprimer un utilisateur
      deleterole(id: number) {
       
        
      }
      hasPermission(role: any, permission: string): boolean {
        return role.permissions.some((p: any) => p.name === permission);
      }
      

  roles: any[] = [];
  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe(
      (data) => this.roles = data,
      (error) => console.error('Erreur lors du chargement des rôles', error)
    );
  }
}

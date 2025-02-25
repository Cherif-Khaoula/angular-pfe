import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, FormModule } from '@coreui/angular';
import { CardComponent, ColComponent, RowComponent } from '@coreui/angular';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@Component({
  selector: 'app-ajouteuser',
  templateUrl: './ajouteuser.component.html',
  styleUrls: ['./ajouteuser.component.scss'],
  imports: [
    CardComponent,
    ColComponent,
    RowComponent,
    FormModule,
    ButtonDirective,
    FormsModule,
    CommonModule,
    ReactiveFormsModule, 
  ]
})
export class AppajouteuserComponent implements OnInit {
  userForm: FormGroup;
  roles$: Observable<string[]> | undefined; // Observable pour récupérer les rôles depuis l'API

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      roles: [[], [Validators.required, Validators.minLength(1)]], // Correction du validateur
    });
  }

  ngOnInit() {
    this.roles$ = this.userService.getAllRoles().pipe(
      map((roles: { id: number; name: string }[]) => roles.map(role => role.name))
    );
  }

  ajouterEmp() {
    if (this.userForm.valid) {
      const userData = {
        ...this.userForm.value,
        roles: this.userForm.value.roles.map((role: string) => ({ name: role })) // Convertir en objets
      };
  
      this.userService.createUser(userData).subscribe(
        (data) => {
          console.log('Utilisateur créé avec succès:', data);
          this.router.navigate(['/base/users']);
        },
        (error) => {
          console.error("Erreur lors de la création de l'utilisateur:", error);
        }
      );
    } else {
      console.log('Formulaire invalide', this.userForm.value);
    }
  }
  onRoleChange(event: Event, role: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const rolesControl = this.userForm.get('roles');
    
    if (rolesControl) {
      let updatedRoles = [...rolesControl.value];
  
      if (checked) {
        updatedRoles.push(role);
      } else {
        updatedRoles = updatedRoles.filter(r => r !== role);
      }
  
      rolesControl.setValue(updatedRoles);
    }
  }
  
    
  trackByRole(index: number, role: string): string {
    return role;
  }
}

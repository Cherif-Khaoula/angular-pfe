import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonDirective, FormModule } from '@coreui/angular';
import { CardComponent, ColComponent, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
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
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  roles$: Observable<{ id: number; name: string; }[]> | undefined;
  selectedRoles: number[] = [];

  userId!: number;
  
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
  
    this.roles$ = this.userService.getAllRoles();
  
    this.userService.getUserById(userId).subscribe((user: any) => {
      console.log("Utilisateur récupéré :", user); // 🔍 Debug ici
  
      this.selectedRoles = user.roles.map((r: any) => r.id);
  
      this.editUserForm = this.fb.group({
        name: [user.name, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        password: [''],
        roles: [this.selectedRoles, [Validators.required, Validators.minLength(1)]],
      });
  
      console.log("Valeur de l'email après assignation :", this.editUserForm.get('email')?.value); // 🔍 Debug ici
    });
  }
  

  onRoleChange(event: Event, roleId: number) {
    const checked = (event.target as HTMLInputElement).checked;
    const rolesControl = this.editUserForm.get('roles');

    if (rolesControl) {
      let updatedRoles = [...rolesControl.value];
      
      if (checked) {
        updatedRoles.push(roleId);
      } else {
        updatedRoles = updatedRoles.filter(id => id !== roleId);
      }
      
      rolesControl.setValue(updatedRoles);
    }
  }

  onSubmit() {
    if (this.editUserForm.invalid) return;

    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const updatedUser = {
      ...this.editUserForm.value,
      roles: this.editUserForm.value.roles.map((id: number) => ({ id })),
    };

    this.userService.updateUser(userId, updatedUser).subscribe(() => {
      console.log('Utilisateur mis à jour avec succès');
      this.router.navigate(['/users']);
    });
  }

  trackByRole(index: number, role: { id: number; name: string }) {
    return role.id;
  }
}

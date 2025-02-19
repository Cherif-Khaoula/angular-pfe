import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, FormModule } from '@coreui/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  CardComponent,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { JwtService } from '../../../service/jwt.service';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
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
    ReactiveFormsModule, // Assurez-vous d'importer ReactiveFormsModule
  ]
})
export class AppajouteuserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private jwtService: JwtService, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$')]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ajouterEmp() {
    if (this.userForm.valid) {
      this.jwtService.createUser(this.userForm.value).subscribe(
        (data) => {
          console.log('Utilisateur créé avec succès:', data);
          this.router.navigate(['/base/users']);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
}

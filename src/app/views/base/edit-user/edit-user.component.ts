import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../../service/jwt.service';
import {
  CardComponent,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  InputGroupComponent, InputGroupTextDirective,
  RowComponent
} from "@coreui/angular";
import {NgIf} from "@angular/common";
import {IconDirective} from "@coreui/icons-angular";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  imports: [
    ColComponent,
    ReactiveFormsModule,
    RowComponent,
    CardComponent,
    InputGroupComponent,
    FormControlDirective,
    FormLabelDirective,
    InputGroupTextDirective,
    NgIf,
    IconDirective
  ],
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]), // Minimum 8 caractères pour le mot de passe
    role: new FormControl('', [Validators.required])
  });
  userId: number = 0;
  showConfirmationAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis l'URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetails(this.userId);
  }

  getUserDetails(id: number): void {
    this.jwtService.getUserById(id).subscribe({
      next: (data) => {
        this.editUserForm.setValue({
          name: data.name,
          email: data.email,
          password: '', // On garde le champ vide pour des raisons de sécurité
          role: data.role
        });
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des détails de l'utilisateur", err);
      }
    });
  }

  isUpdated: boolean = false;

  onUpdateUser(): void {
    if (confirm("Êtes-vous sûr de vouloir modifier cet utilisateur ?")) {
      this.jwtService.updateUser(this.userId, this.editUserForm.value).subscribe({
        next: () => {
          this.router.navigate(['/base/users']); // Redirection immédiate après confirmation de la modification
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'utilisateur", err);
          alert("Erreur lors de la mise à jour. Veuillez réessayer.");
        }
      });
    } else {
      this.router.navigate(['/base/users']);
    }
  }

}




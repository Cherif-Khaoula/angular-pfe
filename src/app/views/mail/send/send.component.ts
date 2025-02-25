import { Component } from '@angular/core';
import { EmailService } from '../../../service/email.service';
import {  
  CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective, TextColorDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular';
@Component({
  selector: 'app-send',
  imports: [SpinnerModule  ,CommonModule,FormsModule ,TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, IconDirective, ReactiveFormsModule, TableDirective]
    ,
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss'
})
export class SendComponent {
  emailData = { to: '', subject: '', text: '' };
  selectedFile: File | null = null;

  constructor(private emailService: EmailService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
 

  
  isLoading = false; // Par défaut, pas de chargement

sendEmail() {
  this.isLoading = true; // Activation du loader avant l'envoi
  this.emailService.sendEmail(this.emailData, this.selectedFile || undefined).subscribe({
    next: (response) => {
      console.log('Réponse du serveur :', response);
      alert(response.message);
    },
    error: (error) => {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      alert('Échec de l\'envoi de l\'e-mail. Veuillez réessayer.');
    },
    complete: () => {
      this.isLoading = false; // Désactivation du loader après la réponse du serveur
    }
  });
}

}  


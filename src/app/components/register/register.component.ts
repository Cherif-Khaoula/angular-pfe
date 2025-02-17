import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';
import { StorageService } from 'src/app/service/storage-service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   username: string = 'Utilisateur';
    role: string = 'Utilisateur'; // ✅ Variable pour le rôle
  
    constructor(private storageService: StorageService) {}
  
    ngOnInit() {
      this.username = StorageService.getUserName(); // ✅ Récupérer le nom
      this.role = StorageService.getUserRole(); // ✅ Récupérer le rôle
    }

  

}

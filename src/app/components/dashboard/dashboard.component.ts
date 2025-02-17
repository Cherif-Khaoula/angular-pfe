import { Component } from '@angular/core';
import { StorageService } from 'src/app/service/storage-service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  username: string = 'Utilisateur';
  role: string = 'Utilisateur'; // ✅ Variable pour le rôle

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.username = StorageService.getUserName(); // ✅ Récupérer le nom
    this.role = StorageService.getUserRole(); // ✅ Récupérer le rôle
  }
}

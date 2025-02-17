import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';
import { StorageService } from 'src/app/service/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,  // Injection du service snackbar
    private storageService: StorageService  // Injection du service de stockage
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(
        this.loginForm.get(['email'])!.value,
        this.loginForm.get(['password'])!.value,
    ).subscribe((response) => {
        console.log(response);
        if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("admin/dashboard");
        } else if (StorageService.isUserLoggedIn()) {
            this.router.navigateByUrl("user/dashboard");
        }
    },
    error => {
        if (error.status == 406) {
            alert("User is not active"); // ✅ Remplacement par alert()
        } else {
            alert("Bad credentials"); // ✅ Remplacement par alert()
        }
    });
}

}

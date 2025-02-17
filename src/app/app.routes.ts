import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
             { path: '', redirectTo: 'login', pathMatch: 'full' },
             { path: "login", component: LoginComponent },
             { path: "admin/dashboard", component: DashboardComponent, canActivate: [AdminGuard] },
             { path: "user/dashboard", component: DashboardComponent, canActivate: [userGuard] }, // ✅ Protection ajoutée
             { path: '**', redirectTo: '/login' } ,
             
           ];

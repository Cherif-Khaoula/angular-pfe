import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "admin/dashboard", component: DashboardComponent, canActivate: [AdminGuard] },
  { path: "user/dashboard", component: DashboardComponent, canActivate: [userGuard] }, // ✅ Protection ajoutée
  { path: '**', redirectTo: '/login' } 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

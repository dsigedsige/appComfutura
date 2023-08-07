import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const router:Routes = [
  {
      path : '', 
      children : [
        { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
        { path: 'login', component: LoginComponent },
        { path: 'registro', component: RegisterComponent },
        { path: '**', redirectTo: 'home' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class AutentificacionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const router:Routes = [
  {
     path : '', component : HomeComponent , canActivate: [ AuthGuard]
  },
  {
    path : 'Autentificacion',
    loadChildren :()=> import('./autentificacion/autentificacion.module').then(m => m.AutentificacionModule )
  },
  {
    path : 'Requerimientos',
    loadChildren :()=> import('./modulo-requerimientos/modulo-requerimientos.module').then(m => m.ModuloRequerimientosModule )
  },
  {
    path : 'Logistica',
    loadChildren :()=> import('./modulo-logistica/modulo-logistica.module').then(m => m.ModuloLogisticaModule )
  },
  { 
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router,{useHash:true})
 ],
 exports : [
   RouterModule
 ]
})
export class AppRoutingModule { }


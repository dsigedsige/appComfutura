import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PagesComponent } from './pages/pages.component';
 
import { RegistroOTComponent } from './pages/registro-ot/registro-ot.component';
import { RegistroRequerimientoComponent } from './pages/registro-requerimiento/registro-requerimiento.component';
import { RegistroSolicitudComponent } from './pages/registro-solicitud/registro-solicitud.component';

const routes: Routes = [
  {
    path : '', component : PagesComponent,
    children : [
      { path: 'registroOT', component: RegistroOTComponent, canActivate: [ AuthGuard] }, 
      { path: 'registroPresupuesto', component: RegistroRequerimientoComponent, canActivate: [ AuthGuard] }, 
      { path: 'registroRequerimiento', component: RegistroSolicitudComponent, canActivate: [ AuthGuard] }, 
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRequerimientoRoutingModule { }

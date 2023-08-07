import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
 
import { PagesComponent } from './pages/pages.component';
  
 const router:Routes = [
  {
     path : '', component : PagesComponent , canActivate: [ AuthGuard]
  },
  {
    path : 'Mantenimiento',
    loadChildren :()=> import('./pages/mantenimientos/mantenimientos-requerimiento.module').then(m => m.MantenimientosRequerimientoModule )
  },
  {
    path : 'Procesos',
    loadChildren :()=> import('./pages/procesos/procesos-requerimiento.module').then(m => m.ProcesosRequerimientoModule )
  },   
  {
    path : 'REPORTES',
    loadChildren :()=> import('./pages/reportes/reportes-almacen.module').then(m => m.ReportesAlmacenModule)
  },  
  { 
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(router)
 ],
 exports : [
   RouterModule
 ]
})
export class ModuloRequerimientosRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from '../guards/auth.guard';

const router:Routes = [
  {
     path : '', component : PagesComponent , canActivate: [ AuthGuard]
  },
  {
    path : 'Procesos',
    loadChildren :()=> import('./pages/procesos/procesos-logistica.module').then(m => m.ProcesosLogisticaModule )
  },    
  { 
    path: '**', redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class ModuloLogisticaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { AdjuntarDocOCComponent } from './pages/adjuntar-doc-oc/adjuntar-doc-oc.component';
import { ListarDocOCComponent } from './pages/listar-doc-oc/listar-doc-oc.component';
import { RegistrarFacturasComponent } from './pages/registrar-facturas/registrar-facturas.component';
 
const routes: Routes = [
  {
    path : '', component : PagesComponent,
    children : [
       { path: 'adjuntarDocOc', component: AdjuntarDocOCComponent, canActivate: [ AuthGuard] }, 
       { path: 'listarDocOc', component: ListarDocOCComponent, canActivate: [ AuthGuard] }, 
       { path: 'registroFacturas', component: RegistrarFacturasComponent, canActivate: [ AuthGuard] }, 
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosLogisticaRoutingModule { }

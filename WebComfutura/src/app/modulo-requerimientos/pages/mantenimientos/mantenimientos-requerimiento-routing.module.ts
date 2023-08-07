 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
 
import { PagesComponent } from './pages/pages.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
 

const routes: Routes = [
  {
    path : '', component : PagesComponent,
    children : [
      { path: 'Almacen', component: AlmacenComponent, canActivate: [ AuthGuard] },   
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRequerimientoRoutingModule { }

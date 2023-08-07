
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { KardexComponent } from './pages/kardex/kardex.component';

const routes: Routes = [
  {
    path : '', component : PagesComponent,
    children : [
      { path: 'ReporteKardex', component: KardexComponent, canActivate: [ AuthGuard] },  
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesAlmacenRoutingModule { }




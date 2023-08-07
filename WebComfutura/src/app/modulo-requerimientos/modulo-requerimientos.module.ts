import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ModuloRequerimientosRoutingModule } from './modulo-requerimientos-routing.module';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    ModuloRequerimientosRoutingModule,
    ComponentsModule,
  ]
})
export class ModuloRequerimientosModule { 
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module'; 
import { PagesComponent } from './pages/pages.component';
import { ModuloLogisticaRoutingModule } from './modulo-logistica-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    ModuloLogisticaRoutingModule,
    ComponentsModule,
  ]
})
export class ModuloLogisticaModule { 
}

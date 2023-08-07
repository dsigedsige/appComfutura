import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

//--- tabs
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//----- fechas datetimePicker ---
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PagesComponent } from './pages/pages.component';
import { ProcesosLogisticaRoutingModule } from './procesos-logistica-routing.module';
import { AdjuntarDocOCComponent } from './pages/adjuntar-doc-oc/adjuntar-doc-oc.component';
import { ListarDocOCComponent } from './pages/listar-doc-oc/listar-doc-oc.component';
import { RegistrarFacturasComponent } from './pages/registrar-facturas/registrar-facturas.component';

@NgModule({
  declarations: [
    PagesComponent,
    AdjuntarDocOCComponent,
    ListarDocOCComponent,
    RegistrarFacturasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProcesosLogisticaRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
  ]
})
export class ProcesosLogisticaModule {
  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }
 }

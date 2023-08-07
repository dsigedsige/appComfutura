import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterConceptoPipe } from 'src/app/pipes/filterConcepto.pipe';

//--- tabs
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//----- fechas datetimePicker ---
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { GuiasComponent } from './pages/guias/guias.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
 
import { PagesComponent } from './pages/pages.component';
import { ProcesosRequerimientoRoutingModule } from './procesos-requerimiento-routing.module';

import { RegistroOTComponent } from './pages/registro-ot/registro-ot.component';
import { RegistroRequerimientoComponent } from './pages/registro-requerimiento/registro-requerimiento.component';
import { CronogramaComponent } from './pages/registro-requerimiento/cronograma/cronograma.component';
import { ResumenComponent } from './pages/registro-requerimiento/resumen/resumen.component';
import { MaterialesComponent } from './pages/registro-requerimiento/materiales/materiales.component';
import { TabGrupoComponent } from './pages/registro-requerimiento/tab-grupo/tab-grupo.component';
import { ViaticosComponent } from './pages/registro-requerimiento/viaticos/viaticos.component';
import { PlanillaComponent } from './pages/registro-requerimiento/planilla/planilla.component';
import { RegistroSolicitudComponent } from './pages/registro-solicitud/registro-solicitud.component';
import { ResumenSolicitudComponent } from './pages/registro-solicitud/resumen-solicitud/resumen-solicitud.component';
import { MaterialSolicitudComponent } from './pages/registro-solicitud/material-solicitud/material-solicitud.component';
import { TabGrupoSolicitudComponent } from './pages/registro-solicitud/tab-grupo-solicitud/tab-grupo-solicitud.component';
import { TabGrupoMasivoSolicitudComponent } from './pages/registro-solicitud/tab-grupo-masivo-solicitud/tab-grupo-masivo-solicitud.component';

 

@NgModule({
  declarations: [
    GuiasComponent,
    TransferenciasComponent,
    PagesComponent,
    RegistroOTComponent,
    RegistroRequerimientoComponent,
    CronogramaComponent,
    ResumenComponent,
    MaterialesComponent,
    TabGrupoComponent,
    FilterConceptoPipe,
    ViaticosComponent,
    PlanillaComponent,
    RegistroSolicitudComponent,
    ResumenSolicitudComponent,
    MaterialSolicitudComponent,
    TabGrupoSolicitudComponent,
    TabGrupoMasivoSolicitudComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProcesosRequerimientoRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
  ]
})
export class ProcesosRequerimientoModule {
  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }
 }

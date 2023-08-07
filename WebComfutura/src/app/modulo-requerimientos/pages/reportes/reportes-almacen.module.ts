
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { PagesComponent } from './pages/pages.component';
import { ReportesAlmacenRoutingModule } from './reportes-almacen-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
 
//--- tabs
import { TabsModule } from 'ngx-bootstrap/tabs'; 

//----- fechas datetimePicker ---
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);
import { KardexComponent } from './pages/kardex/kardex.component';
 
@NgModule({
  declarations: [
    PagesComponent,     
    KardexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportesAlmacenRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
  ]
})
export class ReportesAlmacenModule { 
  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }
}


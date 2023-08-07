 
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// // para poder utilizar en ng-model
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// // loading
// import { NgxSpinnerModule } from "ngx-spinner";

// // importar rutas
// ///---- RUTAS//
// import { AppRoutingModule } from './app-routing.module';

// ////------ peticiones http
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 
// //filtar cualquier tabla
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

// // componentes--
// import { AppComponent } from './app.component';
 
// // DatetimePicker Boostrap
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
// //----- fechas datetimePicker ---
// import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { defineLocale } from 'ngx-bootstrap/chronos';
// import { esLocale } from 'ngx-bootstrap/locale';
// defineLocale('es', esLocale);


// // timePiecker Boostrap
// import { TimepickerModule } from 'ngx-bootstrap';

// // treeview Boostrap
// import { TreeviewModule } from 'ngx-treeview';

 
  
// import { TabsModule } from 'ngx-bootstrap/tabs'; 
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { HomeComponent } from './home/home.component'; 
// import { SpinnerloadingComponent } from './components/spinnerloading/spinnerloading.component';
// import { ComponentsModule } from './components/components.module';

 
// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     SpinnerloadingComponent,
//     // NoimagePipe, 
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     NgxSpinnerModule,
//     BrowserAnimationsModule,
//     TimepickerModule.forRoot(),
//     TreeviewModule.forRoot(),
//     Ng2SearchPipeModule,
//     TabsModule.forRoot(),
//     TooltipModule.forRoot(),
//     BsDatepickerModule.forRoot(),
//     ComponentsModule
//   ],

//   providers: [

//   ],
//   bootstrap: [AppComponent]
// })


// export class AppModule {

 
//   constructor( private bsLocaleService: BsLocaleService){
//     this.bsLocaleService.use('es');//fecha en español, datepicker
//   }

 
// }

 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
// importar rutas
import { AppRoutingModule } from './app-routing.module';

// // loading
 import { NgxSpinnerModule } from "ngx-spinner";
 
// componentes--
import { AppComponent } from './app.component'; 
import { HomeComponent } from './home/home.component'; 
import { ComponentsModule } from './components/components.module';
import { SpinnerloadingComponent } from './components/spinnerloading/spinnerloading.component';

// // DatetimePicker Boostrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// //----- fechas datetimePicker ---
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

// ////------ peticiones http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerloadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],

  providers: [

  ],
  bootstrap: [AppComponent]
})


export class AppModule {

   
  constructor( private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('es');//fecha en español, datepicker
  }

  
}


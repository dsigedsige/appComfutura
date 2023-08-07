import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}


@Injectable({
  providedIn: 'root'
})
export class CombosService {

  URL = environment.URL_API;
  departamentos:any[]=[];


  areas :any[]=[];
  bancos:any[]=[];  

  clientes :any[]=[];
  cargos:any[]=[];

  estadosRegistroOT:any[]=[];
  estadosRequerimiento:any[]=[];
  estadosSolicitud:any[]=[];

  monedas:any[]=[];

  partidas :any[]=[];
  personales :any[]=[];
  proyectos :any[]=[];

  tiposConceptos:any[]=[];
  tiposDocumentos :any[]=[];
  tiposDocumentosPersonal:any[]=[];
  tiposTrabajo :any[]=[];

  unidadMedidas:any[]=[];
  tiposCobro:any[]=[];  

  constructor(private http:HttpClient) {  }  

   get_departamentos(){
    if (this.departamentos.length > 0) {
      return of( this.departamentos )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/UbigeoDepartamentos')
                  .pipe(map((res:any)=>{
                        this.departamentos = res.data;
                        return res.data;
                  }) );
    }
  }

  get_estadosRegistroOT(){
    if (this.estadosRegistroOT.length > 0) {
      return of( this.estadosRegistroOT )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/EstadosRegistroOT')
                  .pipe(map((res:any)=>{
                        this.estadosRegistroOT = res.data;
                        return res.data;
                  }) );
    }
  }

  get_proyectos(){
    if (this.proyectos.length > 0) {
      return of( this.proyectos )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/proyectos')
                  .pipe(map((res:any)=>{
                        this.proyectos = res.data;
                        return res.data;
                  }) );
    }
  }

  get_clientes(){
    if (this.clientes.length > 0) {
      return of( this.clientes )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/clientes')
                  .pipe(map((res:any)=>{
                        this.clientes = res.data;
                        return res.data;
                  }) );
    }
  }

  get_personales(){
    if (this.personales.length > 0) {
      return of( this.personales )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/personales')
                  .pipe(map((res:any)=>{
                        this.personales = res.data;
                        return res.data;
                  }) );
    }
  }

  get_estadosRequerimiento(){
    if (this.estadosRequerimiento.length > 0) {
      return of( this.estadosRequerimiento )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/estadosRequerimiento')
                  .pipe(map((res:any)=>{
                        this.estadosRequerimiento = res.data;
                        return res.data;
                  }) );
    }
  }

  get_tiposDocumentos(){
    if (this.tiposDocumentos.length > 0) {
      return of( this.tiposDocumentos )
    }else{
  
      return this.http.get( this.URL + 'TblTelefoniaOtCabs/tiposDocumentos')
                  .pipe(map((res:any)=>{
                        this.tiposDocumentos = res.data;
                        return res.data;
                  }) );
    }
  }

  get_tiposTrabajos(){
    if (this.tiposTrabajo.length > 0) {
      return of( this.tiposTrabajo )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/tiposTrabajo')
                  .pipe(map((res:any)=>{
                        this.tiposTrabajo = res.data;
                        return res.data;
                  }) );
    }
  }

  get_areas(){
    if (this.areas.length > 0) {
      return of( this.areas )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/areas')
                  .pipe(map((res:any)=>{
                        this.areas = res.data;
                        return res.data;
                  }) );
    }
  }

  get_partidas(){
    if (this.partidas.length > 0) {
      return of( this.partidas )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/partidas')
                  .pipe(map((res:any)=>{
                        this.partidas = res.data;
                        return res.data;
                  }) );
    }
  }


  get_unidadesMedidas(){
    if (this.unidadMedidas.length > 0) {
      return of( this.unidadMedidas )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/unidadMedida')
                  .pipe(map((res:any)=>{
                        this.unidadMedidas = res.data;
                        return res.data;
                  }) );
    }
  }

  get_tipoDocPersonal(){
    if (this.tiposDocumentosPersonal.length > 0) {
      return of( this.tiposDocumentosPersonal )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/tiposDocumentos')
                  .pipe(map((res:any)=>{
                        this.tiposDocumentosPersonal = res.data;
                        return res.data;
                  }) );
    }
  }
 
  get_monedas(){
    if (this.monedas.length > 0) {
      return of( this.monedas )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/monedas')
                  .pipe(map((res:any)=>{
                        this.monedas = res.data;
                        return res.data;
                  }) );
    }
  }

  get_bancos(){
    if (this.bancos.length > 0) {
      return of( this.bancos )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/bancos')
                  .pipe(map((res:any)=>{
                        this.bancos = res.data;
                        return res.data;
                  }) );
    }
  }

 
  get_tiposConceptos(){
    if (this.tiposConceptos.length > 0) {
      return of( this.tiposConceptos )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/tiposConceptos')
                  .pipe(map((res:any)=>{
                        this.tiposConceptos = res.data;
                        return res.data;
                  }) );
    }
  }

  get_cargos(){
    if (this.cargos.length > 0) {
      return of( this.cargos )
    }else{
  
      return this.http.get( this.URL + 'RegistroRequerimiento/cargosPersonal')
                  .pipe(map((res:any)=>{
                        this.cargos = res.data;
                        return res.data;
                  }) );
    }
  }

  get_tiposCobro(){
    if (this.tiposCobro.length > 0) {
      return of( this.tiposCobro )
    }else{
  
      return this.http.get( this.URL + 'RegistroFacturas/tiposCobros')
                  .pipe(map((res:any)=>{
                        this.tiposCobro = res.data;
                        return res.data;
                  }) );
    }
  }

  get_estadosSolicitud(){
    if (this.estadosSolicitud.length > 0) {
      return of( this.estadosSolicitud )
    }else{
  
      return this.http.get( this.URL + 'RegistroSolicitudes/estadosSolicitudes')
                  .pipe(map((res:any)=>{
                        this.estadosSolicitud = res.data;
                        return res.data;
                  }) );
    }
  }


}

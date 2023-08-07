import { EventEmitter, Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class RegistroSolicitudService {
  URL = environment.URL_API;
  fichasSolicitud$ = new EventEmitter<boolean>();
  fichasResumenSolicitud$ = new EventEmitter<boolean>();
  flagTabsDisabledSolicitud$ = new EventEmitter<boolean>();
  
  constructor(private http:HttpClient) { }  

  get_mostrar_informacion({ departamento,  provincia, nroRequerimiento,  fecha_ini,  fecha_fin , estado }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('departamento', departamento );
    parametros = parametros.append('provincia', provincia );
    parametros = parametros.append('nroRequerimiento', nroRequerimiento );
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 

    return this.http.get( this.URL + 'RegistroSolicitudes/registroSolicitudCab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_buscarInformacionPresupuesto(nroPresupuesto:string): any{
    let parametros = new HttpParams();
    parametros = parametros.append('nroPresupuesto', nroPresupuesto ); 

    return this.http.get( this.URL + 'RegistroSolicitudes/buscarNroPresupuesto' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_registroSolicitud(objMantenimiento:any):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.post(this.URL + 'RegistroSolicitudes/post_saveRegistroSolicitudes', JSON.stringify(objMantenimiento), httpOptions);
  }


  set_edit_registroSolicitud(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'RegistroSolicitudes/put_editRegistroSolicitudes/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  get_descargarGrilla({ departamento,  provincia, nroRequerimiento,  fecha_ini,  fecha_fin , estado }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('departamento', departamento );
    parametros = parametros.append('provincia', provincia );
    parametros = parametros.append('nroRequerimiento', nroRequerimiento );
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 

    return this.http.get( this.URL + 'RegistroSolicitudes/descargarGrilla_solicitudesCab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_anular_solicitud(IdSolicitud : number, idUsuario :string): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdSolicitud', IdSolicitud );
    parametros = parametros.append('idUsuario', idUsuario );

    return this.http.get( this.URL + 'RegistroSolicitudes/anular_Solicitud' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }


    // ------TAB RESUMEN ----


    get_mostrarResumenSolicitud(IdSolicitud:number): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('IdSolicitud', IdSolicitud );
      return this.http.get( this.URL + 'RegistroSolicitudes/detalleResumenSolicitud' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

    set_enviarProvisionar(IdSolicitud:number, IdUsuario:string): any{
      let parametros = new HttpParams();  
      parametros = parametros.append('IdSolicitud', IdSolicitud );
      parametros = parametros.append('IdUsuario', IdUsuario );

      return this.http.get( this.URL + 'RegistroSolicitudes/provisionar_solicitud' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

    
    // ------TAB MATERIAL ----

    get_mostrarMaterialesSolicitud(IdSolicitud:number): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('IdSolicitud', IdSolicitud );
      return this.http.get( this.URL + 'RegistroSolicitudes/materialesSolicitud' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

     // ------TAB GRUPOS ----
    
  get_mostrarTabsGruposSolicitud(IdSolicitud:number, IdTipoTabs : number): any{
    let parametros = new HttpParams();

    parametros = parametros.append('IdSolicitud', IdSolicitud );
    parametros = parametros.append('IdTipoTabs', IdTipoTabs );

    return this.http.get( this.URL + 'RegistroSolicitudes/detalleTabsGruposSolicitud' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_tabsGrupoSolicitud(objMantenimiento:any):any{
    return this.http.post(this.URL + 'RegistroSolicitudes/post_saveTabsGrupoSolicitud', JSON.stringify(objMantenimiento), httpOptions)
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_edit_tabsGrupoSolicitud(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'RegistroSolicitudes/put_editTabsGrupoSolicitud/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  set_eliminar_tabsGrupoSolicitud(IdSolicitudTabs : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdSolicitudTabs', IdSolicitudTabs );

    return this.http.get( this.URL + 'RegistroSolicitudes/eliminar_tabsGruposSolicitud' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_anular_tabsGrupoSolicitud(IdSolicitudTabs : number, IdUsuario:string ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdSolicitudTabs', IdSolicitudTabs );
    parametros = parametros.append('IdUsuario', IdUsuario );

    return this.http.get( this.URL + 'RegistroSolicitudes/anular_tabsGruposSolicitud' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_tabsGrupoSolicitud_masivo(listSolicitudesTabs:any, IdSolicitud:number,usuario:string , objMantenimiento:any):any{

    const objTabs = {
      "IdTipoPersonal": objMantenimiento.IdTipoPersonal,
      "NroDocPersonal": objMantenimiento.NroDocPersonal,
      "IdBanco":  objMantenimiento.IdBanco,
      "PubMoneCodigo":  objMantenimiento.PubMoneCodigo,
      "CuentaBanco":  objMantenimiento.CuentaBanco,
      "CuentaInterbancarioBanco":  objMantenimiento.CuentaInterbancarioBanco,
      "listSolicitudesTabs":listSolicitudesTabs
    }

    console.log(JSON.stringify(objTabs))

    return this.http.post(this.URL + 'RegistroSolicitudes/post_saveDetalleTabsMasivo?IdSolicitud=' + IdSolicitud + '&usuario=' + usuario, JSON.stringify(objTabs), httpOptions);
  }








  








  get_verificar_nroOT(descTurno:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', descTurno);

    return this.http.get( this.URL + 'Mantenimientos' , {params: parametros}).toPromise();
  }






  // ------TAB CRONOGRAMA ----

  get_mostrarCronogramas(IdRequerimiento:number): any{
    let parametros = new HttpParams();

    parametros = parametros.append('IdRequerimiento', IdRequerimiento );
    return this.http.get( this.URL + 'RegistroRequerimiento/detalleCronogramas' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_cronograma(objMantenimiento:any):any{
    return this.http.post(this.URL + 'RegistroRequerimiento/post_saveCronograma', JSON.stringify(objMantenimiento), httpOptions);
  }

  set_edit_cronograma(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'RegistroRequerimiento/put_editCronograma/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  set_eliminar_cronograma(IdReqCronograma : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdReqCronograma', IdReqCronograma );

    return this.http.get( this.URL + 'RegistroRequerimiento/eliminar_cronograma' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }



    get_mostrarMateriales(usuario:string): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('usuario', usuario );
      return this.http.get( this.URL + 'RegistroRequerimiento/detalleMateriales' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }


    set_save_material(listMaterial:any, IdRequerimiento:number,usuario:string ):any{
      return this.http.post(this.URL + 'RegistroRequerimiento/post_saveMaterial?IdRequerimiento=' + IdRequerimiento + '&usuario=' + usuario, JSON.stringify(listMaterial), httpOptions);
    }

    set_actualizarCantidadMaterial(IdReqMaterial:number, AlmArtiCodigo:string, CantidadPresupuesto :string,  CostoPresupuesto : string, usuario:string): any{
      let parametros = new HttpParams(); 
      parametros = parametros.append('IdReqMaterial', IdReqMaterial );
      parametros = parametros.append('AlmArtiCodigo', AlmArtiCodigo );
      parametros = parametros.append('CantidadPresupuesto', CantidadPresupuesto );
      parametros = parametros.append('CostoPresupuesto', CostoPresupuesto );
      parametros = parametros.append('Usuario', usuario );
  
      return this.http.get( this.URL + 'RegistroRequerimiento/actualizar_cantidadMaterial' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

    set_eliminar_material(IdReqMaterial : number ): any{
      let parametros = new HttpParams(); 
      parametros = parametros.append('IdReqMaterial', IdReqMaterial );
  
      return this.http.get( this.URL + 'RegistroRequerimiento/eliminar_material' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

    
    // ------TAB CONTRATISTA ----

    get_personalTipoDoc(tipoDoc:string): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('tipoDoc', tipoDoc );
      return this.http.get( this.URL + 'RegistroRequerimiento/personales' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

    





  
  get_descargarCronograma(IdRequerimiento :number, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('IdRequerimiento', IdRequerimiento );
    parametros = parametros.append('usuario', idUsuario ); 

    return this.http.get( this.URL + 'RegistroRequerimiento/descargar_cronograma' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }



}



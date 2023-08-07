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
export class RegistroRequerimientoService {
  URL = environment.URL_API;
  fichasRequerimiento$ = new EventEmitter<boolean>();
  fichasResumenRequerimiento$ = new EventEmitter<boolean>();
  
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

    return this.http.get( this.URL + 'RegistroRequerimiento/registroRequerimientoCab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_buscarInformacionOT(nroOt:string): any{
    let parametros = new HttpParams();
    parametros = parametros.append('nroOt', nroOt ); 

    return this.http.get( this.URL + 'RegistroRequerimiento/buscarNroOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_registroRequerimiento(objMantenimiento:any):any{
    return this.http.post(this.URL + 'RegistroRequerimiento/post_saveRegistroRequerimiento', JSON.stringify(objMantenimiento), httpOptions);
  }


  set_edit_registroRequerimiento(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'RegistroRequerimiento/put_editRegistroRequerimiento/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }


  set_anular_registroRequerimiento(IdRequerimiento : number, idUsuario :string): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdRequerimiento', IdRequerimiento );
    parametros = parametros.append('idUsuario', idUsuario );


    return this.http.get( this.URL + 'RegistroRequerimiento/anular_requerimiento' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_verificar_nroOT(descTurno:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', descTurno);

    return this.http.get( this.URL + 'Mantenimientos' , {params: parametros}).toPromise();
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

    return this.http.get( this.URL + 'RegistroRequerimiento/descargarGrilla_requerimientoCab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
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

    // ------TAB RESUMEN ----


    get_mostrarResumen(IdRequerimiento:number): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('IdRequerimiento', IdRequerimiento );
      return this.http.get( this.URL + 'RegistroRequerimiento/detalleResumen' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }


    // ------TAB MATERIAL ----

    get_mostrarMaterialesCab(IdRequerimiento:number): any{
      let parametros = new HttpParams();
  
      parametros = parametros.append('IdRequerimiento', IdRequerimiento );
      return this.http.get( this.URL + 'RegistroRequerimiento/materialesCab' , {params: parametros})
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

    


  get_mostrarTabsGrupos(IdRequerimiento:number, IdTipoTabs : number): any{
    let parametros = new HttpParams();

    parametros = parametros.append('IdRequerimiento', IdRequerimiento );
    parametros = parametros.append('IdTipoTabs', IdTipoTabs );

    return this.http.get( this.URL + 'RegistroRequerimiento/detalleTabsGrupos' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_tabsGrupo(objMantenimiento:any):any{
    return this.http.post(this.URL + 'RegistroRequerimiento/post_saveTabsGrupo', JSON.stringify(objMantenimiento), httpOptions)
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_edit_tabsGrupo(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'RegistroRequerimiento/put_editTabsGrupo/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  set_eliminar_tabsGrupo(IdTabs : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdTabs', IdTabs );

    return this.http.get( this.URL + 'RegistroRequerimiento/eliminar_tabsGrupos' , {params: parametros})
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



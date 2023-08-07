import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
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
export class RegistroOTService {
  URL = environment.URL_API;
  constructor(private http:HttpClient) { }  

  get_provincias(idDepartamento : number, idUsuario:string): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idDepartamento', idDepartamento );

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/UbigeoProvincias' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_distritos(idDepartamento : number, idProvincia:number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idDepartamento', idDepartamento );
    parametros = parametros.append('idProvincia', idProvincia );


    return this.http.get( this.URL + 'TblTelefoniaOtCabs/UbigeoDistritos' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }



  get_mostrar_informacion({ departamento,  provincia, distrito,  fecha_ini,  fecha_fin , estado }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('departamento', departamento );
    parametros = parametros.append('provincia', provincia );
    parametros = parametros.append('distrito', distrito );
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/registroOTcab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }


  set_save_registroOT(objMantenimiento:any):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.post(this.URL + 'TblTelefoniaOtCabs/post_saveRegistroOT', JSON.stringify(objMantenimiento), httpOptions);
  }


  set_edit_registroOT(objMantenimiento:any, id :number):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.put(this.URL + 'TblTelefoniaOtCabs/put_editRegistroOT/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  
  get_registroOTedicion(idOT : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idOT', idOT );
    return this.http.get( this.URL + 'TblTelefoniaOtCabs/registroOT_id' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }
 
  get_verificar_nroOT(descTurno:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', descTurno);

    return this.http.get( this.URL + 'Mantenimientos' , {params: parametros}).toPromise();
  }

  set_anular_registroOT(idOt : number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idOT', idOt );

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/anular_registroOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_descargarGrilla({ departamento,  provincia, distrito,  fecha_ini,  fecha_fin , estado }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('departamento', departamento );
    parametros = parametros.append('provincia', provincia );
    parametros = parametros.append('distrito', distrito );
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/descargarGrilla_registroOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_archivosRegistroOt(idOT : number, tipoDoc:number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idOT', idOT );
    parametros = parametros.append('idTipoDoc', tipoDoc );

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/detalleArchivosOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }


  get_descargarArchivo(id_OtArchivo :number, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('idOtArchivo', id_OtArchivo ); 
    parametros = parametros.append('idUsuario', idUsuario ); 

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/descargarGrilla_registroOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_eliminar_archivoOT(idOtArchivo : number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idOtArchivo', idOtArchivo );

    return this.http.get( this.URL + 'TblTelefoniaOtCabs/eliminar_archivoOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

 
}
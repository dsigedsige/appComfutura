import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs';
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
 
export class AlmacenService {

  URL = environment.URL_API;
  constructor(private http:HttpClient) { }  

  get_mostrar_informacion({delegacion,proyecto,  local,tipoAlmacen , estado}): any{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', delegacion + '|' + proyecto + '|' + local + '|' + tipoAlmacen + '|' + estado);

    return this.http.get( this.URL + 'tblAlm_Almacenes' , {params: parametros});
  }
 
  get_verificar_codigo(descTurno:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', descTurno);

    return this.http.get( this.URL + 'Mantenimientos' , {params: parametros}).toPromise();
  }

  set_save_almacen(objMantenimiento:any):any{
    return this.http.post(this.URL + 'tblAlm_Almacenes', JSON.stringify(objMantenimiento), httpOptions);
  }

  set_edit_almacen(objMantenimiento:any, id :number):any{
    return this.http.put(this.URL + 'tblAlm_Almacenes/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  set_anular_almacen(id : number):any{ 
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '6');
    parametros = parametros.append('filtro', id);

    return this.http.get( this.URL + 'tblAlm_Almacenes' , {params: parametros});
  }

  get_proyectosDelegacion(idDelegacion:number, idUsuario:number){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '5');
    parametros = parametros.append('filtro', idDelegacion + '|' + idUsuario );

    return this.http.get( this.URL + 'tblAlm_Almacenes' , {params: parametros});
  }

  get_proyectosDelegacion_masivo(idDelegacion:number, idPersonal:number, idUsuario:number){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '7');
    parametros = parametros.append('filtro', idDelegacion + '|' + idPersonal + '|' + idUsuario );

    return this.http.get( this.URL + 'tblAlm_Almacenes' , {params: parametros});
  }

}


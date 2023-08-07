import { Injectable } from '@angular/core';
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
export class EscritorioOCService {

  URL = environment.URL_API;
  constructor(private http:HttpClient) { }  

  get_buscarOC( nroOc : string , usuario : string): any{
    let parametros = new HttpParams();
    parametros = parametros.append('nroOc', String(nroOc).trim());
    parametros = parametros.append('usuario',  usuario );

    return this.http.get( this.URL + 'CotizacionOC/buscarOC' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));    
  }

  get_detalleDocumentosOC( IdOC  : number, usuario : string): any{
    let parametros = new HttpParams();
    parametros = parametros.append('IdOC', IdOC);
    parametros = parametros.append('usuario',usuario );

    return this.http.get( this.URL + 'CotizacionOC/detalleDocumentosOC' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));    
  }

  set_eliminar_archivoOC(idOCcotizacion : number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('idOCcotizacion', idOCcotizacion );

    return this.http.get( this.URL + 'CotizacionOC/eliminar_archivoOC' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }


}

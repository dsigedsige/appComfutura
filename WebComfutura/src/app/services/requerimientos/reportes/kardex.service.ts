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
export class KardexService {
  URL = environment.URL_API;
  constructor(private http:HttpClient) { }  

  getAlmacenes_localTipoAlmacen(idLocal:number, idTipoAlmacen : number, idUsuario:number): any{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', idLocal + '|' + idTipoAlmacen + '|' + idUsuario);

    return this.http.get( this.URL + 'Kardex' , {params: parametros});
  }

  get_buscarCodigoMaterial( codigo , usuario : number): any{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '9');
    parametros = parametros.append('filtro',   '2|' +   codigo + '|' + usuario  );

    return this.http.get( this.URL + 'Stock' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));    
  }
  
  
  get_buscarCodigoObraMaterial_masivo( filtro, usuario : number): any{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '10');
    parametros = parametros.append('filtro',   '2|' +   filtro + '|' + usuario  );

    return this.http.get( this.URL + 'Stock' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));    
  }



  get_visualizarkardex( { local, tipoAlmacen, almacen, fecha_ini, fecha_fin, id}, usuario : number): any{
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '2');
    parametros = parametros.append('filtro',   local  + '|' +   tipoAlmacen + '|' + almacen  + '|' +   fecha_ini + '|' + fecha_fin + '|' + id   + '|' + usuario  );

    return this.http.get( this.URL + 'Kardex' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));    
  }
 


}


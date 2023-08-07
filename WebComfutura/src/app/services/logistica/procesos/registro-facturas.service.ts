 

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
export class RegistroFacturasService {
  URL = environment.URL_API;
  estadosRegistroFactura:any[]=[];
  tipoDocumento:any[]=[];

  constructor(private http:HttpClient) { }  
 
  get_estadosRegistroFactura(){
    if (this.estadosRegistroFactura.length > 0) {
      return of( this.estadosRegistroFactura )
    }else{
  
      return this.http.get( this.URL + 'RegistroFacturas/estadosRegistroFacturas')
                  .pipe(map((res:any)=>{
                 
                        this.estadosRegistroFactura = res.data;
                        return res.data;
                  }) );
    }
  }
  
  get_tipoDocumentoRegistroFactura(){
    if (this.tipoDocumento.length > 0) {
      return of( this.tipoDocumento )
    }else{
  
      return this.http.get( this.URL + 'RegistroFacturas/tiposDocumentos')
                  .pipe(map((res:any)=>{
 
                        this.tipoDocumento = res.data;
                        return res.data;
                  }) );
    }
  }

  get_mostrar_informacion({ cliente,  nroOC,  fecha_ini,  fecha_fin , estado, detraccionPendiente }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('cliente', cliente );
    parametros = parametros.append('nroOrdenCompra', nroOC ); 
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 
    parametros = parametros.append('detracPendiente', detraccionPendiente ); 

    return this.http.get( this.URL + 'RegistroFacturas/registroFacturascab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_registroOT(objMantenimiento:any):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.post(this.URL + 'RegistroFacturas/post_saveRegistroFacturas', JSON.stringify(objMantenimiento), httpOptions);
  }

  get_buscarOrdenCompra(nroOC : string, posici  :string ): any{
    let parametros = new HttpParams();

    parametros = parametros.append('nroOC', nroOC );
    parametros = parametros.append('posic', posici ); 

    return this.http.get( this.URL + 'RegistroFacturas/buscarOrdenCompra' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_buscarOT(nroOT): any{
    let parametros = new HttpParams();

    parametros = parametros.append('nroOT', nroOT );
    return this.http.get( this.URL + 'RegistroFacturas/buscarOT' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_registroFacturaEdicion(IdTelefoniaDocumentos : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdTelefoniaDocumentos', IdTelefoniaDocumentos );
    return this.http.get( this.URL + 'RegistroFacturas/registroFacturasId' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_edit_registroFactura(objMantenimiento:any, id :number):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.put(this.URL + 'RegistroFacturas/put_editRegistroFacturas/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  get_descargarGrilla({ cliente,  nroOC,  fecha_ini,  fecha_fin , estado, detraccionPendiente }, idUsuario:string): any{
    let parametros = new HttpParams();

    parametros = parametros.append('cliente', cliente );
    parametros = parametros.append('nroOrdenCompra', nroOC ); 
    parametros = parametros.append('fecha_ini', fecha_ini );    
    parametros = parametros.append('fecha_fin', fecha_fin );
    parametros = parametros.append('estado', estado ); 
    parametros = parametros.append('usuario', idUsuario ); 
    parametros = parametros.append('detracPendiente', detraccionPendiente ); 

    return this.http.get( this.URL + 'RegistroFacturas/descargarGrilla_registroFacturas' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_anular_registroFacturas(IdTelefoniaDocumentos : number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdTelefoniaDocumentos', IdTelefoniaDocumentos );

    return this.http.get( this.URL + 'RegistroFacturas/anular_registroFactura' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_cobranzasCab(IdTelefoniaDocumentos : number ): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdTelefoniaDocumentos', IdTelefoniaDocumentos );

    return this.http.get( this.URL + 'RegistroFacturas/cobranzasCab' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  set_save_cobranzas(objMantenimiento:any):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.post(this.URL + 'RegistroFacturas/post_saveCobranzas', JSON.stringify(objMantenimiento), httpOptions);
  }

  set_edit_cobranzas(objMantenimiento:any, id :number):any{
    console.log(JSON.stringify(objMantenimiento))
    return this.http.put(this.URL + 'RegistroFacturas/put_editCobranzas/' + id , JSON.stringify(objMantenimiento), httpOptions);
  }

  set_eliminar_archivoCobranza(IdCobranza : number): any{
    let parametros = new HttpParams(); 
    parametros = parametros.append('IdCobranza', IdCobranza );

    return this.http.get( this.URL + 'RegistroFacturas/eliminar_archivoCobranza' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

 
  get_verificar_nroOT(descTurno:string){
    let parametros = new HttpParams();
    parametros = parametros.append('opcion', '1');
    parametros = parametros.append('filtro', descTurno);

    return this.http.get( this.URL + 'Mantenimientos' , {params: parametros}).toPromise();
  }

  //---- DETRACCIONES -----

  set_save_edit_detracciones({IdTelefoniaDocumentos, FechaPagoDetraccion, NroOperacionDetraccion, ImporteDetraccion, UsuarioCreacion}):any{

    let parametros = new HttpParams();
    parametros = parametros.append('IdTelefoniaDocumentos', IdTelefoniaDocumentos);
    parametros = parametros.append('FechaPagoDetraccion', FechaPagoDetraccion);
    parametros = parametros.append('NroOperacionDetraccion', NroOperacionDetraccion);
    parametros = parametros.append('ImporteDetraccion', ImporteDetraccion);
    parametros = parametros.append('UsuarioCreacion', UsuarioCreacion);
 
    return this.http.get( this.URL + 'RegistroFacturas/save_update_detracciones' , {params: parametros})
    .pipe(catchError((err) => throwError(err.message)));   
  }
 
  set_cerrarDetraccion(IdDocumento : number, idUsuario:string): any{
    let parametros = new HttpParams();
    parametros = parametros.append('IdDocumento', IdDocumento );
    parametros = parametros.append('IdUsuario', idUsuario );  

    return this.http.get( this.URL + 'RegistroFacturas/cerrar_detraccion' , {params: parametros})
                    .pipe(catchError((err) => throwError(err.message)));   
  }

  get_proveedorFactoring(){
    if (this.estadosRegistroFactura.length > 0) {
      return of( this.estadosRegistroFactura )
    }else{
  
      return this.http.get( this.URL + 'RegistroFacturas/proveedorFactoring')
                  .pipe(map((res:any)=>{
                 
                        this.estadosRegistroFactura = res.data;
                        return res.data;
                  }) );
    }
  }


    //---- FACTORING -----

    set_save_edit_factoring({IdTelefoniaDocumentos,   PubCCteRuCFactoring, PorComisionFactoring, ImporteFactoring, FechaRegistroFactoring, UsuarioCreacion}):any{

      let parametros = new HttpParams();
      parametros = parametros.append('IdTelefoniaDocumentos', IdTelefoniaDocumentos);
      parametros = parametros.append('PubCCteRuCFactoring', PubCCteRuCFactoring);
      parametros = parametros.append('PorComisionFactoring', PorComisionFactoring);
      parametros = parametros.append('ImporteFactoring', ImporteFactoring);
      parametros = parametros.append('FechaRegistroFactoring', FechaRegistroFactoring);
      parametros = parametros.append('UsuarioCreacion', UsuarioCreacion);
   
      return this.http.get( this.URL + 'RegistroFacturas/save_update_factoring' , {params: parametros})
      .pipe(catchError((err) => throwError(err.message)));   
    }

    set_cerrarFactoring(IdDocumento : number, idUsuario:string): any{
      let parametros = new HttpParams();
      parametros = parametros.append('IdDocumento', IdDocumento );
      parametros = parametros.append('IdUsuario', idUsuario );  
  
      return this.http.get( this.URL + 'RegistroFacturas/cerrar_factoring' , {params: parametros})
                      .pipe(catchError((err) => throwError(err.message)));   
    }

 
}
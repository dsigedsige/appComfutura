import { Injectable } from '@angular/core';
 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
 
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  URL = environment.URL_API;
  constructor(private http:HttpClient) { }

  upload_fileRequerimientos(idOt:number, idTipoDoc:number, file:any,  idusuario : string) {

    const formData = new FormData();
    formData.append('file', file);
    const filtro = 'idOt=' + idOt + '&idTipoDoc=' + idTipoDoc + '&idUsuario=' + idusuario ;

    return this.http.post(this.URL + 'TblTelefoniaOtCabs/guardarArchivosOT?' + filtro , formData)
                    .pipe(map( (res:any)=>{
                         const {Result } = res; 
                         return Result;
                    }) );
  }

  upload_fileOrdenCompra(idOC:number, idTipoDoc:number, file:any,  idusuario : string, esGanador : number) {

    const formData = new FormData();
    formData.append('file', file);
    const filtro = 'idOC=' + idOC + '&idTipoDoc=' + idTipoDoc + '&idUsuario=' + idusuario + '&Ganador=' + esGanador

    return this.http.post(this.URL + 'CotizacionOC/guardarArchivoOC?' + filtro , formData)
                    .pipe(map( (res:any)=>{
                         const {Result } = res; 
                         return Result;
                    }) );
  }

  upload_fileCobranza(IdCobranza:number, file:any,  idusuario : string) {

    const formData = new FormData();
    formData.append('file', file);
    const filtro = 'IdCobranza=' + IdCobranza + '&idUsuario=' + idusuario ;

    return this.http.post(this.URL + 'RegistroFacturas/guardarArchivosCobranza?' + filtro , formData)
                    .pipe(map( (res:any)=>{
                         const {Result } = res; 
                         return Result;
                    }) );
  }


  
  upload_fileDetracciones(IdDocumento :number, file:any,  idusuario : string) {

    const formData = new FormData();
    formData.append('file', file);
    const filtro = 'IdDocumento=' + IdDocumento + '&idUsuario=' + idusuario ;

    return this.http.post(this.URL + 'RegistroFacturas/guardarArchivoDetracciones?' + filtro , formData)
                    .pipe(map( (res:any)=>{
                         const {Result } = res; 
                         return Result;
                    }) );
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 

export class FuncionesglobalesService {

  constructor() { }

  formatoFecha(fecha : any) {

    var date = new Date(fecha); 
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();

    const fechaFormat =  (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y   ;

    return fechaFormat;
  }

  formatoFechaActual() {

    var date = new Date(); 
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();

    const fechaFormat =  (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y   ;

    return fechaFormat;
  }

  formatoFechaIngles(string) {
    var info = string.split('/').reverse().join('-');
    return info;
  }

  formatoSoloHoras(fecha:Date) {
    var time = new Date(fecha); 
    return time.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });
   }
  

  BorrarTodoArray( arreglo:any[] ):void{
    if(  arreglo.length > 0){
      arreglo.splice(0,arreglo.length + 1);
    }
  }

  obtenerTodos_IdPrincipal(listDatos:any, campoID:any){
    var listIDs :any[] = [];    
    for (let obj of listDatos) {
      listIDs.push(obj[""+campoID+""]);
    }
    return listIDs;
  }

  obtenerCheck_IdPrincipal(listDatos:any, campoID:any){
    var listIDs  :any[] = [];     
    for (let obj of listDatos) {
      if (obj.checkeado) {
       listIDs.push(obj[""+campoID+""]);
      }
    }
    return listIDs;
  }

  obtenerCheck_IdPrincipal_new(listDatos:any, campoID:any){
    var listIDs :any[] = [];     
    for (let obj of listDatos) {
      if (obj.marcado) {
       listIDs.push(obj[""+campoID+""]);
      }
    }
    return listIDs;
  }

  verificarCheck_marcado(listDatos:any):boolean{
   let flag_marco =false;
    for (let obj of listDatos) {
      if (obj.checkeado) {
        flag_marco = true;
        break;
      }
    }
    return flag_marco;
  }

  generarJsonDescargarlo(exportObj:string, exportName:string){
    ///https://es.stackoverflow.com/questions/197432/crear-un-bot%C3%B3n-para-descargar-informaci%C3%B3n?rq=1

    // this.generarJsonDescargarlo(myJSONObject,'LuisIncio');

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove(); 
  }

  verificar_soloNumeros(event: any){
    const pattern = /[0-9\+\-\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  verificar_soloNumeros_sinPunto(e){
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  verificar_tamanioArchivo(fileSize: number, maximoBytes : number ){
    if (fileSize > maximoBytes) {
      return true; 
    }else{
      return false; 
    } 
  }

  obtenerValorComboSelect2Multiples(listComboMultiple:any[],listCombo:any[],nombreID:string ){ 
    let listaRetorno:any=[]; 
        if(listComboMultiple.length == 1) {
            if(listComboMultiple[0]=='0'){
              for (const iterator of listCombo) {     
                listaRetorno.push(iterator[nombreID]);        
              }
            }else{
              listaRetorno= [...listComboMultiple];
            }
        }else{
          listaRetorno= listComboMultiple.filter(item => item != 0);       
        }
        return listaRetorno
   }

    horaActualSistema() { 
 
      let dn  = '';
      let HoraFormateada  = '';
      let MinutosFormateada  = '';
      let SegundosFormateada  = '';

      let fechaHoraActual = new Date()
      let Hora  = fechaHoraActual.getHours()
      let Minutos = fechaHoraActual.getMinutes()
      let Segundos = fechaHoraActual.getSeconds()
  
      dn = "a.m"

      if (Hora > 12) {
          dn = "p.m"
          Hora = Hora - 12
      }
      if (Hora == 0) Hora = 12
      /* Si la Hora, los Minutos o los Segundos son Menores o igual a 9, le añadimos un 0 */

      HoraFormateada = String(Hora);
      if (Hora <= 9) HoraFormateada = "0" + Hora

      MinutosFormateada =String(Minutos);
      if (Minutos <= 9) MinutosFormateada = "0" + Minutos

      SegundosFormateada = String(Segundos);
      if (Segundos <= 9) SegundosFormateada = "0" + Segundos
  
      /* En Reloj le indicamos la Hora, los Minutos y los Segundos */
      return HoraFormateada + ":" + MinutosFormateada + ":" + SegundosFormateada + " " + dn
  }

  codigoAleatorio (){
    return  Math.floor(Math.random() * 1000000);  
  }

  crearHorasMinutos_24Horas(){

    let tiempos :any[]=[]; 
  
    // Llenar el arreglo con los valores de tiempo
    let hora = 0;
    let minutos = 0;
    
    while (hora < 24) {

      const horaFormateada = hora.toString().padStart(2, '0');
      const minutosFormateados = minutos.toString().padStart(2, '0');
    
      tiempos.push({  id : `${horaFormateada}:${minutosFormateados}`,  value : `${horaFormateada}:${minutosFormateados}` });
    
      // Incrementar los minutos en 5
      minutos += 5;
    
      // Si los minutos llegan a 60, reiniciar a 0 y aumentar la hora
      if (minutos === 60) {
        minutos = 0;
        hora++;
      }
    }     

    return tiempos;
    
   }

  //----compara 2 matrices y retorna una matriz unica sin objetos repetidos
  compararMatrices(matrizOriginal, matrizComparar, valorComparar) {
    return matrizOriginal.filter((element) => {
      for (let i = 0; i < matrizComparar.length; i++) {
        if (element[valorComparar] === matrizComparar[i][valorComparar]) {
          return false; // Eliminar el elemento de la matriz original
        }
      }
      return true; // Mantener el elemento en la matriz original
    });
  }

    //----compara 2 matrices y retorna una matriz unica sin objetos repetidos
    compararMatrices_v2(matrizOriginal, matrizComparar, valorComparar) {
      return matrizOriginal.filter((element) => {
        for (let i = 0; i < matrizComparar.length; i++) {
          if (element === matrizComparar[i][valorComparar]) {
            return false; // Eliminar el elemento de la matriz original
          }
        }
        return true; // Mantener el elemento en la matriz original
      });
    }


// Eliminar registros duplicados basados en un campo especifico

  matrizElementosUnicos(matrizOriginal:any[]=[], nombreCampo:string) {
    return matrizOriginal.reduce(function(resultado, elemento) {
      if (!resultado.some(function(e) { return e[nombreCampo] === elemento[nombreCampo]; })) {
        resultado.push(elemento);
      }
      return resultado;
    }, []); 
  }
  


  

}

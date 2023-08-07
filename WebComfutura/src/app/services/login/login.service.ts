import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
 

export class LoginService {

  usuarioLogeado:boolean=false;
  dataLogeado :any[]= [];
  isLogginUser$ = new Subject<any>();
  moduloSeleccionado$ = new Subject<number>();
  homeSeleccionado$ = new Subject<boolean>();

  idModulo=0;

   URL = environment.URL_API;
   constructor(private http:HttpClient) { }
         //-----creando el observable --

  updateLoginNameStatus(status: boolean, objMenu: any ) {
    var objSesion = {
      'status':status,
      'menu':objMenu
    }
    this.isLogginUser$.next(objSesion);
  }  

  get_iniciarSesion(nombreUsuario:string , contrasenia:string){    
    let parametros = new HttpParams();
    parametros = parametros.append('login', nombreUsuario);
    parametros = parametros.append('constrasenia', contrasenia );

    return this.http.get( this.URL + 'Login/IniciarSesion/' , {params: parametros})
               .pipe(map((res:any)=>{     
 
                    if (res.ok ==true || res.ok == 'true' ) {      
                      let infoUser = {
                        id_usuario:res.data.id_usuario,                        
                        nombre_usuario : res.data.nombre_usuario,
                        login_usuario : res.data.login_usuario,
                        menu_permisos : res.data.menuPermisos,
 
                      }                      
                      this.guardarSesion(infoUser);
                      return res;
                    }else{
                      return res;
                    }
               }));               
  }

  public guardarSesion(data:any){
    this.usuarioLogeado =true;
    localStorage.setItem('data_ComFutura_user', JSON.stringify(data));
    this.updateLoginNameStatus(true,data.menu_permisos); 
  }

  leerSesion(){    
   // si es que existe una  variable creada en el local storage, leemos su valor
    if (localStorage.getItem('data_ComFutura_user')) { 
      this.usuarioLogeado =true;
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
    }else{  
      this.usuarioLogeado =false;
      this.dataLogeado = [];
    }
  } 

  logOut(){
    this.usuarioLogeado= false;
    localStorage.removeItem('data_ComFutura_user');
    localStorage.removeItem('GestionOT_idModulo');
  }
  
  homePrincipal(){
    localStorage.removeItem('GestionOT_idModulo');
  }

  getSession(){
    if (localStorage.getItem('data_ComFutura_user')) { 
      return true;
    }else{
      return false;
    }
  }
  getSessionNombre(){
    if (localStorage.getItem('data_ComFutura_user')) { 
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['nombre_usuario'];
    }else{
      return "Sin-nombre";
    }
  }

  getSessionMenu(){
    if (localStorage.getItem('data_ComFutura_user')) { 
      this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['menu_permisos'];
    }else{
      return null;
    }
  }
 
  estadoAutentificado(){
    this.leerSesion();
    return  this.usuarioLogeado;
  }

  get_idUsuario():string{
    if (localStorage.getItem('data_ComFutura_user')) { 
       this.dataLogeado =JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['id_usuario'];
    }else{
      return '0';
    }
  }

  get_loginUsuario():string{
    if (localStorage.getItem('data_ComFutura_user')) { 
       this.dataLogeado =JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['login_usuario'];
    }else{
      return '0';
    }
  }

  get_idPerfil():number{
    if (localStorage.getItem('data_ComFutura_user')) { 
       this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['id_perfil'];
    }else{
      return 0;
    }
  }

  getEventosMenu(itemMenu:number){ 
    if (localStorage.getItem('data_ComFutura_user')) { 
      this.dataLogeado = JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      const listEventos = this.dataLogeado['menu_eventos'].filter(evento => evento.id_opcion == itemMenu);
      return listEventos
    }else{
      return null;
    }
  }

  getModulos(){ 
    if (localStorage.getItem('data_ComFutura_user')) {  
      const listModulos = this.dataLogeado['menu_permisos'].map(modulo =>{
          return  { id_opcion : modulo.id_opcion, nombre_principal:  modulo.nombre_principal , urlmagene_principal : modulo.urlmagene_principal}
      });
      return listModulos ;
    }else{
      return null;
    }
  }

  getMenu_Modulos(idModulo){ 
    if (localStorage.getItem('data_ComFutura_user')) {  
   
      //-----almacenando el idModulo elegido ---
      localStorage.setItem('GestionOT_idModulo', idModulo );
      //----- Fin almacenando el idModulo elegido ---
      const listMenus =  this.dataLogeado['menu_permisos'].filter(modulo => modulo.id_opcion == idModulo).map( menuItem => menuItem['listMenu'] );
      return listMenus ;

    }else{
      this.idModulo = 0;
      return null;      
    }
  }

  getIdModulo(){
    if (localStorage.getItem('GestionOT_idModulo')) {  
      this.idModulo = JSON.parse(localStorage.getItem("GestionOT_idModulo")|| '0');
      return this.idModulo ;
    }else{
      this.idModulo = 0;
      return this.idModulo ;
    }
  }

  get_idProveedor():number{
    if (localStorage.getItem('data_ComFutura_user')) { 
       this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['id_proveedor'];
    }else{
      return 0;
    }
  }

  get_observacionProveedor(): string{
    if (localStorage.getItem('data_ComFutura_user')) { 
       this.dataLogeado =  JSON.parse(localStorage.getItem("data_ComFutura_user")|| '[]');
      return this.dataLogeado['observacion_usuario'];
    }else{
      return '';
    }
  }

  set_idModulo(idModulo){ 
    if (localStorage.getItem('data_ComFutura_user')) {        
      //-----almacenando el idModulo elegido ---
      localStorage.setItem('GestionOT_idModulo', idModulo );
      //----- Fin almacenando el idModulo elegido ---
    }else{
      localStorage.setItem('GestionOT_idModulo', '0' );    
    }
  }

  

}

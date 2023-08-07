 


import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../services/login/login.service';
 
 
import { RespuestaServer } from '../../../../../models/respuestaServer.models';
import { Subscription, combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
 
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RegistroOTService } from 'src/app/services/requerimientos/procesos/registroOT.service';
import Swal from 'sweetalert2';
 
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { RegistroSolicitudService } from 'src/app/services/requerimientos/procesos/registroSolicitud.service';

declare var $:any;

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.css']
})
export class RegistroSolicitudComponent implements OnInit, OnDestroy {
  formParamsFiltro : FormGroup;
  formParams: FormGroup;

  idUserGlobal :string = '';
  loginUserGlobal :string = '';
  flag_modoEdicion :boolean =false;
  datepiekerConfig:Partial<BsDatepickerConfig>

  locales :any[]=[]; 
  filtrarProceso = "";
  departamentos :any[]=[]; 
  provincias :any[]=[]; 

  IdSolicitud_Global = 0;
 
  estados :any[]=[]; 
  registroSolicitudCab :any[]=[]; 
  proyectos :any[]=[]; 
  tiposTrabajo:any[]=[]; 
  areas:any[]=[]; 
  flag_verEstado_Global :boolean = false;
  horasMinutos:any[]=[]; 
  tabsDisabled= false;
  private formSolicitudSubcription : Subscription;
  
  @ViewChild('staticTabsPrincipal', { static: false }) staticTabsPrincipal: TabsetComponent;
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroOTService : RegistroOTService, private registroSolicitudService : RegistroSolicitudService  ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
    this.loginUserGlobal = this.loginService.get_loginUsuario();
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.getCargarCombos();
   this.horasMinutos = this.funcionGlobalServices.crearHorasMinutos_24Horas();

   this.formSolicitudSubcription = this.registroSolicitudService.flagTabsDisabledSolicitud$.subscribe(()=>{
     this.tabsDisabled =true;
  })

 }

 ngOnDestroy() {
  this.formSolicitudSubcription.unsubscribe(); 
}


 inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      departamento : new FormControl('0'),  
      provincia : new FormControl('0'),  
      nroRequerimiento  : new FormControl(''),  
      fecha_ini : new FormControl(new Date()),   
      fecha_fin : new FormControl(new Date()),  
      estado : new FormControl('0') 
    }) 
  }

  inicializarFormulario(){ 
    this.formParams= new FormGroup({
      IdSolicitud : new FormControl('0'), 
      IdPresupuesto : new FormControl('0'), 
      NroPresupuesto : new FormControl('C_HE_IG_Del_CW_2023_001_2023002'), 
      NroSolicitud : new FormControl(''),  
      FechaSolicitud : new FormControl(new Date()),  
      
      IdOt: new FormControl('0'), 
      NroOT : new FormControl(''), 
      NombreSite : new FormControl(''), 

      IdProyectoTelefonia: new FormControl('0'),  
      IdTipoTrabajoTelefonia: new FormControl('0'),  
 
      Estado: new FormControl('318'),  
      UsuarioCreacion: new FormControl(this.idUserGlobal),         
    }) 
 }


  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_departamentos() , this.combosService.get_estadosSolicitud() ,  this.combosService.get_proyectos() ,this.combosService.get_tiposTrabajos()
    ])
    .subscribe( ([ _departamentos, _estados, _proyectos, _tiposTrabajo ])=>{     
      this.spinner.hide();   
      this.departamentos = _departamentos;
      this.estados = _estados; 
      this.proyectos = _proyectos; 
      this.tiposTrabajo = _tiposTrabajo;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }

  changeDepartamento(opcion:any ){
    if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
      this.provincias = [];
      this.formParamsFiltro.patchValue({"provincia": '0', "distrito": '0'});      
      return;
    }     
    this.mostrarProvinciasDepartamentos(opcion.target.value );
  }

  mostrarProvinciasDepartamentos(idDepartamento:number ){ 
    this.spinner.show();
    this.registroOTService.get_provincias(idDepartamento, this.idUserGlobal)
      .subscribe((res:RespuestaServer)=>{  
        this.spinner.hide();      
        if (res.ok ==true) {      
            this.provincias = res.data;  
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },
      (error) => {    
        this.spinner.hide(); 
        alert(JSON.stringify(error));
      })
  }  
 

 mostrarInformacion(){ 

  // if (this.formParamsFiltro.value.departamento == '0' || this.formParamsFiltro.value.departamento == 0 ) {
  //   this.alertasService.Swal_alert('error','Por favor seleccione la Region ');
  //   return 
  // } 
  // if (this.formParamsFiltro.value.provincia == '0' || this.formParamsFiltro.value.provincia == 0 ) {
  //   this.alertasService.Swal_alert('error','Por favor seleccione la Provincia ');
  //   return 
  // } 
  if (this.formParamsFiltro.value.fecha_ini == '' || this.formParamsFiltro.value.fecha_ini == null ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha Inicial ');
    return 
  } 
  if (this.formParamsFiltro.value.fecha_fin == '' || this.formParamsFiltro.value.fecha_fin == null ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha Final ');
    return 
  } 
 
  const fechaI = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_ini);
  const fechaF = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_fin);

    this.spinner.show();
    this.registroSolicitudService.get_mostrar_informacion({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.registroSolicitudCab = res.data;
      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }  

 nuevo(){

     this.flag_verEstado_Global = true;
     this.IdSolicitud_Global = 0;
     this.flag_modoEdicion = false;
     this.tabsDisabled = false;
     this.inicializarFormulario();     

    setTimeout(()=>{ // 
      $('#modal_proceso').modal('show');  
    },0); 

 } 

  cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_proceso').modal('hide');  
    },0); 
  }
  
  keyPress(event: any) { 
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }
  
  buscarInformacionPresupuesto(){

    let nroPresupuesto= this.formParams.value.NroPresupuesto;

    if(nroPresupuesto == '' || nroPresupuesto == null || nroPresupuesto == undefined ){
      this.alertasService.Swal_alert('error', 'Por favor ingrese el Nro Presupuesto luego presione la tecla Enter');
      return 
    }
 
    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
    })
    Swal.showLoading();
    this.registroSolicitudService.get_buscarInformacionPresupuesto(  nroPresupuesto ).subscribe((res: RespuestaServer) => {
      Swal.close();
      if (res.ok) {
        if (res.data.length ==0) {
          this.alertasService.Swal_alert('info', 'No se encontro informacion con el Nro Presupuesto ingresado, verifique..');
          this.formParams.patchValue({"IdPresupuesto" : '' , "IdOt": '' , "NroOT" : ''  , "IdProyectoTelefonia" : '0'  , "NombreSite" : ''   , "IdTipoTrabajoTelefonia" : '0' });

        }else{
          const { IdPresupuesto, IdOt, nro_Ot, nombreSite, IdProyectoTelefonia, IdTipoTrabajoTelefonia } = res.data[0];
          this.formParams.patchValue({"IdPresupuesto" : IdPresupuesto,  "IdOt": IdOt , "NroOT" : nro_Ot  , "IdProyectoTelefonia" : IdProyectoTelefonia  , "NombreSite" : nombreSite   , "IdTipoTrabajoTelefonia" : IdTipoTrabajoTelefonia });
        }
      } else {
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })  
  }
 
 async saveUpdate(){ 

  if (this.formParams.value.NroPresupuesto == '' || this.formParams.value.NroPresupuesto == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Nro Presupuesto y presione enter para buscar..');
    return 
  }
  if (this.formParams.value.FechaSolicitud == '' || this.formParams.value.FechaSolicitud == null) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha de Requerimiento');
    return 
  } 
  
  if (this.formParams.value.IdOt == '0' || this.formParams.value.IdOt == 0) {
    this.alertasService.Swal_alert('error','Por favor ingrese el  Nro Presupuesto y presione enter para buscar..');
    return 
  }  
  
  if (this.formParams.value.Estado == '0' || this.formParams.value.Estado == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Estado');
    return 
  }

  if (this.formParams.value.Estado != '318' && this.formParams.value.Estado != '323' ) {
    this.alertasService.Swal_alert('error','Solo se puede elegir el Estado Registrado o Anulado, desde este formulario');
    return 
  }
 
   this.formParams.patchValue({ "UsuarioCreacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicion==false) { //// nuevo  

    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    Swal.showLoading(); 
    this.registroSolicitudService.set_save_registroSolicitud(this.formParams.value)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {  

          const {IdSolicitud,NroSolicitud } = res.data;
 
          this.flag_modoEdicion = true;
          this.IdSolicitud_Global = IdSolicitud;
          this.formParams.patchValue({"NroSolicitud" : NroSolicitud });

          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se agrego correctamente..');

          setTimeout(()=>{ // 
             this.staticTabsPrincipal.tabs[0].active = true;
             this.registroSolicitudService.fichasResumenSolicitud$.emit(true);  
          },0); 
 
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },
      (error) => {    
        Swal.close();  
        alert(JSON.stringify(error));
      })
     
   }else{ /// editar

     Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
     Swal.showLoading();    
    this.registroSolicitudService.set_edit_registroSolicitud(this.formParams.value , this.formParams.value.IdSolicitud)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {     
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se actualizo correctamente..');
 
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },
      (error) => {    
        Swal.close();  
        alert(JSON.stringify(error));
      })
   }
 } 
 
 editar({IdSolicitud, NroSolicitud, IdPresupuesto, NroPresupuesto, FechaSolicitud, IdOt, NroOT, Site, IdProyectoTelefonia,IdTipoTrabajoTelefonia, Estado}){ 

      this.flag_modoEdicion = true;
      this.IdSolicitud_Global = IdSolicitud;
      this.flag_verEstado_Global = (Estado == 318 || Estado == 323)? true:false;

      this.formParams= new FormGroup({
        IdSolicitud : new FormControl(IdSolicitud), 
        IdPresupuesto : new FormControl(IdPresupuesto), 
        NroPresupuesto : new FormControl(NroPresupuesto), 
        NroSolicitud : new FormControl(NroSolicitud),  
        FechaSolicitud : new FormControl(new Date(FechaSolicitud)),  
        
        IdOt: new FormControl(IdOt), 
        NroOT : new FormControl(NroOT), 
        NombreSite : new FormControl(Site), 
  
        IdProyectoTelefonia: new FormControl(IdProyectoTelefonia),  
        IdTipoTrabajoTelefonia: new FormControl(IdTipoTrabajoTelefonia),  
   
        Estado: new FormControl(Estado),  
        UsuarioCreacion: new FormControl(this.idUserGlobal),        
      }) 
 
      setTimeout(()=>{ // 
        $('#modal_proceso').modal('show');  
        ///- notificando al servicio (componente hijo) 
        this.staticTabsPrincipal.tabs[0].active = true;
        this.tabsDisabled = false;
        this.registroSolicitudService.fichasSolicitud$.emit(true);  
        this.registroSolicitudService.fichasResumenSolicitud$.emit(true);  
      },0); 
 
 } 

 anular(objBD:any){

   this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
   .then((result)=>{
     if(result.value){

        Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
        Swal.showLoading();    
       this.registroSolicitudService.set_anular_solicitud(objBD.IdSolicitud, this.idUserGlobal).subscribe((res:RespuestaServer)=>{
           Swal.close();        
           if (res.ok ==true) { 
             
             for (const item of this.registroSolicitudCab) {
               if (item.IdSolicitud == objBD.IdSolicitud ) {
                   item.Estado = 323;
                   item.descripcionEstado = 'ANULADO';
                   break;
               }
             }
             this.alertasService.Swal_Success('Se anulo correctamente..')  
      
           }else{
             this.alertasService.Swal_alert('error', JSON.stringify(res.data));
             alert(JSON.stringify(res.data));
           }
          },
          (error) => {    
            this.spinner.hide(); 
            alert(JSON.stringify(error));
          })  

     }
    }) 
 }

 descargarGrilla(){ 
 
  if (this.formParamsFiltro.value.departamento == '0' || this.formParamsFiltro.value.departamento == 0 ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Region ');
    return 
  } 
  if (this.formParamsFiltro.value.provincia == '0' || this.formParamsFiltro.value.provincia == 0 ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Provincia ');
    return 
  } 
  if (this.formParamsFiltro.value.fecha_ini == '' || this.formParamsFiltro.value.fecha_ini == null ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha Inicial ');
    return 
  } 
  if (this.formParamsFiltro.value.fecha_fin == '' || this.formParamsFiltro.value.fecha_fin == null ) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha Final ');
    return 
  } 
 
  const fechaI = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_ini);
  const fechaF = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_fin);

    this.spinner.show();
    this.registroSolicitudService.get_descargarGrilla({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
    .subscribe((res:any)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
        console.log(res.data);
        window.open(res.data, "_blank" );
      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })

}





selectTab(data: TabDirective){   

  const nameTab = data.heading;  

     switch (nameTab) {
       case 'RESUMEN':  
         setTimeout(()=>{ //  
             this.registroSolicitudService.fichasResumenSolicitud$.emit(true); 
          },0);
       break;
       case 'CONTRATISTAS':  
         setTimeout(()=>{ //  
          this.registroSolicitudService.fichasResumenSolicitud$.emit(true); 
        },0);
       break;           
       default:
         break;
     }
}


}

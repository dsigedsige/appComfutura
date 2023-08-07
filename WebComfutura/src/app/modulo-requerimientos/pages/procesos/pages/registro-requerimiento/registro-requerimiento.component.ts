import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../services/login/login.service';
 
 
import { RespuestaServer } from '../../../../../models/respuestaServer.models';
import { combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
 
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RegistroOTService } from 'src/app/services/requerimientos/procesos/registroOT.service';
import Swal from 'sweetalert2';
import { RegistroRequerimientoService } from 'src/app/services/requerimientos/procesos/registroRequerimiento.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';

declare var $:any;

@Component({
  selector: 'app-registro-requerimiento',
  templateUrl: './registro-requerimiento.component.html',
  styleUrls: ['./registro-requerimiento.component.css']
})
 
export class RegistroRequerimientoComponent implements OnInit {
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

  IdRequerimiento_Global = 0;
 
  estados :any[]=[]; 
  registroRequerimiento :any[]=[]; 
  proyectos :any[]=[]; 
  tiposTrabajo:any[]=[]; 
  areas:any[]=[]; 
  flag_verEstado_Global :boolean = false;
  horasMinutos:any[]=[]; 
 
  @ViewChild('staticTabsPrincipal', { static: false }) staticTabsPrincipal: TabsetComponent;
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroOTService : RegistroOTService, private registroRequerimientoService : RegistroRequerimientoService  ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
    this.loginUserGlobal = this.loginService.get_loginUsuario();
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.getCargarCombos();
   this.horasMinutos = this.funcionGlobalServices.crearHorasMinutos_24Horas();
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
      IdRequerimiento: new FormControl('0'),  
      NroRequerimiento: new FormControl(''),  
      FechaCosto: new FormControl(new Date()),  
      HoraCosto: new FormControl('0'),  

      IdProyectoTelefonia: new FormControl('0'),  
      IdTipoTrabajoTelefonia: new FormControl('0'),  
      IdAreaTelefonia: new FormControl('0'), 
      
      IdOt: new FormControl('0'), 
      NroOT : new FormControl(''), 
      NombreSite : new FormControl(''), 

      TiempoEjecucion: new FormControl(''),  
      Estado: new FormControl('306'),  
      UsuarioCreacion: new FormControl(this.idUserGlobal),         
    }) 
 }


  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_departamentos() , this.combosService.get_estadosRequerimiento() ,  this.combosService.get_proyectos() ,
      this.combosService.get_tiposTrabajos(), this.combosService.get_areas() 
    ])
    .subscribe( ([ _departamentos, _estados, _proyectos, _tiposTrabajo, _areas ])=>{     
      this.spinner.hide();   
      this.departamentos = _departamentos;
      this.estados = _estados; 
      this.proyectos = _proyectos; 
      this.tiposTrabajo = _tiposTrabajo,
      this.areas = _areas
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
    this.registroRequerimientoService.get_mostrar_informacion({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.registroRequerimiento = res.data;
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
     this.IdRequerimiento_Global = 0;
     this.flag_modoEdicion = false;
     this.inicializarFormulario();     

    setTimeout(()=>{ // 
      $('#modal_proceso').modal('show');  
      // this.staticTabsPrincipal.tabs[0].active = true;
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

  
  
  buscarInformacionOT(){

    let nroOt= this.formParams.value.NroOT;

    if(nroOt == '' || nroOt == null || nroOt == undefined ){
      this.alertasService.Swal_alert('error', 'Por favor ingrese el Nro Ot luego presione la tecla Enter');
      return 
    }
 
    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
    })
    Swal.showLoading();
    this.registroRequerimientoService.get_buscarInformacionOT(  nroOt ).subscribe((res: RespuestaServer) => {
      Swal.close();
      if (res.ok) {
            console.log(res.data);

            if (res.data.length ==0) {
              this.alertasService.Swal_alert('info', 'No se encontro informacion con el Nro OT ingresado, verifique..');
              this.formParams.patchValue({"IdOt": '0' , "NroOT" : ''  , "IdProyectoTelefonia" : '0'  , "NombreSite" : '' , "NroRequerimiento" : '' });

            }else{
              const { id_Ot, nro_Ot, nombre_Ot, nombreSite, ges_proy_Codigo, Ges_Proy_Descripcion } = res.data[0];

              let correlativo = this.generarCorrelativo(  this.loginUserGlobal,Ges_Proy_Descripcion, nro_Ot);

              this.formParams.patchValue({"IdOt": id_Ot , "NroOT" : nro_Ot  , "IdProyectoTelefonia" : ges_proy_Codigo  , "NombreSite" : nombreSite   , "NroRequerimiento" : correlativo });


            }

      } else {
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })  
  }

  generarCorrelativo(userLogin:string, Ges_Proy_Descripcion:string, nro_Ot :string){

    let nombre = (!userLogin)? '' : this.loginUserGlobal.substring(0, 1);
    let apellido = (!userLogin)? '' : this.loginUserGlobal.substring(2, 1);

    return  'C_'+ nombre + '_' + apellido + '_' + Ges_Proy_Descripcion + '_' + nro_Ot;

  }

 
 async saveUpdate(){ 

  if (this.formParams.value.NroOT == '' || this.formParams.value.NroOT == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Nro OT y presione enter para buscar..');
    return 
  }


  if (this.formParams.value.FechaCosto == '' || this.formParams.value.FechaCosto == null) {
    this.alertasService.Swal_alert('error','Por favor seleccione la fecha de Costo');
    return 
  } 
  if (this.formParams.value.HoraCosto == '0' || this.formParams.value.HoraCosto == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Hora');
    return 
  } 

  if (this.formParams.value.NroRequerimiento == '' || this.formParams.value.NroRequerimiento == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nro de Costo');
    return 
  } 

  if (this.formParams.value.IdOt == '0' || this.formParams.value.IdOt == 0) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Nro OT y presione enter para buscar..');
    return 
  } 
  if (this.formParams.value.IdProyectoTelefonia == '0' || this.formParams.value.IdProyectoTelefonia == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Area');
    return 
  } 
  if (this.formParams.value.TiempoEjecucion == '0' || this.formParams.value.TiempoEjecucion == 0 || this.formParams.value.TiempoEjecucion == '' || this.formParams.value.TiempoEjecucion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el tiempo de ejecucion');
    return 
  } 
  if (this.formParams.value.Estado == '0' || this.formParams.value.Estado == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Estado');
    return 
  }

  if (this.formParams.value.Estado != '306' && this.formParams.value.Estado != '307' ) {
    this.alertasService.Swal_alert('error','Solo se puede elegir el Estado Registrado o Anulado, desde este formulario');
    return 
  }
 
   this.formParams.patchValue({ "UsuarioCreacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicion==false) { //// nuevo  

  //   const  nroOT :any  = await this.registroOTService.get_verificar_nroOT(this.formParams.value.nro_contrato);
  //   if (descDist.ok) {
  //    Swal.close();
  //    this.alertasService.Swal_alert('error','El Nro Contrato ya se encuentra Registrada, verifique..');
  //    return;
  //  }  
 
    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    Swal.showLoading(); 
    this.registroRequerimientoService.set_save_registroRequerimiento(this.formParams.value)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {  
 
          this.flag_modoEdicion = true;
          this.IdRequerimiento_Global = res.data;
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se agrego correctamente..');

          setTimeout(()=>{ // 
             this.staticTabsPrincipal.tabs[0].active = true;
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
    this.registroRequerimientoService.set_edit_registroRequerimiento(this.formParams.value , this.formParams.value.IdRequerimiento)
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
 
 editar({IdRequerimiento, NroRequerimiento, FechaCosto, HoraCosto, IdProyectoTelefonia, Proyecto, IdTipoTrabajoTelefonia, TipoTrabajo, IdAreaTelefonia, 
           Area, IdOt, NroOT, Site, TiempoEjecucion, Estado, descripcionEstado}){ 

      this.flag_modoEdicion = true;
      this.IdRequerimiento_Global = IdRequerimiento;
      this.flag_verEstado_Global = (Estado == 306 || Estado == 307)? true:false;

      this.formParams= new FormGroup({
        IdRequerimiento: new FormControl(IdRequerimiento),  
        NroRequerimiento: new FormControl(NroRequerimiento),  
        FechaCosto: new FormControl( new Date(FechaCosto)),  
        HoraCosto: new FormControl(HoraCosto),  
  
        IdProyectoTelefonia: new FormControl(IdProyectoTelefonia),  
        IdTipoTrabajoTelefonia: new FormControl(IdTipoTrabajoTelefonia),  
        IdAreaTelefonia: new FormControl(IdAreaTelefonia), 
        
        IdOt: new FormControl(IdOt), 
        NroOT : new FormControl(NroOT), 
        NombreSite : new FormControl(Site), 
  
        TiempoEjecucion: new FormControl(TiempoEjecucion),  
        Estado: new FormControl(Estado),  
        UsuarioCreacion: new FormControl(this.idUserGlobal),         
      }) 
 
      setTimeout(()=>{ // 
        $('#modal_proceso').modal('show');  
        ///- notificando al servicio (componente hijo) para indicar que muestre el modal -+---
        this.registroRequerimientoService.fichasRequerimiento$.emit(true); 
        this.staticTabsPrincipal.tabs[0].active = true;
      },0); 
 
 } 

 anular(objBD:any){

   this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
   .then((result)=>{
     if(result.value){

        Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
        Swal.showLoading();    
       this.registroRequerimientoService.set_anular_registroRequerimiento(objBD.IdRequerimiento, this.idUserGlobal).subscribe((res:RespuestaServer)=>{
           Swal.close();        
           if (res.ok ==true) { 
             
             for (const item of this.registroRequerimiento) {
               if (item.IdRequerimiento == objBD.IdRequerimiento ) {
                   item.Estado = 307;
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
    this.registroRequerimientoService.get_descargarGrilla({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
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
       case 'CRONOGRAMA':
        setTimeout(()=>{ // 
 
          // alert('tab 0')
        },0);
       break;
       case 'RESUMEN':  
         setTimeout(()=>{ //  
             this.registroRequerimientoService.fichasResumenRequerimiento$.emit(true); 
          },0);
       break;
       case 'Anomalias':  
         setTimeout(()=>{ // 
 
          // alert('tab 2')
        },0);
       break;           
       default:
         break;
     }
}


}

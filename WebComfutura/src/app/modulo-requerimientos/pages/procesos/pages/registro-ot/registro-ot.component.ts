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
 
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { InputFileI } from 'src/app/models/inputFile.models';
import { UploadService } from 'src/app/services/upload/upload.service';

declare var $:any;
@Component({
  selector: 'app-registro-ot',
  templateUrl: './registro-ot.component.html',
  styleUrls: ['./registro-ot.component.css']
})
 
export class RegistroOTComponent implements OnInit {

  formParamsFiltro : FormGroup;
  formParams: FormGroup;
  formParamsFile : FormGroup;

  idUserGlobal :string = '';
  flag_modoEdicion :boolean =false;
  datepiekerConfig:Partial<BsDatepickerConfig>

  locales :any[]=[]; 
  filtrarMantenimiento = "";
  departamentos :any[]=[]; 
  provincias :any[]=[]; 
  distritos :any[]=[]; 
  estados :any[]=[]; 
  estadosModal :any[]=[]; 


  registroOT :any[]=[]; 
  provinciasModal :any[]=[]; 
  distritosModal :any[]=[]; 

  proyectos :any[]=[]; 
  clientes :any[]=[]; 

  coordinadores :any[]=[]; 
  jefaturas :any[]=[]; 
  liquidadores :any[]=[]; 
  ejecutantes :any[]=[]; 
  analistas :any[]=[]; 

  tiposDocumentos :any[]=[]; 
  registroOT_archivos :any[]=[]; 
  filesOT:InputFileI[] = [];

  flag_verEstado_Global :boolean = false;

  IdOt_Global :number = 0;
 
  @ViewChild('staticTabsPrincipal', { static: false }) staticTabsPrincipal: TabsetComponent;
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroOTService : RegistroOTService , private uploadService : UploadService ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.inicializarFormularioArchivos();
   this.getCargarCombos();
 }



 inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      departamento : new FormControl('0'),  
      provincia : new FormControl('0'),  
      distrito  : new FormControl('0'),  
      fecha_ini : new FormControl(new Date()),   
      fecha_fin : new FormControl(new Date()),  
      estado : new FormControl('0') 
    }) 
  }

  inicializarFormulario(){ 
    this.formParams= new FormGroup({
 
      IdOt: new FormControl('0'), 
        NroOt: new FormControl(''), 
        NombreOt: new FormControl(''), 
        GesProyCodigo: new FormControl('0'), 

        IdTipoTrabajoTelefonia: new FormControl(''), //---F-
        IdAreaTelefonia: new FormControl(''), //---F-

        NombreSite: new FormControl(''), 
        NumeroIdOt: new FormControl(''), 
        
        IdRegion: new FormControl('0'), 
        IdProvincia: new FormControl('0'), 
        IdDistrito: new FormControl('0'), 

        FechaApertura: new FormControl( new Date()), 
        PubCcteRucCliente: new FormControl('0'), 
        JefeClienteSolicitante: new FormControl(''), 
        AnalistaClienteSolicitante: new FormControl(''),

        IdPersonalCoodinador: new FormControl('0'), //---F-
        IdPersonalJefeResponsable: new FormControl('0'), //---F-

        IdPersonalLiquidador: new FormControl('0'), 
        IdPersonalEjecutante: new FormControl('0'), 
        IdPersonalContable: new FormControl('0'), 

        Estado: new FormControl('300'),     
        UsuarioCreacion: new FormControl(this.idUserGlobal), 
        
    }) 
 }

 
 inicializarFormularioArchivos(){

  this.formParamsFile= new FormGroup({
      tipoDocumento : new FormControl('0'),
      file: new FormControl(''),
      valorFecha : new FormControl( new Date()),
   })
 }


  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_departamentos() , this.combosService.get_estadosRegistroOT() ,  this.combosService.get_proyectos() ,  this.combosService.get_clientes() ,  
          this.combosService.get_personales() , this.combosService.get_tiposDocumentos() 
    ])
    .subscribe( ([ _departamentos, _estados, _proyectos, _clientes, _personales, _tiposDocumentos ])=>{     
      this.spinner.hide();   
      this.departamentos = _departamentos;
      this.estados = _estados;
      this.estadosModal = _estados.filter(e => e.id == '300' || e.id =='301' )
      this.proyectos = _proyectos;
      this.clientes = _clientes;
      this.coordinadores = _personales;
      this.jefaturas = _personales;
      this.liquidadores = _personales;
      this.ejecutantes = _personales;
      this.analistas = _personales;
      this.tiposDocumentos = _tiposDocumentos;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }

  changeDepartamento(opcion:any ){
    if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
      this.provincias = [];
      this.distritos = [];
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

  changeProvincia(opcion:any ){
    if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
      this.distritos = [];
      this.formParamsFiltro.patchValue({"distrito": '0'});       
      return;
    }     
    this.mostrarDistritosProvincias( this.formParamsFiltro.value.departamento,  opcion.target.value );
  }
  
  mostrarDistritosProvincias(idDepartamento:number , idProvincia:number){ 
    this.spinner.show();
    this.registroOTService.get_distritos(idDepartamento, idProvincia)
      .subscribe((res:RespuestaServer)=>{  
        this.spinner.hide();      
        if (res.ok ==true) {      
            this.distritos = res.data;  
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
    this.registroOTService.get_mostrar_informacion({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.registroOT = res.data;
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
  

// --- modal

changeDepartamentoModal(opcion:any ){
  if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
    this.provinciasModal = [];
    this.distritosModal = [];
    this.formParams.patchValue({"IdProvincia": '0', "IdDistrito": '0'});      
    return;
  }     
  this.mostrarProvinciasDepartamentosModal(opcion.target.value );
}


mostrarProvinciasDepartamentosModal(idDepartamento:number ){ 
  this.spinner.show();
  this.registroOTService.get_provincias(idDepartamento, this.idUserGlobal)
    .subscribe((res:RespuestaServer)=>{  
      this.spinner.hide();      
      if (res.ok ==true) {      
          this.provinciasModal = res.data;  
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

changeProvinciaModal(opcion:any ){
  if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
    this.distritosModal = [];
    this.formParams.patchValue({"IdDistrito": '0'});       
    return;
  }     
  this.mostrarDistritosProvinciasModal( this.formParams.value.IdRegion,  opcion.target.value );
}

mostrarDistritosProvinciasModal(idDepartamento:number , idProvincia:number){ 
  this.spinner.show();
  this.registroOTService.get_distritos(idDepartamento, idProvincia)
    .subscribe((res:RespuestaServer)=>{  
      this.spinner.hide();      
      if (res.ok ==true) {      
          this.distritosModal = res.data;  
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

 nuevo(){

     this.IdOt_Global = 0;
     this.flag_verEstado_Global = true;
     this.flag_modoEdicion = false;
     this.inicializarFormulario();     
     this.inicializarFormularioArchivos();
     this.registroOT_archivos = [];

    setTimeout(()=>{ // 
      $('#modal_proceso').modal('show');  
      this.staticTabsPrincipal.tabs[0].active = true;
    },0); 

 } 

 cerrarModal_almacen(){
  setTimeout(()=>{ // 
    $('#modal_almacen').modal('hide');  
  },0); 
}

 cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_proceso').modal('hide');  
    },0); 
  }
 
 async saveUpdate(){ 

  if (this.formParams.value.NroOt == '' || this.formParams.value.NroOt == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nro de OT');
    return 
  } 
  if (this.formParams.value.NombreOt == '' || this.formParams.value.NombreOt == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nombre de la  OT');
    return 
  } 
  if (this.formParams.value.GesProyCodigo == '0' || this.formParams.value.GesProyCodigo == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Proyecto');
    return 
  } 
  if (this.formParams.value.NombreSite == '' || this.formParams.value.NombreSite == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nombre site');
    return 
  } 
  if (this.formParams.value.NumeroIdOt == '' || this.formParams.value.NumeroIdOt == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nro ID');
    return 
  } 
  if (this.formParams.value.IdRegion == '0' || this.formParams.value.IdRegion == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Region');
    return 
  } 
  if (this.formParams.value.IdProvincia == '0' || this.formParams.value.IdProvincia == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la provincia');
    return 
  } 
  if (this.formParams.value.IdDistrito == '0' || this.formParams.value.IdDistrito == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Distrio');
    return 
  } 
  if (this.formParams.value.FechaApertura == '' || this.formParams.value.FechaApertura == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese o seleccione la fecha de apertura');
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
    this.registroOTService.set_save_registroOT(this.formParams.value)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {   

          this.flag_modoEdicion=true;
          this.IdOt_Global = res.data;
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se agrego correctamente..');

          setTimeout(()=>{ // 
            this.staticTabsPrincipal.tabs[1].active = true;
          },500); 


        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      })
     
   }else{ /// editar

     Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
     Swal.showLoading();    
    this.registroOTService.set_edit_registroOT(this.formParams.value , this.formParams.value.IdOt)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {     
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se actualizo correctamente..');
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      })
   }
 } 
 

 editar(item:any){

  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
  Swal.showLoading(); 

  this.registroOTService.get_registroOTedicion(item.idOT)
    .subscribe((res:RespuestaServer)=>{  
        Swal.close();        
      if (res.ok ==true) {      
 
         const {  id_Ot, nro_Ot, nombre_Ot, ges_proy_Codigo, id_TipoTrabajo_Telefonia, id_Area_Telefonia, nombreSite, numero_id_Ot, id_Region, id_Provincia, id_Distrito, 
                  fechaApertura, pub_ccte_ruc_Cliente, jefeClienteSolicitante, analistaClienteSolicitante, id_personalCoodinador, id_personalJefeResponsable, 
                  id_personalLiquidador, id_personalEjecutante, id_personalContable, estado } = res.data[0];

         this.flag_modoEdicion = true;
         this.flag_verEstado_Global = (estado == 300 || estado == 301)? true:false;
         this.IdOt_Global = id_Ot;

          this.formParams= new FormGroup({ 
            IdOt: new FormControl(id_Ot), 
            NroOt: new FormControl(nro_Ot), 
            NombreOt: new FormControl(nombre_Ot), 
            GesProyCodigo: new FormControl(ges_proy_Codigo), 
    
            IdTipoTrabajoTelefonia: new FormControl(''), //---F-
            IdAreaTelefonia: new FormControl(''), //---F-
    
            NombreSite: new FormControl(nombreSite), 
            NumeroIdOt: new FormControl(numero_id_Ot), 
            
            IdRegion: new FormControl(id_Region), 
            IdProvincia: new FormControl(id_Provincia), 
            IdDistrito: new FormControl(id_Distrito), 
    
            FechaApertura: new FormControl( new Date(fechaApertura)), 
            PubCcteRucCliente: new FormControl(pub_ccte_ruc_Cliente), 
            JefeClienteSolicitante: new FormControl(jefeClienteSolicitante), 
            AnalistaClienteSolicitante: new FormControl(analistaClienteSolicitante),
    
            IdPersonalCoodinador: new FormControl(id_personalCoodinador), 
            IdPersonalJefeResponsable: new FormControl(id_personalJefeResponsable),  
    
            IdPersonalLiquidador: new FormControl(id_personalLiquidador), 
            IdPersonalEjecutante: new FormControl(id_personalEjecutante), 
            IdPersonalContable: new FormControl(id_personalContable), 
    
            Estado: new FormControl(estado),     
            UsuarioCreacion: new FormControl(this.idUserGlobal),             
         }) 

          this.spinner.show();
          combineLatest([this.registroOTService.get_provincias(id_Region, this.idUserGlobal) , this.registroOTService.get_distritos(id_Region,id_Provincia )  ])
          .subscribe( ([ _provincias , _distritos ] :any[])=>{     
            this.spinner.hide();   
            this.provinciasModal = _provincias.data;
            this.distritosModal =  _distritos.data;

            setTimeout(()=>{ // 
              $('#modal_proceso').modal('show');  
              this.formParams.patchValue({"IdProvincia": id_Provincia,  "IdDistrito": id_Distrito});
              this.staticTabsPrincipal.tabs[0].active = true; 
            },0);   

            this.mostrarArchivosOT();

          },
          (error) => {    
            this.spinner.hide(); 
            alert(JSON.stringify(error));
          })  

   

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

 anular(objBD:any){

   this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
   .then((result)=>{
     if(result.value){

        Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
        Swal.showLoading();    
       this.registroOTService.set_anular_registroOT(objBD.idOT).subscribe((res:RespuestaServer)=>{
           Swal.close();        
           if (res.ok ==true) { 
             
             for (const item of this.registroOT) {
               if (item.idOT == objBD.idOT ) {
                   item.estado = 301;
                   item.descripcionEstado = 'ANULADO'
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
    this.registroOTService.get_descargarGrilla({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
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
       case 'Datos Generales':
        setTimeout(()=>{ // 
 
          // alert('tab 0')
        },0);
       break;
       case 'Datos de Inspeccion':  
         setTimeout(()=>{ // 
 
          // alert('tab 1')
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


mostrarArchivosOT(){
  if ( this.IdOt_Global == 0 || this.IdOt_Global == null)  {
    this.alertasService.Swal_alert('error', 'No se cargo la informacion del OT, por favor actualizar la pagina..');
    return;
  }

  this.registroOT_archivos = [];
  this.registroOTService.get_archivosRegistroOt(this.IdOt_Global, this.formParamsFile.value.tipoDocumento ).subscribe((res:RespuestaServer)=>{
    if (res.ok) {
       this.registroOT_archivos = res.data;
    }else{
      this.alertasService.Swal_alert('error', JSON.stringify(res.data));
      alert(JSON.stringify(res.data));
    }
  })


}

blank(){
  this.inicializarFormularioArchivos();
 }

 onFileChange(event:any) {

  var filesTemporal = event.target.files; //FileList object
   var fileE:InputFileI [] = [];
   for (var i = 0; i < event.target.files.length; i++) { //for multiple files
     fileE.push({
         'file': filesTemporal[i],
         'namefile': filesTemporal[i].name,
         'status': '',
         'message': ''
     })
   }
    this.filesOT = fileE;
    console.log(this.filesOT)
}

obtnerArchivoYacargado(nombreArchivo:string){
  var flagRepetida=false;
  for (const obj of this.registroOT_archivos) {
    if (  obj.nombreArchivo == nombreArchivo ) {
         flagRepetida = true;
         break;
    }
  }
  return flagRepetida;
}


subirArchivo(){

  if ( this.IdOt_Global == 0 || this.IdOt_Global == null)  {
    this.alertasService.Swal_alert('error', 'No se cargo la informacion del OT, por favor actualizar la pagina..');
    return;
  }

  if (this.formParamsFile.value.tipoDocumento == '0' || this.formParamsFile.value.tipoDocumento == 0 || this.formParamsFile.value.tipoDocumento == null)  {
    this.alertasService.Swal_alert('error', 'Por favor seleccione el Tipo de Documento.');
    return;
  }

  if (!this.formParamsFile.value.file) {
    this.alertasService.Swal_alert('error', 'Por favor seleccione el archivo que va a cargar.');
    return;
  }

  if (this.obtnerArchivoYacargado( this.filesOT[0].file.name ) ==true) {
    this.alertasService.Swal_alert('error', 'El archivo que intenta subir, Ya se encuentra cargado');
    return;
  }

  Swal.fire({
    icon: 'info',allowOutsideClick: false,allowEscapeKey: false,text: 'Espere por favor'
  })
  Swal.showLoading();
  this.uploadService.upload_fileRequerimientos( this.IdOt_Global, this.formParamsFile.value.tipoDocumento, this.filesOT[0].file , this.idUserGlobal ).subscribe(
    (res:any) =>{
      Swal.close();

      console.log('upload_fileRequerimientos')
      console.log(res)

      if (res.ok==true) {
        //------enfocando el estado a registrado ----     
        this.alertasService.Swal_Success('Proceso de carga realizado correctamente..');
        this.blank();
        this.mostrarArchivosOT();
      }else{
        alert(JSON.stringify(res.data));
      }
      },(err) => {
        Swal.close();
        alert(JSON.stringify(err.data));
      }
  );

 }


 
 eliminarArchivoSeleccionado(item:any){
  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de eliminar ?')
  .then((result)=>{
    if(result.value){
      Swal.fire({
        icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Eliminando, espere por favor'
      })
      Swal.showLoading();
      this.registroOTService.set_eliminar_archivoOT(item.id_OtArchivo).subscribe((res:RespuestaServer)=>{
          Swal.close();
          console.log(res);
          if (res.ok) {
                   this.alertasService.Swal_Success("Proceso realizado correctamente..")
                   var index = this.registroOT_archivos.indexOf( item );
                   this.registroOT_archivos.splice( index, 1 );
          }else{
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
       }, (error) => {    
           Swal.close();
           alert(JSON.stringify(error));
       })  
    }
   }) 

}


 descargarArchivoSeleccionado({urlFile,nombreArchivo_servidor}){

  const link = document.createElement('a');

  link.href = urlFile;
  link.download = nombreArchivo_servidor;
  link.target = '_blank';
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); 

}






}
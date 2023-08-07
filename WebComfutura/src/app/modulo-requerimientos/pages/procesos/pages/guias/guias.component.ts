import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../services/login/login.service';
 
 
import { RespuestaServer } from '../../../../../models/respuestaServer.models';
import { combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
 
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
 import { GuiasService } from '../../../../../services/requerimientos/procesos/guias.service';

declare var $:any;

@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

  formParamsFiltro : FormGroup;
  formParams: FormGroup;

  idUserGlobal :number = 0;
  flag_modoEdicion :boolean =false;
  datepiekerConfig:Partial<BsDatepickerConfig>

  locales :any[]=[]; 
  filtrarMantenimiento = "";
  empresas:any[]=[]; 
  tiposIngreso:any[]=[];  
  almacenes  :any[]=[]; 
  estados  :any[]=[]; 
  estadosIngresoGuias :any[]=[]; 

  guiasCab :any[]=[]; 
  tiposAlmacen :any[]=[]; 
  almacenes_tiposAlmacenLocal :any[]=[]; 
  tiposDocumentosGuias:any[]=[]; 
  monedas:any[]=[]; 
  ayudas:any[] =[];
 
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private guiasService : GuiasService , private combosService : CombosService  ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal =0;
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.getCargarCombos();
 }

 inicializarFormulario(){ 
    this.formParams= new FormGroup({

        Id_AlmGuiaCab: new FormControl('0') ,  ///--ok 
        id_Empresa: new FormControl('1'),   ///--ok 
        tipoAlmacen: new FormControl('0'),   ///--ok 
        Id_Local: new FormControl('0'),   ///--ok 

        id_Almacen: new FormControl(''),   ///--ok 
        id_MovAlmacen: new FormControl(''), 

        serie: new FormControl(''), ///--interno ok 
        nroDoc: new FormControl(''), ///--interno ok 

        NroDocumento: new FormControl(''), 
        fechaEmisionDoc_GuiasCab: new FormControl(new Date()), ///--ok 
        despachoSIE_GuiasCab: new FormControl(''), 
        id_TipoRefDoc_GuiasCab: new FormControl(''), 
        numeroDoc_GuiasCab: new FormControl(''), 
        nroReserva_GuiasCab: new FormControl(''), 
        despachoSieFicticio_GuiasCab: new FormControl(''), 
        fecRegularizacion_GuiasCab: new FormControl(new Date()),  ///--ok 

        id_tipoGuia_Alm: new FormControl(''), 
        id_TD: new FormControl(''), 
        Codigo_TD: new FormControl(''), 
        id_CtaCte_Colaborador: new FormControl(''), 
        id_Cuadrilla: new FormControl(''), 
        id_Personal: new FormControl(''), 
        id_OTContable: new FormControl(''), 
        id_Moneda: new FormControl('0'),  ///--ok 
        tipoCambio_GuiasCab: new FormControl(''),  ///--ok 

        obs_GuiasCab: new FormControl(''), 
        id_CtaCte_Proveedor: new FormControl(''), ///--ok 

        nroRucProveedor: new FormControl(''), ///--ok 
        descripcionProveedor: new FormControl(''), ///--ok 

        id_CtaCte_Cliente: new FormControl(''), 
        id_CtaCte_Transportista: new FormControl(''), 
        id_Vehiculo: new FormControl(''), 
        id_Personal_Conductor: new FormControl(''), 
        id_CtaCte_Destinatario_GuiasCab: new FormControl(''), 
        direccionDestinatario_GuiasCab: new FormControl(''), 
        fechaTraslado_GuiasCab: new FormControl(''), 
        id_MAnu_Alm: new FormControl(''), 
        obsAnulacion_GuiasCab: new FormControl(''), 
        Anterior_Numero: new FormControl(''), 
        Anterior_DocRef: new FormControl(''), 
        estado: new FormControl(''), 
        usuario_creacion: new FormControl(this.idUserGlobal), 
        id_area: new FormControl(''), 
        FolioPedido_GuiasCab: new FormControl(''), 
        FolioAlmacen_GuiasCab: new FormControl(''), 
        FlagSinFolio: new FormControl(''), 
        idDocumento: new FormControl(''), 
        ordenCompra: new FormControl(''),        
    }) 
 }

 inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      tipoIngreso : new FormControl('0'),  
      local : new FormControl('0'),  
      almacen  : new FormControl('0'),  
      fecha_ini : new FormControl(new Date()),   
      fecha_fin : new FormControl(new Date()),  
      estado : new FormControl('0'), 
      filtro: new FormControl(''), 
    }) 
  }

  getCargarCombos(){ 
    // this.spinner.show();
    // combineLatest([this.combosService.get_tiposIngresos(), this.combosService.get_locales(this.idUserGlobal) , this.combosService.get_estadosIngresoGuias() , this.combosService.get_tiposAlmacenes(),
    //   this.combosService.get_tiposDocumentosGuias() , this.combosService.get_monedas() 
    // ])
    // .subscribe( ([ _tiposIngreso, _locales, _estadosIngresoGuias, _tiposAlmacen ,_tiposDocumentosGuias, _monedas])=>{     
    //   this.spinner.hide();   
    //   this.tiposIngreso = _tiposIngreso;
    //   this.locales = _locales ;
    //   this.estadosIngresoGuias = _estadosIngresoGuias;
    //   this.tiposAlmacen = _tiposAlmacen;
    //   this.tiposDocumentosGuias = _tiposDocumentosGuias;
    //   this.monedas =_monedas;
    // })
}


changeLocal(opcion:any ){
  if ( opcion.target.value == 0 || opcion.target.value == '0' ) { 
    this.almacenes = [];
    this.formParamsFiltro.patchValue({"almacen": '0'});      
    return;
  }     
  this.mostrarAlmacenesLocal(opcion.target.value );
}

mostrarAlmacenesLocal(idLocal:number ){ 
  this.spinner.show();
  // this.stockService.get_almacenesLocal(idLocal, this.idUserGlobal)
  //   .subscribe((res:RespuestaServer)=>{  
  //     this.spinner.hide();      
  //     if (res.ok ==true) {      
  //         this.almacenes = res.data;  
  //     }else{
  //       this.alertasService.Swal_alert('error', JSON.stringify(res.data));
  //       alert(JSON.stringify(res.data));
  //     }
  //   })
}


 mostrarInformacion(){ 

  if (this.formParamsFiltro.value.tipoIngreso == '0' || this.formParamsFiltro.value.tipoIngreso == 0 ) {
    this.alertasService.Swal_alert('error','Por favor seleccione el tipo de ingreso ');
    return 
  } 
  if (this.formParamsFiltro.value.local == '0' || this.formParamsFiltro.value.local == 0 ) {
    this.alertasService.Swal_alert('error','Por favor seleccione el local ');
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
    this.guiasService.get_mostrar_informacion({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF} , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.guiasCab = res.data;
      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })
  }
  


 nuevo(){

    if (this.formParamsFiltro.value.tipoIngreso == '0' || this.formParamsFiltro.value.tipoIngreso == 0 ) {
      this.alertasService.Swal_alert('error','Por favor seleccione el tipo de Ingreso ');
      return 
    } 


    this.flag_modoEdicion = false;
    this.inicializarFormulario();  
    this.almacenes_tiposAlmacenLocal = [];

    setTimeout(()=>{ // 
      $('#modal_almacen').modal('show');  
      if (this.formParamsFiltro.value.tipoIngreso == 'I02'  ) {
          this.formParams.patchValue({"tipoAlmacen": '1'});     
      }else{
        this.formParams.patchValue({"tipoAlmacen": '2'});   
      }
    },0); 

 } 

 cerrarModal_almacen(){
  setTimeout(()=>{ // 
    $('#modal_almacen').modal('hide');  
  },0); 
}



 changeTipoAlmacenLocal(opcion:any ){
  if ( this.formParams.value.tipoAlmacen == 0 || this.formParams.value.tipoAlmacen == '0' ) { 
    this.almacenes_tiposAlmacenLocal = [];
    this.formParams.patchValue({"Id_Local": '0'});      
    return;
  }     

  if (this.formParams.value.Id_Local == 0 || this.formParams.value.Id_Local == '0' ) {
    this.almacenes_tiposAlmacenLocal = [];
    return;
  }

  this.mostrar_almacenesTipoAlmacenLocal( this.formParams.value.tipoAlmacen , this.formParams.value.Id_Local  );
}

mostrar_almacenesTipoAlmacenLocal(idTipoAlmacen:number , idLocal:number){ 
  this.spinner.show();
  this.guiasService.get_almacenesTipoAlmacenLocal(idTipoAlmacen, idLocal, this.idUserGlobal)
    .subscribe((res:RespuestaServer)=>{  
      this.spinner.hide();      
      if (res.ok ==true) {      
          this.almacenes_tiposAlmacenLocal = res.data;  
      }else{
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })
}

 elegirAlmacen(item){

  this.formParams.patchValue({"id_Almacen": item.id_almacen});     
  this.formParams.patchValue({"Id_Local": this.formParams.value.Id_Local });   
   
  setTimeout(()=>{ // 
    // $('#modal_almacen').modal('hide');  
    $('#modal_proceso').modal('show');  
  },0); 

 }

 cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_proceso').modal('hide');  
    },0); 
  }

  buscarCodigo(tipo:string){

    if (tipo == 'P') { //--- proveedor
         if( this.formParamsFiltro.value.nroRucProveedor == '' ){
              this.formParamsFiltro.patchValue({ "filtro" : '' });
              this.ayudas = [];
              setTimeout(()=>{ // 
                $('#modal_ayuda').modal('show');  
              },0);  
            return;   
        }
    }
    if (tipo == 'M') { //--- material
        if( this.formParamsFiltro.value.nroRucProveedor == '' ){
              this.formParamsFiltro.patchValue({ "filtro" : '' });
              this.ayudas = [];
              setTimeout(()=>{ // 
                $('#modal_ayuda').modal('show');  
              },0);  
            return;   
        }
    }


    
    this.spinner.show();
    this.guiasService.get_buscarCodigo( tipo, this.formParamsFiltro.value.nroRucProveedor , this.idUserGlobal)
    .subscribe((res:RespuestaServer)=>{       
        this.spinner.hide();    
        if (res.ok==true) {    

           if(res.data.length > 0){      

            const {id, codigo, descripcion} = res.data[0];
            this.formParamsFiltro.patchValue({ "id" : id,   'descripcion' : descripcion});

           }else{

            this.alertasService.Swal_alert('info','No existe informacion con el Nro Documento ingresado');
            this.formParamsFiltro.patchValue({ "id" : 0,   'descripcion' : ''});

            setTimeout(()=>{ // 
              this.formParamsFiltro.patchValue({ "filtro" : '' });
              this.ayudas = [];
              $('#modal_ayuda').modal('show');  
            },0);
            
           } 

        }else{
          this.spinner.hide();
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
    },(error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })




 }




  buscarAyudas(){
    if( this.formParamsFiltro.value.filtro == '' ){
      this.alertasService.Swal_alert('error','Por favor ingrese algun dato sea codigo o descripcion');
      return;
  
    }else{
   
    //  this.spinner.show();
    //  this.stockService.get_buscarNroDocumento_masivo( this.formParamsFiltro.value, this.idUserGlobal)
    //  .subscribe((res:RespuestaServer)=>{       
    //      this.spinner.hide();    
    //      if (res.ok==true) {    
    //         this.ayudas = res.data;
    //      }else{
    //        this.spinner.hide();
    //        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
    //        alert(JSON.stringify(res.data));
    //      }
    //  },
    //  (error) => {    
    //    this.spinner.hide(); 
    //    alert(JSON.stringify(error));
    //  })
   }
  }

  agregarItemAyuda({ id, codigo, descripcion}){
    this.formParamsFiltro.patchValue({ "id" : id, 'codigo' : codigo,  'descripcion' : descripcion});
    this.cerrarModal();
  }
  



















 async saveUpdate(){ 

  if (this.formParams.value.Id_Empresa == '0' || this.formParams.value.Id_Empresa == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Empresa');
    return 
  } 

  if (this.formParams.value.nombre_local == '' || this.formParams.value.nombre_local == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nombre local');
    return 
  } 

   this.formParams.patchValue({ "usuario_creacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicion==false) { //// nuevo  
 
    //  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    //  Swal.showLoading(); 
    // this.localesService.set_save_locales(this.formParams.value)
    //   .subscribe((res:any)=>{  
    //     Swal.close();    
    //     if (res.ok ==true) {     
    //       this.flag_modoEdicion = true;
    //       this.mostrarInformacion();
    //       this.alertasService.Swal_Success('Se agrego correctamente..');
    //       this.cerrarModal();
    //     }else{
    //       this.alertasService.Swal_alert('error', JSON.stringify(res.data));
    //       alert(JSON.stringify(res.data));
    //     }
    //   })
     
   }else{ /// editar

    //  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
    //  Swal.showLoading();    
    // this.localesService.set_edit_locales(this.formParams.value , this.formParams.value.Id_Local)
    //   .subscribe((res:any)=>{  
    //     Swal.close();    
    //     if (res.ok ==true) {     
    //       this.flag_modoEdicion = true;
    //       this.mostrarInformacion();
    //       this.alertasService.Swal_Success('Se actualizo correctamente..');
    //       this.cerrarModal();
    //     }else{
    //       this.alertasService.Swal_alert('error', JSON.stringify(res.data));
    //       alert(JSON.stringify(res.data));
    //     }
    //   })

   }

 } 
 

 editar({Id_Local, Id_Empresa, nombre_local, direccion_local, Id_Ubicacion, orden_local, estado, usuario_creacion   }){
   this.flag_modoEdicion=true;
    this.formParams= new FormGroup({
      Id_Local: new FormControl(Id_Local), 
      Id_Empresa: new FormControl(Id_Empresa), 
      nombre_local: new FormControl(nombre_local), 
      direccion_local: new FormControl(direccion_local), 
      Id_Ubicacion: new FormControl(Id_Ubicacion), 
      orden_local: new FormControl(orden_local), 
      estado: new FormControl(estado), 
      usuario_creacion: new FormControl(this.idUserGlobal), 
  })
   setTimeout(()=>{ // 
    $('#modal_mantenimiento').modal('show');  
  },0);  
 } 

 anular(objBD:any){

  //  if (objBD.estado ===2 || objBD.estado =='2') {      
  //    return;      
  //  }

  //  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
  //  .then((result)=>{
  //    if(result.value){
  //     Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
  //     Swal.showLoading();    
  //    this.localesService.set_anular_local(objBD.Id_Local).subscribe((res:RespuestaServer)=>{
  //        Swal.close();        
  //        if (res.ok ==true) { 
           
  //          for (const user of this.locales) {
  //            if (user.Id_Local == objBD.Id_Local ) {
  //                user.estado = 2;
  //                break;
  //            }
  //          }
  //          this.alertasService.Swal_Success('Se anulo correctamente..')  
    
  //        }else{
  //          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
  //          alert(JSON.stringify(res.data));
  //        }
  //      })
        
  //    }
  //   }) 

 }


}


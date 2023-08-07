 



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
 
import Swal from 'sweetalert2';
 
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { InputFileI } from 'src/app/models/inputFile.models';
import { UploadService } from 'src/app/services/upload/upload.service';
import { RegistroFacturasService } from 'src/app/services/logistica/procesos/registro-facturas.service';

declare var $:any;
@Component({
  selector: 'app-registrar-facturas',
  templateUrl: './registrar-facturas.component.html',
  styleUrls: ['./registrar-facturas.component.css']
})
export class RegistrarFacturasComponent implements OnInit{

  formParamsFiltro : FormGroup;
  formParams: FormGroup;
  formParamsFile : FormGroup;

  idUserGlobal :string = '';
  flag_modoEdicion :boolean =false;
  flag_modoEdicionCobranza :boolean =false;
  datepiekerConfig:Partial<BsDatepickerConfig>

 
  filtrarMantenimiento = "";
  clientes :any[]=[]; 
  registroFacturasCab :any[]=[]; 
  tiposDocumentos:any[]=[]; 
  monedas:any[]=[]; 
  areas:any[]=[]; 
  estados:any[]=[]; 
  cobranzasCab:any[]=[]; 
  bancos:any[]=[]; 
  tiposCobro:any[]=[]; 
  proveedorFactoring:any[]=[]; 

  IdDocumento_Global = 0
  IdCobranza_Global = 0
  flag_verEstado_Global :boolean = false;
  tipoTab = 0; 
  filesVoucher:InputFileI[] = [];
  tituloModalProceso = 'REGISTRO DE FACTURA';
 

  voucher:any[]=[]; 
  DetraccionFlag_global = 0;
  FactoringFlag_global = 0;


  @ViewChild('staticTabsPrincipal', { static: false }) staticTabsPrincipal: TabsetComponent;
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroFacturasService : RegistroFacturasService , private uploadService : UploadService ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.inicializarFormularioCobranza();
   this.getCargarCombos();
 }



 inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      cliente : new FormControl('0'),  
      nroOC : new FormControl(''),  
      fecha_ini : new FormControl(new Date()),   
      fecha_fin : new FormControl(new Date()),  
      estado : new FormControl('0'),
      detraccionPendiente : new FormControl(false),
    }) 
  }

  inicializarFormulario(){ 
    this.formParams= new FormGroup({ 
      IdTelefoniaDocumentos: new FormControl('0'), 
      IdTipoDocumento: new FormControl('0'), 
      NroDocumento: new FormControl(''), 
      FechaEmsion: new FormControl(new Date()), 

      SolicitudPap: new FormControl(''), 
      NroOrdenCompra: new FormControl(''), 
      Posicion: new FormControl(''), 
      Ot: new FormControl(''), 

      PubCcteRucCliente: new FormControl('0'), 
      PubMoneCodigo: new FormControl('0'), 
      PorIgv: new FormControl('18'), 
      Glosa: new FormControl(''), 
      Proyecto: new FormControl('0'), 

      BaseImponible: new FormControl(''),  //----
      TotalIgv: new FormControl('999'), 
      ImporteTotal: new FormControl(''), //----
      TasaDetraccion: new FormControl(''),  //----
      TotalImpuesto: new FormControl(''), //----
      ImporteNeto: new FormControl(''),  //----
      TotalCobrado: new FormControl('0'), 
      saldoCobrar: new FormControl(''), 

      FechaPagoDetraccion: new FormControl(new Date()), 
      NroOperacionDetraccion: new FormControl(''),
      ImporteDetraccion: new FormControl(''),
      file: new FormControl(''),

      PubCCteRuCFactoring: new FormControl('0'),
      PorComisionFactoring: new FormControl('3'),
      ImporteFactoring: new FormControl(''),
      FechaRegistroFactoring: new FormControl(new Date()),
      totalInteresesFactoring: new FormControl(''),

      Estado: new FormControl('120'), 
      UsuarioCreacion: new FormControl(this.idUserGlobal),        
    }) 
 }

 inicializarFormularioCobranza(){

  this.formParamsFile= new FormGroup({
      IdTelefoniaDocCobrados: new FormControl('0'),
      IdTelefoniaDocumentos: new FormControl(''),
      FechaCobro: new FormControl(new Date()),
      NroOperacion: new FormControl(''),
      ImporteCobrado: new FormControl(''),
      IdBanco: new FormControl('0'),
      Estado: new FormControl('001'),
      UsuarioCreacion: new FormControl(''),
      IdTipoCobro: new FormControl('0'),
      file: new FormControl(''),
   })
 }


  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_clientes() , this.registroFacturasService.get_tipoDocumentoRegistroFactura(), this.combosService.get_monedas(), this.combosService.get_areas(), 
      this.registroFacturasService.get_estadosRegistroFactura(), this.combosService.get_bancos(), this.combosService.get_tiposCobro(), this.registroFacturasService.get_proveedorFactoring()
    ])
    .subscribe( ([ _clientes, _tiposDocumentos , _monedas, _areas, _estados, _bancos, _tipoCobro, _proveedorFactoring])=>{     
      this.spinner.hide();   
      this.clientes = _clientes;
      this.tiposDocumentos = _tiposDocumentos;
      this.monedas= _monedas;
      this.areas= _areas;
      this.estados = _estados;
      this.bancos = _bancos;
      this.tiposCobro = _tipoCobro;
      this.proveedorFactoring = _proveedorFactoring;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }

  keyPress(event: any) {
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }

  
 
 mostrarInformacion(){ 

  if (this.formParamsFiltro.value.cliente == '0' || this.formParamsFiltro.value.cliente == 0 ) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Cliente ');
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
  const penDetraccion =  (this.formParamsFiltro.value.detraccionPendiente=true) ? 1:0;

    this.spinner.show();
    this.registroFacturasService.get_mostrar_informacion({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF , detraccionPendiente : penDetraccion } , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.registroFacturasCab = res.data;
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
 
 nuevo(){
     this.tipoTab = 0;
     this.flag_verEstado_Global = true;
     this.IdDocumento_Global = 0;
     this.flag_modoEdicion = false;
     this.inicializarFormulario();  
     this.tituloModalProceso = 'REGISTRO DE FACTURA'; 
    setTimeout(()=>{ // 
      $('#modal_proceso').modal('show');  
      this.staticTabsPrincipal.tabs[0].active = true;
    },0);   
 } 

 cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_proceso').modal('hide');  
    },0); 
  }

  buscarOrdenCompra(){

    let nroOC = this.formParams.value.NroOrdenCompra;
    let posic = this.formParams.value.Posicion;

    if(nroOC == '' || nroOC == null || nroOC == undefined ){
      this.alertasService.Swal_alert('error', 'Por favor ingrese el Nro Orden Compra, luego presione la tecla Enter');
      return 
    }    
    if(posic == '' || posic == null || posic == undefined ){
      this.alertasService.Swal_alert('error', 'Por favor ingrese la posicion, luego presione la tecla Enter');
      return 
    }
 
    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
    })
    Swal.showLoading();
    this.registroFacturasService.get_buscarOrdenCompra(  nroOC, posic ).subscribe((res: RespuestaServer) => {
      Swal.close();
      if (res.ok) {
            console.log(res.data);

            if (res.data.length ==0) {
              this.alertasService.Swal_alert('info', 'No se encontro informacion con el Nro OT ingresado, verifique..');
              this.formParams.patchValue({  "PubCcteRucCliente" : '0'  , "Proyecto" : '0'  , "Ot" : '' });

            }else{
              const { cliente, area, nroOT } = res.data[0];
              this.formParams.patchValue({  "PubCcteRucCliente" : cliente  , "Proyecto" : area  , "Ot" : nroOT});
            }

      } else {
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    }) 
  }

  
  buscarOt(){
    let nroOt = this.formParams.value.Ot;
 
    if(nroOt == '' || nroOt == null || nroOt == undefined ){
      this.alertasService.Swal_alert('error', 'Por favor ingrese el Nro Ot, luego presione la tecla Enter');
      return 
    }     
 
    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Buscando por nro OT, Espere por favor'
    })
    Swal.showLoading();
    this.registroFacturasService.get_buscarOT( nroOt).subscribe((res: RespuestaServer) => {
      Swal.close();
      if (res.ok) {
            if (res.data.length ==0) {
              this.alertasService.Swal_alert('info', 'No se encontro informacion con el Nro OT ingresado, verifique..');
              this.formParams.patchValue({  "NroOrdenCompra" : ''  , "Posicion" : '', "PubCcteRucCliente" : '0'  , "Proyecto" : '0'  });

            }else{
              const { nroOC, posicion, cliente, area } = res.data[0];
              this.formParams.patchValue({   "NroOrdenCompra" : nroOC  , "Posicion" : posicion  , "PubCcteRucCliente" : cliente  , "Proyecto" : area });
            }
      } else {
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    }) 
  }

  calcularTotales(): void {

    const baseImp  = (this.formParams.value.BaseImponible =='') ? 0 : Number(this.formParams.value.BaseImponible);
    const valorIgv  = (this.formParams.value.PorIgv =='') ? 0 : Number(this.formParams.value.PorIgv);
    let valorTasa  = (this.formParams.value.TasaDetraccion =='') ? 0 : Number(this.formParams.value.TasaDetraccion);

    let porcIgv  = (valorIgv/100);
    let porcTasa  = (valorTasa/100);

    const totalIgv = (baseImp * porcIgv );
    const imporTotal = (baseImp + totalIgv);
    
    const totImpuesto = (imporTotal * porcTasa);

    this.formParams.patchValue({   "TotalIgv" :  totalIgv , "ImporteTotal" : imporTotal ,  "TotalImpuesto" : totImpuesto.toFixed(4) , "ImporteNeto" : (imporTotal - totImpuesto).toFixed(4) });

  }

 
 async saveUpdate(){ 

 
  if (this.formParams.value.IdTipoDocumento == '0' || this.formParams.value.IdTipoDocumento == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Tipo de Documento');
    return 
  } 
  if (this.formParams.value.NroDocumento == '' || this.formParams.value.NroDocumento == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nro Documento');
    return 
  } 
  if (this.formParams.value.FechaEmsion == '' || this.formParams.value.FechaEmsion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese o seleccione la fecha de emision');
    return 
  } 
  if (this.formParams.value.PubMoneCodigo == '0' || this.formParams.value.PubMoneCodigo == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Moneda');
    return 
  } 
  if (this.formParams.value.PorIgv == '' || this.formParams.value.PorIgv == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el porcentaje de IGV');
    return 
  } 
  if (this.formParams.value.Glosa == '' || this.formParams.value.Glosa == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese la Glosa');
    return 
  }  

  if (this.formParams.value.BaseImponible == '' || this.formParams.value.BaseImponible == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese la Base Imponible');
    return 
  } 
  if (this.formParams.value.ImporteTotal == '' || this.formParams.value.ImporteTotal == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el importe total');
    return 
  }

  // if (this.formParams.value.TasaDetraccion == ''  ) {
  //   this.alertasService.Swal_alert('error','Por favor ingrese la tasa');
  //   return 
  // } 
  // if (this.formParams.value.TotalImpuesto == ''  ) {
  //   this.alertasService.Swal_alert('error','Por favor ingrese el Imp. Impuesto');
  //   return 
  // } 
  if (this.formParams.value.ImporteNeto == '' || this.formParams.value.ImporteNeto == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Importe Neto');
    return 
  } 


  if (this.formParams.value.Estado == '0' || this.formParams.value.Estado == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Estado');
    return 
  }

  if (this.formParams.value.Estado != '120' && this.formParams.value.Estado != '122' ) {
    this.alertasService.Swal_alert('error','Solo se puede elegir el Estado Registrado o Anulado, desde este formulario');
    return 
  }
 

   this.formParams.patchValue({ "UsuarioCreacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicion==false) { //// nuevo  
    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    Swal.showLoading(); 
    this.registroFacturasService.set_save_registroOT({...this.formParams.value, 'TasaDetraccion' : this.formParams.value.TasaDetraccion == '' ? 0 : this.formParams.value.TasaDetraccion ,'TotalImpuesto' : this.formParams.value.TotalImpuesto == '' ? 0 : this.formParams.value.TotalImpuesto} )
      .subscribe((res:any)=>{  
        Swal.close();  
                
        if (res.ok ==true) {  
          this.flag_modoEdicion=true;
          this.IdDocumento_Global = res.data;
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se agrego correctamente..');
          this.cerrarModal()
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },
      (error) => {    
        this.spinner.hide(); 
        alert(JSON.stringify(error));
      })
     
   }else{ /// editar
    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
     Swal.showLoading();    
    this.registroFacturasService.set_edit_registroFactura(this.formParams.value , this.formParams.value.IdTelefoniaDocumentos)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {     
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se actualizo correctamente..');
          this.cerrarModal()
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
 } 
 

 editar(item:any){ 
  
  this.inicializarFormulario();  
  this.tituloModalProceso = 'REGISTRO DE FACTURA';  
  this.tipoTab = 0;

  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
  Swal.showLoading(); 
  this.registroFacturasService.get_registroFacturaEdicion(item.IdTelefoniaDocumentos)
    .subscribe((res:RespuestaServer)=>{  
        Swal.close();        
      if (res.ok ==true) {      
 
         const {  IdTelefoniaDocumentos, IdTipoDocumento, NroDocumento, FechaEmsion, SolicitudPap, NroOrdenCompra, Posicion, Ot, PubCcteRucCliente, 
          PubMoneCodigo, PorIgv, Glosa, Proyecto, BaseImponible, TotalIgv, ImporteTotal, TasaDetraccion, TotalImpuesto, ImporteNeto, TotalCobrado, 
          Estado } = res.data[0];

 
         this.flag_verEstado_Global = (Estado == 120 || Estado == 122)? true:false;
         this.flag_modoEdicion = true;
         this.IdDocumento_Global = IdTelefoniaDocumentos;

          this.formParams= new FormGroup({ 
            IdTelefoniaDocumentos: new FormControl(IdTelefoniaDocumentos), 
            IdTipoDocumento: new FormControl(IdTipoDocumento), 
            NroDocumento: new FormControl(NroDocumento), 
            FechaEmsion: new FormControl(new Date(FechaEmsion)), 
     
            SolicitudPap: new FormControl(SolicitudPap), 
            NroOrdenCompra: new FormControl(NroOrdenCompra), 
            Posicion: new FormControl(Posicion), 
            Ot: new FormControl(Ot), 
      
            PubCcteRucCliente: new FormControl(PubCcteRucCliente), 
            PubMoneCodigo: new FormControl(PubMoneCodigo), 
            PorIgv: new FormControl(PorIgv), 
            Glosa: new FormControl(Glosa), 
            Proyecto: new FormControl(Proyecto), 
      
            BaseImponible: new FormControl(BaseImponible),  //----
            TotalIgv: new FormControl(TotalIgv), 
            ImporteTotal: new FormControl(ImporteTotal), //----
            TasaDetraccion: new FormControl(TasaDetraccion),  //----
            TotalImpuesto: new FormControl(TotalImpuesto), //----
            ImporteNeto: new FormControl(ImporteNeto),  //----
            TotalCobrado: new FormControl(TotalCobrado), 
      
            Estado: new FormControl(Estado), 
            UsuarioCreacion: new FormControl(this.idUserGlobal),            
         }) 

          setTimeout(()=>{ // 
            this.tipoTab = 0; 
            $('#modal_proceso').modal('show');        
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
 
 } 

 anular(objBD:any){

   this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
   .then((result)=>{
     if(result.value){

        Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
        Swal.showLoading();    
       this.registroFacturasService.set_anular_registroFacturas(objBD.IdTelefoniaDocumentos).subscribe((res:RespuestaServer)=>{
           Swal.close();        
           if (res.ok ==true) { 
             
             this.alertasService.Swal_Success('Se anulo correctamente..') ;

             this.mostrarInformacion();
      
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

    if (this.formParamsFiltro.value.cliente == '0' || this.formParamsFiltro.value.cliente == 0 ) {
      this.alertasService.Swal_alert('error','Por favor seleccione el Cliente ');
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
    const penDetraccion =  (this.formParamsFiltro.value.detraccionPendiente=true) ? 1:0;
  
      this.spinner.show();
      this.registroFacturasService.get_descargarGrilla({ ...this.formParamsFiltro.value, fecha_ini : fechaI,  fecha_fin : fechaF,  detraccionPendiente : penDetraccion} , this.idUserGlobal )
      .subscribe((res:any)=>{     
        this.spinner.hide();      
        if (res.ok==true) {         
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
       default:
         break;
     }
}


// --------COBRANZAS------

verCobranza({IdTelefoniaDocumentos, Estado, IdTipoDocumento, NroDocumento, PubMoneCodigo,  ImporteTotal, ImporteNeto, TotalCobrado}){ 
  
     this.IdDocumento_Global = IdTelefoniaDocumentos; 
     const saldCobrar = (Number(ImporteNeto) - Number(TotalCobrado));

     this.formParams= new FormGroup({ 
            IdTelefoniaDocumentos: new FormControl(IdTelefoniaDocumentos), 
            IdTipoDocumento: new FormControl(IdTipoDocumento), 
            NroDocumento: new FormControl(NroDocumento), 
            PubMoneCodigo: new FormControl(PubMoneCodigo), 
            ImporteTotal: new FormControl(Number(ImporteTotal).toFixed(2)), //----     
            ImporteNeto : new FormControl(Number(ImporteNeto).toFixed(2)), //----    
            TotalCobrado : new FormControl(Number(TotalCobrado).toFixed(2)), //----    
            saldoCobrar : new FormControl(Number(saldCobrar).toFixed(2)),
            Estado: new FormControl(Estado), 
            UsuarioCreacion: new FormControl(this.idUserGlobal),            
    }) 
 
    setTimeout(()=>{ // 

        this.tituloModalProceso = 'LISTADO DE COBRANZAS';  
        $('#modal_proceso').modal('show');    
        this.tipoTab = 1;  
        this.staticTabsPrincipal.tabs[0].active = true;    
        this.mostrarCobranzasCab()
    },0);     
 } 

mostrarCobranzasCab(){
  if ( this.IdDocumento_Global == 0 || this.IdDocumento_Global == null)  {
    this.alertasService.Swal_alert('error', 'No se cargo la informacion del Documento, por favor actualizar la pagina..');
    return;
  }

  this.cobranzasCab = [];
  this.registroFacturasService.get_cobranzasCab(this.IdDocumento_Global).subscribe((res:RespuestaServer)=>{
    if (res.ok) {
       this.cobranzasCab = res.data;

        //---- refrescando los valores---
       const totCobrado = this.cobranzasCab.reduce((previous, current) => {
        return previous + current.ImporteCobrado; 
       }, 0);

       const impNeto =  this.formParams.value.ImporteNeto;
       const saldCobrar = (Number(impNeto) - Number(totCobrado));

       this.formParams.patchValue({ "TotalCobrado" : totCobrado  , "saldoCobrar" : saldCobrar.toFixed(2)});

    }else{
      this.alertasService.Swal_alert('error', JSON.stringify(res.data));
      alert(JSON.stringify(res.data));
    }
  })
}

cerrarModalCobranza(){
  setTimeout(()=>{ // 
    $('#modal_cobranza').modal('hide');  
  },0); 
}

nuevaCobranza(){
    
    this.IdCobranza_Global = 0;
    this.flag_modoEdicionCobranza = false;
    this.voucher = [];
    this.filesVoucher = [];
    this.inicializarFormularioCobranza();   

    setTimeout(()=>{ // 
      $('#modal_cobranza').modal('show');  
    },0);   
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
    this.filesVoucher = fileE;
}


async saveUpdateCobranzas(){ 
  
  if (this.formParamsFile.value.IdTipoCobro == '0' || this.formParamsFile.value.IdTipoCobro == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Tipo Cobro');
    return 
  }

  if (this.formParamsFile.value.FechaCobro == '' || this.formParamsFile.value.FechaCobro == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese o seleccione la fecha de emision');
    return 
  }   
 
  if (this.formParamsFile.value.NroOperacion == '' || this.formParamsFile.value.NroOperacion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Nro de Operacion');
    return 
  } 
  if (this.formParamsFile.value.ImporteCobrado == '' || this.formParamsFile.value.ImporteCobrado == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Importe');
    return 
  } 

  if ( Number(this.formParamsFile.value.ImporteCobrado) == 0 ) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Importe mayor a cero');
    return 
  } 

  if (this.filesVoucher.length > 0) {
    if (this.obtnerArchivoYacargado( this.filesVoucher[0].file.name ) ==true) {
      this.alertasService.Swal_alert('error', 'El archivo que intenta subir, Ya se encuentra cargado');
      return;
    }     
  }

   this.formParamsFile.patchValue({ "IdTelefoniaDocumentos" : this.IdDocumento_Global,   "UsuarioCreacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicionCobranza == false) { //// nuevo  
    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    Swal.showLoading(); 
    this.registroFacturasService.set_save_cobranzas( this.formParamsFile.value )
      .subscribe((res:any)=>{  
        Swal.close();  
                
        if (res.ok ==true) {  
          this.flag_modoEdicionCobranza  =true;
          this.IdCobranza_Global = res.data;

          if (this.filesVoucher.length > 0) {
            this.subirArchivo();
          }else{
            this.mostrarCobranzasCab();
          }

          this.alertasService.Swal_Success('Se agrego correctamente..');
          this.cerrarModalCobranza();
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },
      (error) => {    
        this.spinner.hide(); 
        alert(JSON.stringify(error));
      })
     
   }else{ /// editar
    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
     Swal.showLoading();    
    this.registroFacturasService.set_edit_cobranzas(this.formParamsFile.value , this.formParamsFile.value.IdTelefoniaDocCobrados)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {   

          if (this.filesVoucher.length > 0) {
            this.subirArchivo();
          }else{
            this.mostrarCobranzasCab();
          }

          this.alertasService.Swal_Success('Se actualizo correctamente..');
          this.cerrarModalCobranza();
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
 } 

editarCobranza({IdTelefoniaDocCobrados, IdTelefoniaDocumentos, FechaCobro, NroOperacion, ImporteCobrado, IdBanco,NombreArchivo, NombreArchivoServidor, UrlFile, IdTipoCobro}){
 
  this.voucher = [];
  this.filesVoucher= [];
  this.flag_modoEdicionCobranza  = true;
  this.IdCobranza_Global = IdTelefoniaDocCobrados;
 
   this.formParamsFile= new FormGroup({
      IdTelefoniaDocCobrados: new FormControl(IdTelefoniaDocCobrados),
      IdTelefoniaDocumentos: new FormControl(IdTelefoniaDocumentos),
      FechaCobro: new FormControl(new Date(FechaCobro)),
      NroOperacion: new FormControl(NroOperacion),
      ImporteCobrado: new FormControl(ImporteCobrado),
      IdBanco: new FormControl(IdBanco),
      Estado: new FormControl('001'),
      UsuarioCreacion: new FormControl(''),
      file: new FormControl(''),
      IdTipoCobro: new FormControl(IdTipoCobro),
   })
  
   if (NombreArchivoServidor) {
    this.voucher.push({ 'nombreArchivo' : NombreArchivo , 'fechaRegistro' : FechaCobro , 'UrlFile' : UrlFile , 'NombreArchivoServidor' : NombreArchivoServidor  }) ;
  }   

  setTimeout(()=>{ // 
      $('#modal_cobranza').modal('show');       
  },0);  

}

blank(){
  this.inicializarFormularioCobranza();
  this.flag_modoEdicionCobranza = false;
 }

  subirArchivo(){  
 
    this.spinner.show();
    this.uploadService.upload_fileCobranza( this.IdCobranza_Global, this.filesVoucher[0].file , this.idUserGlobal )
    .subscribe( (res:any) =>{
        this.spinner.hide();  
        if (res.ok==true) {
          //------enfocando el estado a registrado ----     
          this.alertasService.Swal_alert('success','Se adjunto el voucher correctamente.');
          this.blank();
          this.mostrarCobranzasCab();
        }else{
          alert(JSON.stringify(res.data));
        }
        },(err) => {
          this.spinner.hide();
          alert(JSON.stringify(err.data));
        }
    );

 }

 obtnerArchivoYacargado(nombreArchivo:string){
  var flagRepetida=false;
  for (const obj of this.cobranzasCab) {
    if (  obj.NombreArchivo == nombreArchivo ) {
         flagRepetida = true;
         break;
    }
  }
  return flagRepetida;
}


  descargarArchivoSeleccionado({UrlFile,NombreArchivoServidor}){ 
  
    const link = document.createElement('a');
  
    link.href = UrlFile;
    link.download = NombreArchivoServidor;
    link.target = '_blank';
    link.style.display = 'none';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  
  }

  eliminarArchivoSeleccionado(item:any){

    this.alertasService.Swal_Question('Sistemas', 'Esta seguro de eliminar ?')
    .then((result)=>{
      if(result.value){
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Eliminando, espere por favor'
        })
        Swal.showLoading();
        this.registroFacturasService.set_eliminar_archivoCobranza(item.IdTelefoniaDocCobrados).subscribe((res:RespuestaServer)=>{
            Swal.close();
            console.log(res);
            if (res.ok) {
                     this.alertasService.Swal_Success("Proceso realizado correctamente..")
                     var index = this.cobranzasCab.indexOf( item );
                     this.cobranzasCab.splice( index, 1 );
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

  ////----- DETRACCIONES

cerrarModalDetraccion(){
  setTimeout(()=>{ // 
    $('#modal_detraccion').modal('hide');  
  },0); 
}

 
verDetraccion(item:any){ 
  
  this.DetraccionFlag_global = 0;
  this.filesVoucher = [];
  this.voucher = [];  
  this.inicializarFormulario();  

  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
  Swal.showLoading(); 
  this.registroFacturasService.get_registroFacturaEdicion(item.IdTelefoniaDocumentos)
    .subscribe((res:RespuestaServer)=>{  
        Swal.close();        
      if (res.ok ==true) {      
 
         const {  IdTelefoniaDocumentos, IdTipoDocumento, NroDocumento, PubCcteRucCliente, PubMoneCodigo, ImporteTotal, TasaDetraccion, ImporteNeto, TotalCobrado, 
          Estado, FechaPagoDetraccion, NroOperacionDetraccion, ImporteDetraccion, VoucherNombreDetraccion, VoucherNombreServidorDetraccion, UrlFileDetraccion, DetraccionFlag } = res.data[0];

         this.flag_modoEdicion = true;
         this.IdDocumento_Global = IdTelefoniaDocumentos;
         this.DetraccionFlag_global = DetraccionFlag;
        
         const porcTasa = (TasaDetraccion/100);
         const impDetracc = (Number(ImporteNeto) * Number(porcTasa));

          this.formParams= new FormGroup({ 
            PubCcteRucCliente: new FormControl(PubCcteRucCliente), 
            IdTelefoniaDocumentos: new FormControl(IdTelefoniaDocumentos), 
            IdTipoDocumento: new FormControl(IdTipoDocumento), 
            NroDocumento: new FormControl(NroDocumento), 
            PubMoneCodigo: new FormControl(PubMoneCodigo), 
            ImporteTotal: new FormControl(Number(ImporteTotal).toFixed(2)), //----     
            ImporteNeto : new FormControl(Number(ImporteNeto).toFixed(2)), //----    
            TotalCobrado : new FormControl(Number(TotalCobrado).toFixed(2)), //----    
            TasaDetraccion: new FormControl(TasaDetraccion),

            FechaPagoDetraccion: new FormControl( (!FechaPagoDetraccion) ? new Date() : new Date(FechaPagoDetraccion) ), 
            NroOperacionDetraccion: new FormControl((!NroOperacionDetraccion)? '' : NroOperacionDetraccion ),
            ImporteDetraccion: new FormControl( (FechaPagoDetraccion) ?  ImporteDetraccion :  Number(impDetracc).toFixed(2)),

            file: new FormControl(''),
            Estado: new FormControl(Estado), 
            UsuarioCreacion: new FormControl(this.idUserGlobal),                    
         }) 

         if (VoucherNombreServidorDetraccion) {
            this.voucher.push({ 'nombreArchivo' : VoucherNombreDetraccion , 'fechaRegistro' : FechaPagoDetraccion , 'UrlFile' : UrlFileDetraccion , 'NombreArchivoServidor' : VoucherNombreServidorDetraccion  }) ;
          }   

          setTimeout(()=>{ // 
            $('#modal_detraccion').modal('show');        
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
 
 } 

async saveUpdateDetracciones(){ 
  
  if (this.formParams.value.FechaPagoDetraccion == '' || this.formParams.value.FechaPagoDetraccion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese o seleccione la fecha de Detraccion');
    return 
  }  
 
  if (this.formParams.value.NroOperacionDetraccion == '' || this.formParams.value.NroOperacionDetraccion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Nro de Operacion');
    return 
  } 

  if (this.formParams.value.ImporteDetraccion == '' || this.formParams.value.ImporteDetraccion == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Importe');
    return 
  } 

  if ( Number(this.formParams.value.ImporteDetraccion) == 0 ) {
    this.alertasService.Swal_alert('error','Por favor ingrese el Importe mayor a cero');
    return 
  } 
  if (this.voucher.length == 0) {
      if (this.filesVoucher.length ==0) {
        this.alertasService.Swal_alert('error','Por favor seleccione el voucher');
        return 
      }
  }

  const fecha = this.funcionGlobalServices.formatoFecha(this.formParams.value.FechaPagoDetraccion);

  this.formParams.patchValue({ "IdTelefoniaDocumentos" : this.IdDocumento_Global,   "UsuarioCreacion" : this.idUserGlobal });
  
  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
  Swal.showLoading();    
  this.registroFacturasService.set_save_edit_detracciones({...this.formParams.value , FechaPagoDetraccion :fecha })
    .subscribe((res:any)=>{  
      Swal.close();    
      if (res.ok ==true) {   

        this.DetraccionFlag_global = 1;
        if (this.filesVoucher.length > 0) {
           this.subirArchivo_Detracciones();
        } else{
          this.mostrarInformacion();
        }

        this.alertasService.Swal_Success('Se registro correctamente la detraccion..');

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

 
 subirArchivo_Detracciones(){  
  this.spinner.show();
  this.uploadService.upload_fileDetracciones( this.IdDocumento_Global, this.filesVoucher[0].file , this.idUserGlobal )
  .subscribe( (res:any) =>{
      this.spinner.hide();  
      if (res.ok==true) {
        //------enfocando el estado a registrado ----     
        this.alertasService.Swal_alert('success','Se adjunto el voucher correctamente.');
        this.mostrarInformacion();
      }else{
        alert(JSON.stringify(res.data));
      }
      },(err) => {
        this.spinner.hide();
        alert(JSON.stringify(err.data));
      }
  );

}

 
cerrarDetraccion(){    
  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de cerrar la detraccion ?')
  .then((result)=>{
    if(result.value){

      this.spinner.show();
      this.registroFacturasService.set_cerrarDetraccion(this.IdDocumento_Global, this.idUserGlobal )
      .subscribe((res:RespuestaServer)=>{     
        this.spinner.hide();      
        if (res.ok==true) {         
            this.cerrarModalDetraccion()
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
   }) 

  }

    ////----- FACTORING

cerrarModalFactoring(){
  setTimeout(()=>{ // 
    $('#modal_factoring').modal('hide');  
  },0); 
}

 
verFactoring(item:any){ 
  
  this.FactoringFlag_global = 0;
  this.inicializarFormulario();  

  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
  Swal.showLoading(); 
  this.registroFacturasService.get_registroFacturaEdicion(item.IdTelefoniaDocumentos)
    .subscribe((res:RespuestaServer)=>{  
        Swal.close();        
      if (res.ok ==true) {      
 
         const {  IdTelefoniaDocumentos, IdTipoDocumento, NroDocumento, PubCcteRucCliente, PubMoneCodigo, ImporteNeto , 
          PubCCteRuCFactoring, PorComisionFactoring, ImporteFactoring, FechaRegistroFactoring, FactoringFlag  } = res.data[0];

         this.flag_modoEdicion = true;
         this.IdDocumento_Global = IdTelefoniaDocumentos;
         this.FactoringFlag_global = FactoringFlag;
            
         const valorInter = (PorComisionFactoring==0)? 3 : Number(PorComisionFactoring);
         const porcInteres = (Number(valorInter)/100);
  
         const impAdelanto = ( Number(ImporteNeto) * 0.95);
         const totalInteres = ( Number(ImporteNeto) * porcInteres);
         const saldCobrar = ( Number(ImporteNeto) - impAdelanto - totalInteres);

          this.formParams= new FormGroup({ 
            PubCcteRucCliente: new FormControl(PubCcteRucCliente), 
            IdTelefoniaDocumentos: new FormControl(IdTelefoniaDocumentos), 
            IdTipoDocumento: new FormControl(IdTipoDocumento), 
            NroDocumento: new FormControl(NroDocumento), 
            PubMoneCodigo: new FormControl(PubMoneCodigo), 
               
            ImporteNeto : new FormControl(Number(ImporteNeto).toFixed(2)), //----   Factoring 
            saldoCobrar : new FormControl(Number(saldCobrar).toFixed(2)),
 
            PubCCteRuCFactoring: new FormControl((!FechaRegistroFactoring)? '0' : PubCCteRuCFactoring),
            PorComisionFactoring: new FormControl((!FechaRegistroFactoring)? '3' : PorComisionFactoring ),
            ImporteFactoring: new FormControl((!FechaRegistroFactoring)?  Number(impAdelanto).toFixed(2) :  Number(ImporteFactoring).toFixed(2) ),
            FechaRegistroFactoring: new FormControl( (!FechaRegistroFactoring)? new Date() :  new Date(FechaRegistroFactoring) ),

            totalInteresesFactoring : new FormControl( Number(totalInteres).toFixed(2)), //--- calculado 
            UsuarioCreacion: new FormControl(this.idUserGlobal),                    
         }) 

          setTimeout(()=>{ // 
            $('#modal_factoring').modal('show');        
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
 } 
    
 async saveUpdateFactoring(){ 
  
  if (this.formParams.value.PubCCteRuCFactoring == '0' || this.formParams.value.PubCCteRuCFactoring == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el proveedor');
    return 
  }   
  if (this.formParams.value.PorComisionFactoring == '' || this.formParams.value.PorComisionFactoring == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el porcentaje de interes');
    return 
  } 
  if ( Number(this.formParams.value.PorComisionFactoring) == 0 ) {
    this.alertasService.Swal_alert('error','El porcentaje de interes tiene que ser mayor a cero');
    return 
  } 

  if (this.formParams.value.ImporteFactoring == '' || this.formParams.value.ImporteFactoring == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el importe adelanto Factoring');
    return 
  } 
  if ( Number(this.formParams.value.ImporteFactoring) == 0 ) {
    this.alertasService.Swal_alert('error','El porcentaje de adelanto factoring tiene que ser mayor a cero');
    return 
  }   
  if (this.formParams.value.FechaRegistroFactoring == '' || this.formParams.value.FechaRegistroFactoring == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese o seleccione la fecha de registro');
    return 
  }  

  const fecha = this.funcionGlobalServices.formatoFecha(this.formParams.value.FechaRegistroFactoring);
  this.formParams.patchValue({ "IdTelefoniaDocumentos" : this.IdDocumento_Global,   "UsuarioCreacion" : this.idUserGlobal });
  
  Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
  Swal.showLoading();    
  this.registroFacturasService.set_save_edit_factoring({...this.formParams.value , FechaRegistroFactoring :fecha })
    .subscribe((res:any)=>{  
      Swal.close();    
      if (res.ok ==true) {   
        this.FactoringFlag_global = 1;
        this.mostrarInformacion();
        this.alertasService.Swal_Success('Se registro correctamente el Factoring..');
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

 cerrarFactoring(){    
  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de cerrar el factoring ?')
  .then((result)=>{
    if(result.value){

      this.spinner.show();
      this.registroFacturasService.set_cerrarFactoring(this.IdDocumento_Global, this.idUserGlobal )
      .subscribe((res:RespuestaServer)=>{     
        this.spinner.hide();      
        if (res.ok==true) {         
            this.cerrarModalFactoring()
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
   }) 

  }

  calcularTotalesFactoring(): void {

    const ImpNeto  = (this.formParams.value.ImporteNeto =='') ? 0 : Number(this.formParams.value.ImporteNeto);
    const impAdelanto = (this.formParams.value.ImporteFactoring == '') ? 0 : Number(this.formParams.value.ImporteFactoring);

    const valorInteres  = (this.formParams.value.PorComisionFactoring =='') ? 0 : Number(this.formParams.value.PorComisionFactoring);
    const porcInteres = (Number(valorInteres)/100);
 
    const totalInteres = ( Number(ImpNeto) * porcInteres);
    const saldCobrar = ( Number(ImpNeto) - impAdelanto - totalInteres);

    this.formParams.patchValue({ "saldoCobrar" :  Number(saldCobrar).toFixed(2) ,  "totalInteresesFactoring" :  Number(totalInteres).toFixed(2)  })

  }


}
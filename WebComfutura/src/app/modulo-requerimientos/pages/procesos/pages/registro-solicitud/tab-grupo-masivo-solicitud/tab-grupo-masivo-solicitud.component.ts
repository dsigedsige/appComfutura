 

import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../../services/login/login.service';
 
 
import { RespuestaServer } from '../../../../../../models/respuestaServer.models';
import { Subscription, combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
 
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { RegistroOTService } from 'src/app/services/requerimientos/procesos/registroOT.service';
import Swal from 'sweetalert2';
import { RegistroRequerimientoService } from 'src/app/services/requerimientos/procesos/registroRequerimiento.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { RegistroSolicitudService } from 'src/app/services/requerimientos/procesos/registroSolicitud.service';

declare var $:any;

@Component({
  selector: 'app-tab-grupo-masivo-solicitud',
  templateUrl: './tab-grupo-masivo-solicitud.component.html',
  styleUrls: ['./tab-grupo-masivo-solicitud.component.css']
})
export class TabGrupoMasivoSolicitudComponent implements OnInit , OnDestroy {

  formParams: FormGroup;
  datepiekerConfig:Partial<BsDatepickerConfig>;
  idUserGlobal :string = '';
  filtrar :string = '';
  datosTabs:any[]=[];

  partidas:any[]=[];

  unidadMedidas:any[]=[];
  tiposDocumentosPersonal:any[]=[];
  monedas:any[]=[];
  bancos:any[]=[];  
  personalesFiltrada:any[]=[];
  personales:any[]=[];
  tiposConcepto:any[]=[];

  flag_modoEdicion :boolean =false;
  totalDias :number =0;
  
  totalMovilidad :number =0;
  totalPasajes :number =0;
  totalCaja :number =0;
  idTabGlobal:number =0;

  @Input() IdSolicitudGlobal= 0;
  @Input() IdTipoTabsGlobal= 0;
  private formRequerimientoSubcription : Subscription;

  totalGeneralPres:string = '0';
  totalGeneralReq :string = '0';
  saldoGeneralPend :string = '0';

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroRequerimientoService : RegistroRequerimientoService , private registroSolicitudService : RegistroSolicitudService ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formRequerimientoSubcription = this.registroSolicitudService.fichasSolicitud$.subscribe(()=>{
      this.totalDias = 0;
      this.mostrarTabGrupos();
    }) 

    this.totalDias = 0;
    this.inicializarFormulario();
    this.flag_modoEdicion = false;
    this.getCargarCombos() 
  }
  
  ngOnDestroy() {
    this.formRequerimientoSubcription.unsubscribe(); 
  }
  
  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_unidadesMedidas() , this.combosService.get_tipoDocPersonal(), this.combosService.get_monedas(), this.combosService.get_bancos() , 
      this.combosService.get_tiposConceptos()  ])
    .subscribe( ([ _unidadMedidas, _tiposDocumentosPersonal, _monedas, _bancos, _tipoConcepto ])=>{     
      this.spinner.hide();   
      this.unidadMedidas = _unidadMedidas;
      this.tiposDocumentosPersonal = _tiposDocumentosPersonal;
      this.monedas = _monedas;
      this.bancos = _bancos;
      this.tiposConcepto = _tipoConcepto;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }

  inicializarFormulario(){ 
    this.formParams= new FormGroup({  
      IdSolicitudTabs: new FormControl('0'),  
      IdSolicitud: new FormControl(this.IdSolicitudGlobal),   
      IdTipoTabs: new FormControl(this.IdTipoTabsGlobal),  
      IdTipoMovCaja: new FormControl('0'),  
      DescripcionDetallada: new FormControl(''),  
      AlmUmedCodigo: new FormControl('004'),  

      CantidadPresupuesto: new FormControl('0'),  
      PrecioPresupuesto: new FormControl('0'),  
      CostoPresupuesto: new FormControl('0'),  

      CantidadSolicitud: new FormControl(''),  
      PrecioSolicitud: new FormControl(''),  
      CostoSolicitud: new FormControl(''),  
      
      IdTipoPersonal: new FormControl('0'),  
      NroDocPersonal: new FormControl('0'),  
      IdBanco: new FormControl('0'),  
      PubMoneCodigo: new FormControl('01'), 

      CuentaBanco: new FormControl(''),  
      CuentaInterbancarioBanco: new FormControl(''),  
      ObsRendicion: new FormControl(''), 
      Estado1: new FormControl('001'),  
      UsuarioCreacion: new FormControl(this.idUserGlobal),  
    }) 
 }

 keyPress(event: any) {
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }

  changeTipoDocPersonal(e:any) {
 
    if (this.formParams.value.IdTipoPersonal == '0') {
       return ;
    }

    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
    })
    Swal.showLoading();
    this.registroRequerimientoService.get_personalTipoDoc( this.formParams.value.IdTipoPersonal)
    .subscribe((res:RespuestaServer)=>{     
      Swal.close();
      if (res.ok==true) {         
          this.personales = res.data;
          this.personalesFiltrada = this.funcionGlobalServices.matrizElementosUnicos(this.personales, 'nroDoc')
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

  changeRucDni(e:any) {
 
    if (this.formParams.value.NroDocPersonal == '0') {
      this.formParams.patchValue({"IdBanco": '0', "PubMoneCodigo": '' , "CuentaBanco": '' , "CuentaInterbancarioBanco": ''}); 
       return ;
    }

    const personales = this.personalesFiltrada.find( p => p.nroDoc == this.formParams.value.NroDocPersonal );

     if (personales){
      this.formParams.patchValue({"IdBanco": personales.id_Banco, "PubMoneCodigo": personales.pub_mone_codigo , "CuentaBanco": personales.cuentaCorriente  , "CuentaInterbancarioBanco": personales.CCI  }); 
     }else{
      this.formParams.patchValue({"IdBanco": '0', "PubMoneCodigo": '' , "CuentaBanco": '' , "CuentaInterbancarioBanco": ''}); 
     }
 
  }
 
  changeBancoMoneda(e:any) {
 
    if (this.formParams.value.NroDocPersonal == '0') {
      this.formParams.patchValue({"IdBanco": '0', "PubMoneCodigo": '' , "CuentaBanco": '' , "CuentaInterbancarioBanco": ''}); 
       return ;
    }

    const personales = this.personales.find( p => p.nroDoc == this.formParams.value.NroDocPersonal &&  p.id_Banco == this.formParams.value.IdBanco &&  p.pub_mone_codigo == this.formParams.value.PubMoneCodigo    );

     if (personales){
      this.formParams.patchValue({"IdBanco": personales.id_Banco, "PubMoneCodigo": personales.pub_mone_codigo , "CuentaBanco": personales.cuentaCorriente  , "CuentaInterbancarioBanco": personales.CCI  }); 
     }else{
      this.formParams.patchValue({ "CuentaBanco": '' , "CuentaInterbancarioBanco": ''}); 
     }
 
  }

  changeCantidadPrecio(e:any){

    const cant = (this.formParams.value.CantidadSolicitud =='') ? 0 : this.formParams.value.CantidadSolicitud ;
    const prec = (this.formParams.value.PrecioSolicitud =='') ? 0 : this.formParams.value.PrecioSolicitud ;
    const total = ( Number(cant)  * Number(prec));

    this.formParams.patchValue({ "CostoSolicitud": total}); 

  }
 
 mostrarTabGrupos(){ 
 
    this.spinner.show();
    this.registroSolicitudService.get_mostrarTabsGruposSolicitud( this.IdSolicitudGlobal, this.IdTipoTabsGlobal)
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.datosTabs = res.data;      
          this.blank_Detalle();
          this.calcularTotales();

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

  calcularTotales(){

    let totalMov = 0;
    let totalPas = 0;
    let totalCaj = 0;

    this.totalGeneralPres = '0';
    this.totalGeneralReq = '0';
    this.saldoGeneralPend = '0';

    if( this.IdTipoTabsGlobal == 5){
      if ( this.datosTabs.length > 0) {     
        this.totalGeneralPres = Number(this.datosTabs[0].TotalGeneralPresupuesto).toFixed(4)
        this.totalGeneralReq = Number(this.datosTabs[0].TotalGeneralRequerimiento).toFixed(4)
        this.saldoGeneralPend = Number(this.datosTabs[0].SaldoGeneralPendiente).toFixed(4)
      }
    }

    if( this.IdTipoTabsGlobal == 6){
      for (let item of this.datosTabs ){
        if (item.IdTipoMovCaja == '437') {
          totalMov += (!item.CostoSolicitud)? 0 : Number(item.CostoSolicitud);
        }
        if (item.IdTipoMovCaja == '438') {
          totalPas += (!item.CostoSolicitud)? 0 : Number(item.CostoSolicitud);
        }
        if (item.IdTipoMovCaja == '439') {
          totalCaj += (!item.CostoSolicitud)? 0 : Number(item.CostoSolicitud);
        }
      }
      this.totalMovilidad = totalMov;
      this.totalPasajes = totalPas;
      this.totalCaja = totalCaj;
    }


  }
  
  blank_Detalle() {
    this.flag_modoEdicion = false;
    this.idTabGlobal = 0;
    this.inicializarFormulario();
  }


  async saveUpdateDet(){ 

    this.formParams.patchValue({ "IdSolicitud" :this.IdSolicitudGlobal, "UsuarioCreacion" : this.idUserGlobal });

    if (this.formParams.value.IdSolicitud == '0' || this.formParams.value.IdSolicitud == 0) {
      this.alertasService.Swal_alert('error','No se cargo el ID del requerimiento, actualice la pagina he intente nuevamente..');
      return 
    } 

    if (  this.IdTipoTabsGlobal == 6) { //---MOV CAJAS PASAJES VIATICOS
      if (this.formParams.value.IdTipoMovCaja == '0' || this.formParams.value.IdTipoMovCaja == 0) {
        this.alertasService.Swal_alert('error','Por favor seleccione el Tipo de concepto');
        return 
      }  
    }
   
    if (this.formParams.value.DescripcionDetallada == '' || this.formParams.value.DescripcionDetallada == null) {

      if (this.IdTipoTabsGlobal == 4) {  //---CONTRATISTAS
        this.alertasService.Swal_alert('error','Por favor ingrese la descripcion detallada');
        return 
      }
      if (this.IdTipoTabsGlobal == 5 || this.IdTipoTabsGlobal == 6) {
        this.alertasService.Swal_alert('error','Por favor ingrese el concepto del gasto');
        return 
      }
    } 

    if (this.formParams.value.AlmUmedCodigo == '0' || this.formParams.value.AlmUmedCodigo == 0) {
      this.alertasService.Swal_alert('error','Por favor seleccione la unidad medida');
      return 
    }  

    if (this.formParams.value.CantidadSolicitud == '') {
      this.alertasService.Swal_alert('error','Por favor ingrese la cantidad');
      return ;
    } 
    if (Number(this.formParams.value.CantidadSolicitud) == 0 ) {
      this.alertasService.Swal_alert('error','La cantidad debe ser mayor a cero.');
      return ;
    } 
    if (Number(this.formParams.value.CantidadSolicitud) < 0 ) {
      this.alertasService.Swal_alert('error','La cantidad debe ser mayor a cero.');
      return ;
    } 
    if ( this.flag_modoEdicion==true) {
      if (Number(this.formParams.value.CantidadPresupuesto)>0 ) { ///---solo aplican a los que CantidadPresupuesto tiene dato
        if (Number(this.formParams.value.CantidadSolicitud ) > Number(this.formParams.value.CantidadPresupuesto) ) {
          this.alertasService.Swal_alert('error','La cantidad no puede ser mayor a : ' + this.formParams.value.CantidadPresupuesto);
          return ;
        } 
      }
    }

    if (this.formParams.value.PrecioSolicitud == '') {
      this.alertasService.Swal_alert('error','Por favor ingrese el Precio');
      return ;
    } 
    if (Number(this.formParams.value.PrecioSolicitud) == 0 ) {
      this.alertasService.Swal_alert('error','El precio debe ser mayor a cero.');
      return ;
    } 
    if (Number(this.formParams.value.PrecioSolicitud) < 0 ) {
      this.alertasService.Swal_alert('error','El precio debe ser mayor a cero.');
      return ;
    } 

    if ( this.flag_modoEdicion==true) {
      if (Number(this.formParams.value.PrecioPresupuesto)>0 ) { ///---solo aplican a los que PrecioPresupuesto tiene dato
        if (Number(this.formParams.value.PrecioSolicitud ) > Number(this.formParams.value.PrecioPresupuesto) ) {
          this.alertasService.Swal_alert('error','El precio no puede ser mayor a : ' + this.formParams.value.PrecioPresupuesto);
          return ;
        } 
      }
    }

  ///---- validacion montos -------
    let totalCostoGrilla=0; 
    let totalCostoValidacion=0;

    if (this.idTabGlobal ==0 ){ //// nuevo
      this.datosTabs.forEach((a)=>{totalCostoGrilla += Number(a.CostoSolicitud)});
    }else{ ///edicion
      this.datosTabs.forEach((a)=>{
        if (a.IdSolicitudTabs !=this.idTabGlobal ) {
          totalCostoGrilla += Number(a.CostoSolicitud);
        }
      });
    }

    totalCostoValidacion = (totalCostoGrilla + Number(this.formParams.value.CostoSolicitud));

    if (this.datosTabs.length >0) {
      if (totalCostoValidacion > Number(this.totalGeneralPres)) {
        this.alertasService.Swal_alert('error','La sumatoria del Costo Total Requerimiento es mayor al Costo Total del Presupuesto, verifique..');
        return ;
      }
    }
  ///---- fin validacion  montos -------


  
    if ( this.flag_modoEdicion==false) { //// nuevo  
   
      Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
      Swal.showLoading(); 
      this.registroSolicitudService.set_save_tabsGrupoSolicitud(this.formParams.value)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {     
            this.mostrarTabGrupos();
            this.alertasService.Swal_Success('Se agrego correctamente ..');   
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
      this.registroSolicitudService.set_edit_tabsGrupoSolicitud(this.formParams.value , this.formParams.value.IdSolicitudTabs)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {     
            this.mostrarTabGrupos();
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

 
  editarDet({IdSolicitudTabs, IdSolicitud, IdTipoTabs, IdTipoMovCaja, DescripcionDetallada, AlmUmedCodigo, CantidadSolicitud, PrecioSolicitud, CostoSolicitud, 
              IdTipoPersonal, NroDocPersonal, IdBanco, PubMoneCodigo, CuentaBanco, CuentaInterbancarioBanco, Estado, CantidadPresupuesto, PrecioPresupuesto, CostoPresupuesto, ObsRendicion
            }){ 
 
      this.flag_modoEdicion = true;
      this.idTabGlobal = IdSolicitudTabs;
 
      Swal.fire({
        icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
      })
      Swal.showLoading();
      this.registroRequerimientoService.get_personalTipoDoc(IdTipoPersonal)
      .subscribe((res:RespuestaServer)=>{     
        Swal.close();
        if (res.ok==true) {      
             
            this.personales = res.data;
            this.personalesFiltrada = this.funcionGlobalServices.matrizElementosUnicos(this.personales, 'nroDoc');

            const cantSolic = CantidadSolicitud==''? 0 : Number(CantidadSolicitud);
            const precSolic = PrecioSolicitud==''? 0 : Number(PrecioSolicitud);
            const costSolic = CostoSolicitud==''? 0 : Number(CostoSolicitud);

            const cantpre = CantidadPresupuesto ==''? 0 : Number(CantidadPresupuesto);
            const precpre = PrecioPresupuesto ==''? 0 : Number(PrecioPresupuesto);
            const costpre = CostoPresupuesto ==''? 0 : Number(CostoPresupuesto);

            this.formParams= new FormGroup({
              IdSolicitudTabs: new FormControl(IdSolicitudTabs),  
              IdSolicitud: new FormControl(this.IdSolicitudGlobal),   
              IdTipoTabs: new FormControl(this.IdTipoTabsGlobal),  
              IdTipoMovCaja: new FormControl(IdTipoMovCaja),  
              DescripcionDetallada: new FormControl(DescripcionDetallada),          
              AlmUmedCodigo: new FormControl(AlmUmedCodigo),  

              CantidadPresupuesto: new FormControl(cantpre),  
              PrecioPresupuesto: new FormControl(precpre),  
              CostoPresupuesto: new FormControl(costpre),  

              CantidadSolicitud: new FormControl(cantSolic),  
              PrecioSolicitud: new FormControl(precSolic),  
              CostoSolicitud: new FormControl(costSolic),  
              
              IdTipoPersonal: new FormControl(IdTipoPersonal),  
              NroDocPersonal: new FormControl(NroDocPersonal),  
              IdBanco: new FormControl(IdBanco),  
              PubMoneCodigo: new FormControl(PubMoneCodigo), 
        
              CuentaBanco: new FormControl(CuentaBanco),  
              CuentaInterbancarioBanco: new FormControl(CuentaInterbancarioBanco),  
              ObsRendicion: new FormControl(ObsRendicion),  

              Estado1: new FormControl(Estado),  
              UsuarioCreacion: new FormControl(this.idUserGlobal),  
            })  

            setTimeout(()=>{ // 
              this.formParams.patchValue({ "NroDocPersonal" : NroDocPersonal  });                   
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

  eliminarDet(item: any) {
    this.alertasService.Swal_Question('Sistemas', 'Esta seguro de eliminar, ya no hay marcha atras ?')
    .then((result)=>{
      if(result.value){

        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
        })
        Swal.showLoading();
        this.registroSolicitudService.set_eliminar_tabsGrupoSolicitud(item.IdSolicitudTabs).subscribe((res: RespuestaServer) => {
          Swal.close();
          if (res.ok) {
            this.mostrarTabGrupos();
          } else {
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
        })

      }
    }) 
  }

  anularDet(item: any) {
    this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular.. ?')
    .then((result)=>{
      if(result.value){

        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
        })
        Swal.showLoading();
        this.registroSolicitudService.set_anular_tabsGrupoSolicitud(item.IdSolicitudTabs, this.idUserGlobal).subscribe((res: RespuestaServer) => {
          Swal.close();
          if (res.ok) {
            this.mostrarTabGrupos();
          } else {
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
        })

      }
    }) 
  }

  openModalAsignar(){


    let flagMarcado = false;
    flagMarcado = this.funcionGlobalServices.verificarCheck_marcado(this.datosTabs);

    if (flagMarcado == false) {
      this.alertasService.Swal_alert('error','Por favor debe marcar un elemento de la Tabla');
      return ;
    } 

    this.blank_Detalle();

    setTimeout(()=>{ // 
      $('#modal_personal').modal('show');  
    },0); 
  }

  cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_personal').modal('hide');  
    },0); 
 }

 
 asignarPersonalMasivo() {
  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de asignar ?')
  .then((result)=>{
    if(result.value){

      const idSolicitudesTabs = this.funcionGlobalServices.obtenerCheck_IdPrincipal(this.datosTabs,'IdSolicitudTabs');

      Swal.fire({
        icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
      })
      Swal.showLoading();
      this.registroSolicitudService.set_save_tabsGrupoSolicitud_masivo(idSolicitudesTabs, this.IdSolicitudGlobal, this.idUserGlobal, this.formParams.value).subscribe((res: RespuestaServer) => {
        Swal.close();
        if (res.ok) {
          this.alertasService.Swal_alert('success','Se asigno correctamente'); 
          this.cerrarModal();
          this.mostrarTabGrupos();
        } else {
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      })

    }
  }) 
}





}

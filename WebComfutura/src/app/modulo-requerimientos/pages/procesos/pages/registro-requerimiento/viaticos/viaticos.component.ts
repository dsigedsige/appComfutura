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
import Swal from 'sweetalert2';
import { RegistroRequerimientoService } from 'src/app/services/requerimientos/procesos/registroRequerimiento.service';
 

declare var $:any;

@Component({
  selector: 'app-viaticos',
  templateUrl: './viaticos.component.html',
  styleUrls: ['./viaticos.component.css']
})
export class ViaticosComponent implements OnInit , OnDestroy {

  formParams: FormGroup;
  datepiekerConfig:Partial<BsDatepickerConfig>;
  idUserGlobal :string = '';
  filtrar :string = '';
  datosTabs:any[]=[];

  partidas:any[]=[];
  tiposDocumentosPersonal:any[]=[];
  monedas:any[]=[];
  bancos:any[]=[];  
  personalesFiltrada:any[]=[];
  personales:any[]=[];
 

  flag_modoEdicion :boolean =false;
  total:number =0;

  @Input() IdRequerimientoGlobal= 0;
  @Input() IdTipoTabsGlobal= 0;
  private formRequerimientoSubcription : Subscription;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroRequerimientoService : RegistroRequerimientoService  ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formRequerimientoSubcription = this.registroRequerimientoService.fichasRequerimiento$.subscribe(()=>{
      this.total = 0;
      this.mostrarViaticos();
    }) 

    this.total = 0;
    this.inicializarFormulario();
    this.flag_modoEdicion = false;
    this.getCargarCombos() 
  }
  
  ngOnDestroy() {
    this.formRequerimientoSubcription.unsubscribe(); 
  }
  
  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([this.combosService.get_tipoDocPersonal(), this.combosService.get_monedas(), this.combosService.get_bancos()  ])
    .subscribe( ([  _tiposDocumentosPersonal, _monedas, _bancos ])=>{     
      this.spinner.hide();   
      this.tiposDocumentosPersonal = _tiposDocumentosPersonal.filter(t => t.id != 434);
      this.monedas = _monedas;
      this.bancos = _bancos;
 
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }

  inicializarFormulario(){ 
    this.formParams= new FormGroup({  
      IdTabs: new FormControl('0'),  
      IdRequerimiento: new FormControl(this.IdRequerimientoGlobal),   
      IdTipoTabs: new FormControl( this.IdTipoTabsGlobal),  
      IdTipoMovCaja: new FormControl('0'),  
      DescripcionDetallada: new FormControl(''),  

      AlmUmedCodigo: new FormControl('0'),  
      CantidadPresupuesto: new FormControl('1'),  
      PrecioPresupuesto: new FormControl(''),  
      CostoPresupuesto: new FormControl('0'),  
      Fecha: new FormControl(new Date()),  
      
      IdtipoPersonal: new FormControl('0'),  
      NroDocPersonal: new FormControl('0'),  
      IdBanco: new FormControl('0'),  
      PubMoneCodigo: new FormControl('0'), 

      CuentaBanco: new FormControl(''),  
      CuentaInterbancarioBanco: new FormControl(''),  
      Estado: new FormControl('001'),  
      UsuarioCreacion: new FormControl(this.idUserGlobal),  
    }) 
 }

 keyPress(event: any) {
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }

  changeTipoDocPersonal(e:any) {
 
    if (this.formParams.value.IdtipoPersonal == '0') {
       return ;
    }

    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
    })
    Swal.showLoading();
    this.registroRequerimientoService.get_personalTipoDoc( this.formParams.value.IdtipoPersonal)
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

    const cant = (this.formParams.value.CantidadPresupuesto =='') ? 0 : this.formParams.value.CantidadPresupuesto ;
    const prec = (this.formParams.value.PrecioPresupuesto =='') ? 0 : this.formParams.value.PrecioPresupuesto ;
    const total = ( Number(cant)  * Number(prec));

    this.formParams.patchValue({ "CostoPresupuesto": total}); 

  }
 
 mostrarViaticos(){ 
 
    this.spinner.show();
    this.registroRequerimientoService.get_mostrarTabsGrupos( this.IdRequerimientoGlobal, this.IdTipoTabsGlobal)
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

    let totalC = 0;

    for (let item of this.datosTabs ){
      totalC += (!item.CostoPresupuesto)? 0 : Number(item.CostoPresupuesto); 
    }
    this.total = totalC;

  }
  
  blank_Detalle() {
    this.flag_modoEdicion = false;
    this.inicializarFormulario();
  }


  async saveUpdateDet(){ 

    this.formParams.patchValue({ "IdRequerimiento" :this.IdRequerimientoGlobal, "UsuarioCreacion" : this.idUserGlobal });

    if (this.formParams.value.IdRequerimiento == '0' || this.formParams.value.IdRequerimiento == 0) {
      this.alertasService.Swal_alert('error','No se cargo el ID del requerimiento, actualice la pagina he intente nuevamente..');
      return 
    }  
 
    if (this.formParams.value.IdtipoPersonal == '0' || this.formParams.value.IdtipoPersonal == 0) {
      this.alertasService.Swal_alert('error','Por favor seleccione el Tipo Doc');
      return 
    }  

    if (this.formParams.value.NroDocPersonal == '0' || this.formParams.value.NroDocPersonal == 0) {
      this.alertasService.Swal_alert('error','Por favor seleccione numero de documento ');
      return 
    }  
    if (this.formParams.value.FechaFechaCosto == '' || this.formParams.value.Fecha == null) {
      this.alertasService.Swal_alert('error','Por favor seleccione la fecha ');
      return 
    } 
   
    if (this.formParams.value.PrecioPresupuesto == '') {
      this.alertasService.Swal_alert('error','Por favor ingrese el Costo');
      return ;
    } 
    if (Number(this.formParams.value.PrecioPresupuesto) == 0 ) {
      this.alertasService.Swal_alert('error','El costo debe ser mayor a cero.');
      return ;
    } 
    if (Number(this.formParams.value.PrecioPresupuesto) < 0 ) {
      this.alertasService.Swal_alert('error','El costo debe ser mayor a cero.');
      return ;
    } 


    if ( this.flag_modoEdicion==false) { //// nuevo  
   
      Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
      Swal.showLoading(); 
      this.registroRequerimientoService.set_save_tabsGrupo(this.formParams.value)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {  
   
            this.mostrarViaticos();
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
      this.registroRequerimientoService.set_edit_tabsGrupo(this.formParams.value , this.formParams.value.IdTabs)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {     
            this.mostrarViaticos();
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

 
  editarDet({IdTabs, IdRequerimiento, IdTipoTabs, IdTipoMovCaja, DescripcionDetallada, AlmUmedCodigo, CantidadPresupuesto, PrecioPresupuesto, CostoPresupuesto, 
              IdtipoPersonal, NroDocPersonal, IdBanco, PubMoneCodigo, CuentaBanco, CuentaInterbancarioBanco, Estado , Fecha}){ 
 
      this.flag_modoEdicion = true;

      Swal.fire({
        icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
      })
      Swal.showLoading();
      this.registroRequerimientoService.get_personalTipoDoc(IdtipoPersonal)
      .subscribe((res:RespuestaServer)=>{     
        Swal.close();
        if (res.ok==true) {         
            this.personales = res.data;
            this.personalesFiltrada = this.funcionGlobalServices.matrizElementosUnicos(this.personales, 'nroDoc');

            const precpre = PrecioPresupuesto==''? 0 : Number(PrecioPresupuesto);
            const costpre = PrecioPresupuesto==''? 0 : Number(CostoPresupuesto);

            this.formParams= new FormGroup({
              IdTabs: new FormControl(IdTabs),  
              IdRequerimiento: new FormControl(this.IdRequerimientoGlobal),   
              IdTipoTabs: new FormControl(this.IdTipoTabsGlobal),  
              IdTipoMovCaja: new FormControl(IdTipoMovCaja),  
              DescripcionDetallada: new FormControl(DescripcionDetallada),  
        
              AlmUmedCodigo: new FormControl(AlmUmedCodigo),  
              CantidadPresupuesto: new FormControl(CantidadPresupuesto),  
              PrecioPresupuesto: new FormControl(precpre),  
              CostoPresupuesto: new FormControl(costpre),  
              Fecha: new FormControl( new Date(Fecha)),  

              IdtipoPersonal: new FormControl(IdtipoPersonal),  
              NroDocPersonal: new FormControl(NroDocPersonal),  
              IdBanco: new FormControl(IdBanco),  
              PubMoneCodigo: new FormControl(PubMoneCodigo), 
        
              CuentaBanco: new FormControl(CuentaBanco),  
              CuentaInterbancarioBanco: new FormControl(CuentaInterbancarioBanco),  
              Estado: new FormControl('001'),  
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
        this.registroRequerimientoService.set_eliminar_tabsGrupo(item.IdTabs).subscribe((res: RespuestaServer) => {
          Swal.close();
          if (res.ok) {
            this.mostrarViaticos();
          } else {
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
          this.calcularTotales();
        })

      }
    }) 
  }



}

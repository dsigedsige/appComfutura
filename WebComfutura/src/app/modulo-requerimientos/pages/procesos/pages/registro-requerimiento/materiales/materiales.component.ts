 


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
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit, OnDestroy {

  formParams: FormGroup;
  datepiekerConfig:Partial<BsDatepickerConfig>;
  idUserGlobal :string = '';
  filtrar :string = '';

  materialesElegidos:any[]=[];
  materialesDet:any[]=[];

  flag_modoEdicion :boolean =false;
  totalSoles :number =0;

  @Input() IdRequerimientoGlobal= 0;
  private formRequerimientoSubcription : Subscription;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroRequerimientoService : RegistroRequerimientoService  ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formRequerimientoSubcription = this.registroRequerimientoService.fichasRequerimiento$.subscribe(()=>{
      this.totalSoles = 0;
      this.mostrarMaterialesCab();
    }) 

    this.totalSoles = 0;
    this.flag_modoEdicion = false;
  }
  
  ngOnDestroy() {
    this.formRequerimientoSubcription.unsubscribe(); 
  }

 keyPress(event: any) {
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }
   
  
 mostrarMaterialesCab(){  
    this.spinner.show();
    this.registroRequerimientoService.get_mostrarMaterialesCab( this.IdRequerimientoGlobal)
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.materialesElegidos = res.data;
          this.calcularTotalesSoles();
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

  calcularTotalesSoles(){
 
    let total = 0;

    for (let item of this.materialesElegidos ){
      total += (!item.TotalPresupuesto)? 0 : Number(item.TotalPresupuesto);
    }

    this.totalSoles = total;
  }


  mostrarMateriales(){  
    Swal.fire({
      icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Cargando Materiales, Espere por favor'
    })
    this.registroRequerimientoService.get_mostrarMateriales( this.idUserGlobal)
    .subscribe((res:RespuestaServer)=>{     
      Swal.close();     
      if (res.ok==true) {         
          this.materialesDet = res.data;
           
          setTimeout(()=>{ // 
            this.filtrar = '';
            $('#modal_material').modal('show');  
          },0); 

      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      Swal.close();
      alert(JSON.stringify(error));
    })
  }  


  async agregarMaterial(){ 

    let flagMarcado = false;
    flagMarcado = this.funcionGlobalServices.verificarCheck_marcado(this.materialesDet);

    if (flagMarcado == false) {
      this.alertasService.Swal_alert('error','Por favor debe marcar un elemento de la Tabla');
      return ;
    } 

    const codigos = this.funcionGlobalServices.obtenerCheck_IdPrincipal(this.materialesDet,'codigoMaterial');
    const codigosUnicos = this.funcionGlobalServices.compararMatrices_v2(codigos, this.materialesElegidos, 'AlmArtiCodigo' );

    if (codigosUnicos.length > 0) {
      Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
      Swal.showLoading(); 
      this.registroRequerimientoService.set_save_material( codigosUnicos , this.IdRequerimientoGlobal,this.idUserGlobal)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {   
            this.alertasService.Swal_alert('success','Se agrego los materiales elegidos, complete las cantidades...');
            this.cerrarModal();
            this.mostrarMaterialesCab(); 
          }else{
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
        },
        (error) => {    
          Swal.close();  
          alert(JSON.stringify(error));
        })
    }else{
      this.alertasService.Swal_alert('error','Ya se agrego el Material elegido, verifique..');
    }

   } 


   onEnterCantidadMaterial(e:any, obj:any, idInput : number){ 
     
      const { IdReqMaterial , AlmArtiCodigo, CantidadPresupuesto, CostoPresupuesto } = obj;

      if (CantidadPresupuesto == '') {
        this.alertasService.Swal_alert('error','Por favor ingrese la cantidad');
        return ;
      } 

      if (Number(CantidadPresupuesto) == 0 ) {
        this.alertasService.Swal_alert('error','La cantidad debe ser mayor a cero.');
        return ;
      } 
      if (Number(CantidadPresupuesto) < 0 ) {
        this.alertasService.Swal_alert('error','La cantidad debe ser mayor a cero.');
        return ;
      } 

      this.actualizarCantidadMaterial( IdReqMaterial , AlmArtiCodigo, CantidadPresupuesto, CostoPresupuesto, idInput, obj);     
   }
  
   actualizarCantidadMaterial( IdReqMaterial : number , AlmArtiCodigo :string, CantidadPresupuesto :string, CostoPresupuesto :string, idInput : number, obj:any) {
      Swal.fire({
        icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
      })
      Swal.showLoading();
      this.registroRequerimientoService.set_actualizarCantidadMaterial( IdReqMaterial, AlmArtiCodigo, CantidadPresupuesto,  CostoPresupuesto, this.idUserGlobal)
      .subscribe((res: RespuestaServer) => {
        Swal.close();
        if (res.ok) {

          obj.TotalPresupuesto = (Number(CantidadPresupuesto) * Number(CostoPresupuesto));
    
          setTimeout(() => { // enfocando
            this.alertasService.Swal_alert('success', 'Se actualizo la cantidad.');          
            $( "#IdReqMaterial" + (idInput + 1) ).focus();
          }, 100);

          this.calcularTotalesSoles();
    
        } else {
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }     
      },(error) => {    
        this.spinner.hide(); 
        alert(JSON.stringify(error));
      })
  } 
 

  eliminarMaterial(item: any) {
    this.alertasService.Swal_Question('Sistemas', 'Esta seguro de eliminar ?')
    .then((result)=>{
      if(result.value){

        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false,  text: 'Espere por favor'
        })
        Swal.showLoading();
        this.registroRequerimientoService.set_eliminar_material(item.IdReqMaterial).subscribe((res: RespuestaServer) => {
          Swal.close();
          if (res.ok) {
            var index = this.materialesElegidos.indexOf(item);
            this.materialesElegidos.splice(index, 1);
          } else {
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
          this.calcularTotalesSoles();
        },
        (error) => {    
          Swal.close();
          alert(JSON.stringify(error));
        })

      }
    }) 
  }

  cerrarModal(){
      setTimeout(()=>{ // 
        $('#modal_material').modal('hide');  
      },0); 
   }

 

}

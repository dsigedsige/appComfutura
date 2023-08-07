import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../services/login/login.service';
import Swal from 'sweetalert2'; 
 
 
import { RespuestaServer } from '../../../../../models/respuestaServer.models';
import { combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
import { AlmacenService } from 'src/app/services/requerimientos/mantenimientos/almacen.service';
declare var $:any;

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
}) 
export class AlmacenComponent implements OnInit {

  formParamsFiltro : FormGroup;
  formParams: FormGroup;

  idUserGlobal :number = 0;
  flag_modoEdicion :boolean =false;

 
  filtrarMantenimiento = "";
  almacenesCab:any[]=[];

  delegaciones:any[]=[];
  proyectos:any[]=[];
  locales:any[]=[];
  tiposAlmacen:any[]=[];
 
  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private almacenService : AlmacenService, private combosService : CombosService ) {         
    this.idUserGlobal = 0;
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro(); 
   this.inicializarFormulario(); 
   this.getCargarCombos();
 }

 inicializarFormulario(){ 
    this.formParams= new FormGroup({
      id_Almacen: new FormControl('0'), 
      id_Empresa: new FormControl('1'), 
      id_Local: new FormControl('0'), 
      id_Delegacion: new FormControl('0'), 
      id_TipoAlmacen: new FormControl('0'), 

      descripcion_Almacen: new FormControl(''), 
      direccion_Almacen: new FormControl(''), 

      confMaterial: new FormControl('0'), 
      confStock: new FormControl('0'), 

      MatNormall_Almacen: new FormControl(''), 
      MatUsado_Almacen: new FormControl(''), 
      MatBaja_Almacen: new FormControl(''), 
      Stock_EmpresObra: new FormControl(''), 
      Stock_EmpresPersonal: new FormControl(''), 
      
      id_Proyecto: new FormControl('0'), 
      estado: new FormControl('1'), 
      usuario_creacion: new FormControl(this.idUserGlobal), 
    }) 
 }

 inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      delegacion : new FormControl('0'),  
      proyecto : new FormControl('0'),  
      local : new FormControl('0'),  
      tipoAlmacen : new FormControl('0'),  
      estado : new FormControl('1'),   
    }) 
  }

  getCargarCombos(){ 
    this.spinner.show();
    // combineLatest([  this.combosService.get_delegaciones(this.idUserGlobal), this.combosService.get_locales(this.idUserGlobal), this.combosService.get_tiposAlmacenes() ])
    // .subscribe( ([ _delegaciones,_locales, _tiposAlmacen ])=>{     
    //   this.spinner.hide();   
    //   this.delegaciones = _delegaciones; 
    //   this.locales = _locales; 
    //   this.tiposAlmacen = _tiposAlmacen; 
    // })
}

 mostrarInformacion(){ 
  if (this.formParamsFiltro.value.delegacion == '0' || this.formParamsFiltro.value.delegacion == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Delegacion');
    return 
  } 

    this.spinner.show();
    this.almacenService.get_mostrar_informacion( this.formParamsFiltro.value  )
    .subscribe((res:RespuestaServer)=>{           
      if (res.ok==true) {         
          this.almacenesCab = res.data;
          setTimeout(()=>{ 
            this.spinner.hide();
          }, 1000);
      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })
  }
  
 cerrarModal(){
    setTimeout(()=>{ // 
      $('#modal_mantenimiento').modal('hide');  
    },0); 
 }

 nuevo(){
    this.flag_modoEdicion = false;
    this.inicializarFormulario();  
    setTimeout(()=>{ // 
      $('#modal_mantenimiento').modal('show');  
    },0); 
 } 

 async saveUpdate(){ 
 
  if (this.formParams.value.id_Delegacion == '0' || this.formParams.value.id_Delegacion == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione la Delegacion');
    return 
  } 
  if (this.formParams.value.id_Proyecto == '0' || this.formParams.value.id_Proyecto == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Proyecto');
    return 
  } 

  if (this.formParams.value.id_Local == '0' || this.formParams.value.id_Local == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Local');
    return 
  } 

  if (this.formParams.value.id_TipoAlmacen == '0' || this.formParams.value.id_TipoAlmacen == 0) {
    this.alertasService.Swal_alert('error','Por favor seleccione el Tipo de Almacen');
    return 
  } 
  if (this.formParams.value.descripcion_Almacen == '' || this.formParams.value.descripcion_Almacen == null) {
    this.alertasService.Swal_alert('error','Por favor ingrese el nombre Almacen');
    return 
  } 

  if (this.formParams.value.confMaterial == '1' ) {
    this.formParams.patchValue({ "MatNormall_Almacen" : 'SI', "MatUsado_Almacen" : 'NO', "MatBaja_Almacen" : 'NO' });
  }
  else if (this.formParams.value.confMaterial == '2' ) {
    this.formParams.patchValue({ "MatNormall_Almacen" : 'NO', "MatUsado_Almacen" : 'SI', "MatBaja_Almacen" : 'NO' });
  }
  else if (this.formParams.value.confMaterial == '3' ) {
    this.formParams.patchValue({ "MatNormall_Almacen" : 'NO', "MatUsado_Almacen" : 'NO', "MatBaja_Almacen" : 'SI' });
  }else{
    this.formParams.patchValue({ "MatNormall_Almacen" : 'NO', "MatUsado_Almacen" : 'NO', "MatBaja_Almacen" : 'NO' });
  }

  if (this.formParams.value.confStock == '1' ) {
    this.formParams.patchValue({ "Stock_EmpresObra" : 'SI', "Stock_EmpresPersonal" : 'NO'  });
  }
  else if (this.formParams.value.confStock == '2' ) {
    this.formParams.patchValue({ "Stock_EmpresObra" : 'NO', "Stock_EmpresPersonal" : 'SI'  });
  }else{
    this.formParams.patchValue({ "Stock_EmpresObra" : 'NO', "Stock_EmpresPersonal" : 'NO'  });
  }

  this.formParams.patchValue({ "usuario_creacion" : this.idUserGlobal });
 
  if ( this.flag_modoEdicion==false) { //// nuevo  
 
     Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
     Swal.showLoading(); 
    this.almacenService.set_save_almacen(this.formParams.value)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {     
          this.flag_modoEdicion = true;
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se agrego correctamente..');
          this.cerrarModal();
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      })
     
   }else{ /// editar

     Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Actualizando, espere por favor'  })
     Swal.showLoading();    
    this.almacenService.set_edit_almacen(this.formParams.value , this.formParams.value.id_Almacen)
      .subscribe((res:any)=>{  
        Swal.close();    
        if (res.ok ==true) {     
          this.flag_modoEdicion = true;
          this.mostrarInformacion();
          this.alertasService.Swal_Success('Se actualizo correctamente..');
          this.cerrarModal();
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      })
   }
 } 

 

 editar({id_Almacen, id_Empresa, id_Local, id_Delegacion, id_TipoAlmacen, descripcion_Almacen, direccion_Almacen, MatNormall_Almacen, MatUsado_Almacen, MatBaja_Almacen, 
        Stock_EmpresObra, Stock_EmpresPersonal, estado, id_Proyecto }){
   this.flag_modoEdicion=true;

   let configuracionMat = '';
   let configuracionStock = '';
    
   if (MatNormall_Almacen == 'SI') {
    configuracionMat = '1';
   }
   else if (MatUsado_Almacen == 'SI') {
    configuracionMat = '2';
   }
   else if (MatBaja_Almacen == 'SI') {
    configuracionMat = '3';
   } 

   if (Stock_EmpresObra == 'SI') {
    configuracionStock = '1';
   }
   else if (Stock_EmpresPersonal == 'SI') {
    configuracionStock = '2';
   }

   this.spinner.show();
   this.almacenService.get_proyectosDelegacion(id_Delegacion, this.idUserGlobal)
     .subscribe((res:any)=>{  
       this.spinner.hide();      
       if (res.ok ==true) {        
            this.proyectos = res.data;  
           
            setTimeout(()=>{ // 

              this.formParams= new FormGroup({
                id_Almacen: new FormControl(id_Almacen), 
                id_Empresa: new FormControl(id_Empresa), 
                id_Local: new FormControl(id_Local), 
                id_Delegacion: new FormControl(id_Delegacion), 
                id_TipoAlmacen: new FormControl(id_TipoAlmacen), 
            
                descripcion_Almacen: new FormControl(descripcion_Almacen), 
                direccion_Almacen: new FormControl(direccion_Almacen), 
            
                confMaterial: new FormControl(configuracionMat), 
                confStock: new FormControl(configuracionStock), 
            
                MatNormall_Almacen: new FormControl(''), 
                MatUsado_Almacen: new FormControl(''), 
                MatBaja_Almacen: new FormControl(''), 
                Stock_EmpresObra: new FormControl(''), 
                Stock_EmpresPersonal: new FormControl(''), 
                
                id_Proyecto: new FormControl(String(id_Proyecto)), 
                estado: new FormControl(estado), 
                usuario_creacion: new FormControl(this.idUserGlobal), 
              }) 

              $('#modal_mantenimiento').modal('show');  
            },0);  

       }else{
         this.alertasService.Swal_alert('error', JSON.stringify(res.data));
         alert(JSON.stringify(res.data));
       }
     })
 } 

 anular(objBD:any){

   if (objBD.estado ===2 || objBD.estado =='2') {      
     return;      
   }

   this.alertasService.Swal_Question('Sistemas', 'Esta seguro de anular ?')
   .then((result)=>{
     if(result.value){
      Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, espere por favor'  })
      Swal.showLoading();    
     this.almacenService.set_anular_almacen(objBD.id_Almacen).subscribe((res:RespuestaServer)=>{
         Swal.close();        
         if (res.ok ==true) { 
           
           for (const user of this.almacenesCab) {
             if (user.id_Almacen == objBD.id_Almacen ) {
                 user.estado = 2;
                 break;
             }
           }
           this.alertasService.Swal_Success('Se anulo correctamente..')  
    
         }else{
           this.alertasService.Swal_alert('error', JSON.stringify(res.data));
           alert(JSON.stringify(res.data));
         }
       })
        
     }
    }) 

 }

 changeDelegacion(opcion:any){
  if ( opcion.target.value == 0 || opcion.target.value == '0' ) {
    this.proyectos = [];
    this.formParamsFiltro.patchValue({"proyecto": '0'});
    return;
  }     
  this.mostrarProyectosDelegacion(opcion.target.value );
}

mostrarProyectosDelegacion(idDelegacion:number){ 
  this.spinner.show();
  this.almacenService.get_proyectosDelegacion(idDelegacion, this.idUserGlobal)
    .subscribe((res:any)=>{  
      this.spinner.hide();      
      if (res.ok ==true) {        
        this.proyectos = res.data;
      }else{
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })
}



}



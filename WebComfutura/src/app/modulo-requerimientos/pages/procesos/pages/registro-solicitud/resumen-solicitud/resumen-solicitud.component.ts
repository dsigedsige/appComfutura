import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../../services/login/login.service'; 
 
import { RespuestaServer } from '../../../../../../models/respuestaServer.models';
import { Subscription, combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
import { RegistroSolicitudService } from 'src/app/services/requerimientos/procesos/registroSolicitud.service';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-resumen-solicitud',
  templateUrl: './resumen-solicitud.component.html',
  styleUrls: ['./resumen-solicitud.component.css']
})
export class ResumenSolicitudComponent implements OnInit , OnDestroy {

  formParams: FormGroup;
  idUserGlobal :string = '';
  filtrar :string = '';
  resumen:any[]=[];
  @Input() IdSolicitudGlobal= 0;
  private formSolicitudSubcription : Subscription;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroSolicitudService : RegistroSolicitudService  ) {       
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formSolicitudSubcription = this.registroSolicitudService.fichasResumenSolicitud$.subscribe(()=>{
      this.mostrarResumen();
    })  
  }
  
  ngOnDestroy() {
    this.formSolicitudSubcription.unsubscribe(); 
  }

  
 mostrarResumen(){  
    this.spinner.show();
    this.registroSolicitudService.get_mostrarResumenSolicitud( this.IdSolicitudGlobal)
    .subscribe((res:RespuestaServer)=>{     
       this.spinner.hide();      
      if (res.ok==true) {         
          this.resumen = res.data;
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

 
 

enviarProvisionar(){  

  this.alertasService.Swal_Question('Sistemas', 'Esta seguro de enviar a provisionar ?')
  .then((result)=>{
    if(result.value){

       Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'espere por favor'  })
       Swal.showLoading();    
       this.registroSolicitudService.set_enviarProvisionar( this.IdSolicitudGlobal, this.idUserGlobal )
       .subscribe((res:RespuestaServer)=>{ 
          Swal.close();        
          if (res.ok ==true) { 
            console.log(res.data);     
            this.registroSolicitudService.flagTabsDisabledSolicitud$.emit(true); 
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


 


}

 

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
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit, OnDestroy {

  formParams: FormGroup;
  idUserGlobal :string = '';
  filtrar :string = '';
  resumen:any[]=[];
  @Input() IdRequerimientoGlobal= 0;
  private formRequerimientoSubcription : Subscription;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private registroRequerimientoService : RegistroRequerimientoService  ) {       
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formRequerimientoSubcription = this.registroRequerimientoService.fichasResumenRequerimiento$.subscribe(()=>{
      this.mostrarResumen();
    })  
  }
  
  ngOnDestroy() {
    this.formRequerimientoSubcription.unsubscribe(); 
  }

  
 mostrarResumen(){  
    this.spinner.show();
    this.registroRequerimientoService.get_mostrarResumen( this.IdRequerimientoGlobal)
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

}

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
import { RegistroSolicitudService } from 'src/app/services/requerimientos/procesos/registroSolicitud.service';

declare var $:any;

@Component({
  selector: 'app-material-solicitud',
  templateUrl: './material-solicitud.component.html',
  styleUrls: ['./material-solicitud.component.css']
})
export class MaterialSolicitudComponent implements OnInit {

  formParams: FormGroup;
  datepiekerConfig:Partial<BsDatepickerConfig>;
  idUserGlobal :string = '';
  filtrar :string = '';
  materialesDet:any[]=[];

  totalPresupuesto :number =0;
  totalRequerimiento :number =0;
  totalPendiente :number =0;

  @Input() IdSolicitudGlobal = 0;
  private formRequerimientoSubcription : Subscription;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private  registroSolicitudService : RegistroSolicitudService   ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }

  ngOnInit(): void {
    //----- escuchando el eventos del padre------
    this.formRequerimientoSubcription = this.registroSolicitudService.fichasResumenSolicitud$.subscribe(()=>{
      this.totalPresupuesto = 0;
      this.totalRequerimiento = 0;
      this.totalPendiente = 0;
      this.mostrarMateriales();
    }) 

    this.totalPresupuesto = 0;
    this.totalRequerimiento = 0;
    this.totalPendiente = 0;
  }
  
  ngOnDestroy() {
    this.formRequerimientoSubcription.unsubscribe(); 
  }
   
 mostrarMateriales(){  

    this.totalPresupuesto = 0;
    this.totalRequerimiento = 0;
    this.totalPendiente = 0;

    this.spinner.show();
    this.registroSolicitudService.get_mostrarMaterialesSolicitud( this.IdSolicitudGlobal)
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {      

          this.materialesDet = res.data;

          if (res.data.length > 0) {
              this.totalPresupuesto = res.data[0].totalGeneralPresupuesto;
              this.totalRequerimiento = res.data[0].totalGeneralRequerimiento;
              this.totalPendiente = res.data[0].totalGeneralPendiente;
          }

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


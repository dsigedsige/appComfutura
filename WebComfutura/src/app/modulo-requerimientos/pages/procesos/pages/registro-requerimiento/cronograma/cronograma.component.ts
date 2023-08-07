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

declare var $:any;

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit, OnDestroy {

  formParams: FormGroup;
  datepiekerConfig:Partial<BsDatepickerConfig>;
  idUserGlobal :string = '';
  filtrar :string = '';
  cronogramas:any[]=[];
  partidas:any[]=[];

  flag_modoEdicion :boolean =false;
  totalDias :number =0;

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
      this.totalDias = 0;
      this.mostrarCronograma();
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
    combineLatest([this.combosService.get_partidas()   ])
    .subscribe( ([ _partidas ])=>{     
      this.spinner.hide();   
      this.partidas = _partidas;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }


  inicializarFormulario(){ 
    this.formParams= new FormGroup({
      totalDiasTrabajo: new FormControl('0'),
      IdReqCronograma: new FormControl('0'),  
      IdRequerimiento: new FormControl(this.IdRequerimientoGlobal),  
      IdPartida: new FormControl('0'),  
      Duracion: new FormControl(''),  
      FechaInicio: new FormControl(new Date()),  
      FechaTermino: new FormControl(new Date()),  
      Estado: new FormControl('001'),  
      UsuarioCreacion: new FormControl(this.idUserGlobal),  
    }) 
 }

 keyPress(event: any) {
    this.funcionGlobalServices.verificar_soloNumeros(event)  ;
  }
  
  changeFechaInicial(fechaIni: Date): void { 

    let duracion = (this.formParams.value.Duracion=='')?0: Number(this.formParams.value.Duracion);
    duracion = duracion == 0 ? 0 : duracion - 1;

    var fechaOperacion = new Date(fechaIni); 
    fechaOperacion.setDate(fechaOperacion.getDate() + duracion);

    this.formParams.patchValue({"FechaTermino": fechaOperacion });
  }

  changeDuracion(): void { 
    let duracion = (this.formParams.value.Duracion=='')?0: Number(this.formParams.value.Duracion);
    duracion = duracion == 0 ? 0 : duracion - 1;
    
    var fechaOperacion = new Date(this.formParams.value.FechaInicio); 
    fechaOperacion.setDate(fechaOperacion.getDate() + duracion);

    this.formParams.patchValue({"FechaTermino": fechaOperacion });
  } 

  
 mostrarCronograma(){ 
 
    this.spinner.show();
    this.registroRequerimientoService.get_mostrarCronogramas( this.IdRequerimientoGlobal)
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.cronogramas = res.data;
          this.blank_Detalle();
          this.calcularTotalesDias();
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

  calcularTotalesDias(){
    let total = 0;
    for (let item of this.cronogramas ){
      total += (!item.Duracion)? 0 : Number(item.Duracion);
    }
    this.totalDias = total;
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
    if (this.formParams.value.IdPartida == '0' || this.formParams.value.IdPartida == 0) {
      this.alertasService.Swal_alert('error','Por favor seleccione una Partida.');
      return 
    } 
    if (this.formParams.value.Duracion == '' || this.formParams.value.Duracion == null) {
      this.alertasService.Swal_alert('error','Por favor seleccione la Duracion');
      return 
    } 
    if (this.formParams.value.Duracion == '0' || this.formParams.value.Duracion == 0) {
      this.alertasService.Swal_alert('error','La duracion debe ser mayor a cero');
      return 
    }  
   
    if ( this.flag_modoEdicion==false) { //// nuevo  
   
      Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
      Swal.showLoading(); 
      this.registroRequerimientoService.set_save_cronograma(this.formParams.value)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {  
   
            this.mostrarCronograma();
            this.alertasService.Swal_Success('Se agrego el cronograma correctamente ..');
   
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
      this.registroRequerimientoService.set_edit_cronograma(this.formParams.value , this.formParams.value.IdReqCronograma)
        .subscribe((res:any)=>{  
          Swal.close();    
          if (res.ok ==true) {     
            this.mostrarCronograma();
            this.alertasService.Swal_Success('Se actualizo el cronograma correctamente..');
   
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

 
   editarDet({IdReqCronograma, IdRequerimiento, IdPartida, Duracion, FechaInicio, FechaTermino, Estado}){ 

      this.flag_modoEdicion = true;
      
      this.formParams= new FormGroup({
        totalDiasTrabajo: new FormControl('0'),
        IdReqCronograma: new FormControl(IdReqCronograma),  
        IdRequerimiento: new FormControl(this.IdRequerimientoGlobal),  
        IdPartida: new FormControl(IdPartida),  
        Duracion: new FormControl(Duracion),  
        FechaInicio: new FormControl(new Date(FechaInicio)),  
        FechaTermino: new FormControl( new Date(FechaTermino)),  
        Estado: new FormControl('001'),  
        UsuarioCreacion: new FormControl(this.idUserGlobal),  
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
        this.registroRequerimientoService.set_eliminar_cronograma(item.IdReqCronograma).subscribe((res: RespuestaServer) => {
          Swal.close();
          if (res.ok) {
            var index = this.cronogramas.indexOf(item);
            this.cronogramas.splice(index, 1);
            this.blank_Detalle();
          } else {
            this.alertasService.Swal_alert('error', JSON.stringify(res.data));
            alert(JSON.stringify(res.data));
          }
          this.calcularTotalesDias();
        })

      }
    }) 
  }

  descargarCronograma(){    
      this.spinner.show();
      this.registroRequerimientoService.get_descargarCronograma( this.IdRequerimientoGlobal , this.idUserGlobal )
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
  



}

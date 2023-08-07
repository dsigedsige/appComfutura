import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertasService } from '../../../../../services/alertas/alertas.service';
 
import { FuncionesglobalesService } from '../../../../../services/funciones/funcionesglobales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../../../../services/login/login.service';
import Swal from 'sweetalert2';  
  
import { combineLatest } from 'rxjs';
import { CombosService } from 'src/app/services/combos/combos.service';
  
import { RespuestaServer } from '../../../../../models/respuestaServer.models';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { KardexService } from 'src/app/services/requerimientos/reportes/kardex.service';
import * as XLSX from 'xlsx'; 

declare var $:any;

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  formParamsFiltro : FormGroup;
  formParams: FormGroup;

  idUserGlobal :number = 0;
  flag_modoEdicion :boolean =false;

  locales  :any[]=[]; 
  filtrarMantenimiento = "";
  
  almacenes  :any[]=[]; 
  tiposAlmacen  :any[]=[]; 
  datepiekerConfig:Partial<BsDatepickerConfig>
  ayudas:any[] =[];
  kardexs:any[] =[];
  totalIngresos = 0;
  totalSalidas= 0;

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private kardexService : KardexService, private combosService : CombosService ) {   
      this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })      
    this.idUserGlobal = 0;
  }
 
 ngOnInit(): void {
   this.inicializarFormulario_filtro();  
   this.getCargarCombos();
 }
 
 inicializarFormulario_filtro(){ 
  
    this.formParamsFiltro = new FormGroup({
      local : new FormControl('0'),   
      tipoAlmacen : new FormControl('0'), 
      almacen : new FormControl('0'),        
      fecha_ini : new FormControl(new Date()),   
      fecha_fin : new FormControl(new Date()),   
      id : new FormControl('0'), 
      codigo : new FormControl(''), 
      descripcion : new FormControl(''), 
      filtro : new FormControl('0'), 
    }) 
  }

  getCargarCombos(){ 
      // this.spinner.show();
      // combineLatest([this.combosService.get_locales(this.idUserGlobal), this.combosService.get_tiposAlmacenes() ])
      // .subscribe( ([_locales, _tiposAlmacen])=>{     
      //   this.spinner.hide();   
      //   this.locales = _locales ; 
      //   this.tiposAlmacen = _tiposAlmacen ; 
      // },      
      // (error) => {    
      //   this.spinner.hide(); 
      //   alert(JSON.stringify(error));
      // })
  }

  changeLocal(opcion:any ){ 
    this.mostrarAlmacenes_localTipoAlmacen(this.formParamsFiltro.value.local, this.formParamsFiltro.value.tipoAlmacen );
  }
  changeTipoAlmacen(opcion:any ){ 
    this.mostrarAlmacenes_localTipoAlmacen(this.formParamsFiltro.value.local, this.formParamsFiltro.value.tipoAlmacen );
  }
  
  mostrarAlmacenes_localTipoAlmacen(idLocal:number, idTipoAlmacen : number ){ 
    this.spinner.show();
    this.kardexService.getAlmacenes_localTipoAlmacen(idLocal, idTipoAlmacen , this.idUserGlobal)
      .subscribe((res:RespuestaServer)=>{  
        this.spinner.hide();      
        if (res.ok ==true) {      
            this.almacenes = res.data;  
        }else{
          this.alertasService.Swal_alert('error', JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
        }
      },(error) => {    
        this.spinner.hide(); 
        alert(JSON.stringify(error));
      })
  }

  buscarCodigo(){

    this.filtrarMantenimiento = "";

    if( this.formParamsFiltro.value.codigo == '' ){
         this.formParamsFiltro.patchValue({ "filtro" : '' });
         this.ayudas = [];
         setTimeout(()=>{ // 
           $('#modal_ayuda').modal('show');  
         },0); 

    }else{
   
     this.spinner.show();
     this.kardexService.get_buscarCodigoMaterial( this.formParamsFiltro.value.codigo, this.idUserGlobal)
     .subscribe((res:RespuestaServer)=>{       
         this.spinner.hide();    
         if (res.ok==true) {    

            if(res.data.length > 0){            
             const {id, codigo, descripcion} = res.data[0]
             this.formParamsFiltro.patchValue({ "id" : id,   'descripcion' : descripcion});
            }else{

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
     },
     (error) => {    
       this.spinner.hide(); 
       alert(JSON.stringify(error));
     })
   }
 }



 cerrarModal(){
  setTimeout(()=>{ // 
    $('#modal_ayuda').modal('hide');  
  },0); 
}

 buscarCodigoMasivo(){
  if( this.formParamsFiltro.value.filtro == '' ){
    this.alertasService.Swal_alert('error','Por favor ingrese algun dato sea codigo o descripcion');
    return;

  }else{
 

   this.spinner.show();
   this.kardexService.get_buscarCodigoObraMaterial_masivo( this.formParamsFiltro.value.filtro, this.idUserGlobal)
   .subscribe((res:RespuestaServer)=>{       
       this.spinner.hide();    
       if (res.ok==true) {    
          this.ayudas = res.data;
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

agregarItem({ id, codigo, descripcion}){
  this.formParamsFiltro.patchValue({ "id" : id, 'codigo' : codigo,  'descripcion' : descripcion});
  this.cerrarModal();
}


visualizarKardex(){ 

    if (this.formParamsFiltro.value.fecha_ini == '' || this.formParamsFiltro.value.fecha_ini == null ) {
      this.alertasService.Swal_alert('error','Por favor seleccione la fecha Inicial ');
      return 
    } 
    if (this.formParamsFiltro.value.fecha_fin == '' || this.formParamsFiltro.value.fecha_fin == null ) {
      this.alertasService.Swal_alert('error','Por favor seleccione la fecha Final ');
      return 
    } 
    if (this.formParamsFiltro.value.id == '0' || this.formParamsFiltro.value.id == 0 ) {
      this.alertasService.Swal_alert('error','Por favor ingrese el codigo del producto y presione enter ');
      return 
    } 
 

    const fechaI = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_ini);
    const fechaF = this.funcionGlobalServices.formatoFecha(this.formParamsFiltro.value.fecha_fin);
  
    this.spinner.show();

    this.kardexService.get_visualizarkardex( {...this.formParamsFiltro.value, fecha_ini : fechaI ,  fecha_fin : fechaF  } , this.idUserGlobal)
    .subscribe((res:RespuestaServer)=>{       
      this.spinner.hide();    
      if (res.ok==true) {  

        this.kardexs = res.data;

        let ingresos = 0;
        let saldoini = 0;
        let salidas = 0;

        for (var n = 0; n < this.kardexs.length; n++) {
            saldoini = this.kardexs[n].saldoInicial;
            ingresos += this.kardexs[n].ingreso;
            salidas += this.kardexs[n].salida;;
        }

        this.totalIngresos = ingresos + saldoini;
        this.totalSalidas = salidas;
  

      }else{
        this.spinner.hide();
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    })
  }

 
  descargarStockExcel(){ 
       /* table id is passed over here */   
       var element; 
         element = document.getElementById('tblKardex'); 
 

      const ws = XLSX.utils.table_to_sheet(element, {dateNF:'mm/dd/yyyy;@',cellDates:true, raw: true});

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'kardex');

       /* save to file */
       XLSX.writeFile(wb, 'kardex.xlsx');	
  }

 



}
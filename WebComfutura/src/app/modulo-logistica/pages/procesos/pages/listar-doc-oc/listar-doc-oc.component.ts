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
 
import { UploadService } from 'src/app/services/upload/upload.service';
import { EscritorioOCService } from 'src/app/services/logistica/procesos/escritorio-oc.service';
import { InputFileI } from 'src/app/models/inputFile.models';

declare var $:any;
@Component({
  selector: 'app-listar-doc-oc',
  templateUrl: './listar-doc-oc.component.html',
  styleUrls: ['./listar-doc-oc.component.css']
})
 

export class ListarDocOCComponent implements OnInit {

  formParamsFiltro : FormGroup;
  formParams: FormGroup;
  formParamsFile : FormGroup;

  idUserGlobal :string = '';
  flag_modoEdicion :boolean =false;
  datepiekerConfig:Partial<BsDatepickerConfig>
  filtrarMantenimiento = "";
  documentosOC :any[]=[]; 
  tiposDocumentos :any[]=[]; 
  IdOC_Global = 0;
  filesOT:InputFileI[] = [];

  constructor(private alertasService : AlertasService, private spinner: NgxSpinnerService, private loginService: LoginService, private funcionGlobalServices : FuncionesglobalesService, 
    private combosService : CombosService, private escritorioOCService : EscritorioOCService , private uploadService : UploadService ) {    
    this.datepiekerConfig = Object.assign({}, { containerClass : 'theme-dark-blue',  dateInputFormat: 'DD/MM/YYYY' })          
    this.idUserGlobal = this.loginService.get_idUsuario();
  }
 

  ngOnInit(): void {
    this.inicializarFormulario_filtro(); 
    this.inicializarFormularioArchivos();
    this.getCargarCombos();
    this.IdOC_Global = 0;
  }


  inicializarFormulario_filtro(){ 
    this.formParamsFiltro = new FormGroup({
      IdOc : new FormControl('0'),   
      NroOc : new FormControl(''),   
      RazonSocial : new FormControl(''),   
      FormaPago : new FormControl(''),   
    }) 
  }

  inicializarFormularioArchivos(){
    this.formParamsFile= new FormGroup({
        tipoDocumento : new FormControl('0'),
        file: new FormControl(''),
     })
   }
  
   
  getCargarCombos(){ 
    this.spinner.show();
    combineLatest([ this.combosService.get_tiposDocumentos() ])
    .subscribe( ([ _tiposDocumentos ])=>{     
      this.spinner.hide();   
      this.tiposDocumentos = _tiposDocumentos;
    },
    (error) => {    
      this.spinner.hide(); 
      alert(JSON.stringify(error));
    })
  }


  buscarOC(){ 
    if (this.formParamsFiltro.value.NroOc == '' || this.formParamsFiltro.value.NroOc == null ) {
      this.alertasService.Swal_alert('error','Por favor ingrese el numero de orden compra ');
      return 
    } 

    Swal.fire({  icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'  })
    Swal.showLoading(); 
    this.escritorioOCService.get_buscarOC(this.formParamsFiltro.value.NroOc  , this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      Swal.close();        
      if (res.ok==true) {         
        if(res.data.length > 0){
          this.IdOC_Global = res.data[0].IdOc;
          this.formParamsFiltro.patchValue({"IdOc": res.data[0].IdOc, "NroOc": res.data[0].NroOc , 'RazonSocial' : res.data[0].RazonSocial  , 'FormaPago':res.data[0].FormaPago   });  

          this.detalleDocumentosOC();
        }else{
          this.IdOC_Global = 0;
          this.alertasService.Swal_alert('error','No se encontro la orden de compra, verifique por favor..');
          this.formParamsFiltro.patchValue({"IdOc": '0' , 'RazonSocial' : '' , 'FormaPago':''  });    
          this.documentosOC = [];
        }
      }else{ 
        this.IdOC_Global = 0;
        this.documentosOC = [];
        this.alertasService.Swal_alert('error', JSON.stringify(res.data));
        alert(JSON.stringify(res.data));
      }
    },
    (error) => {    
      Swal.close();    
      this.IdOC_Global = 0;
      alert(JSON.stringify(error));
    })
}

  detalleDocumentosOC(){ 
    if ( this.IdOC_Global == 0 || this.IdOC_Global == null)  {
      this.alertasService.Swal_alert('error', 'No se cargo la informacion de la OC, por favor actualizar la pagina..');
      return;
    }

    this.spinner.show();
    this.escritorioOCService.get_detalleDocumentosOC(this.IdOC_Global, this.idUserGlobal )
    .subscribe((res:RespuestaServer)=>{     
      this.spinner.hide();      
      if (res.ok==true) {         
          this.documentosOC = res.data;
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
   descargarArchivoSeleccionado({urlFile,LogOCcoNombreArchivoServidor}){

    const link = document.createElement('a');
  
    link.href = urlFile;
    link.download = LogOCcoNombreArchivoServidor;
    link.target = '_blank';
    link.style.display = 'none';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  
  }

 


}


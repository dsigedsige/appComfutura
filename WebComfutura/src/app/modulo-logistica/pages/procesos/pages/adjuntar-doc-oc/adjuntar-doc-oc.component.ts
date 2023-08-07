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
  selector: 'app-adjuntar-doc-oc',
  templateUrl: './adjuntar-doc-oc.component.html',
  styleUrls: ['./adjuntar-doc-oc.component.css']
})
export class AdjuntarDocOCComponent implements OnInit {

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
        ganador : new FormControl(false),
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
            this.blank();
          }
        }else{ 
          this.IdOC_Global = 0;
          this.documentosOC = [];
          this.blank();
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

  blank(){
    this.inicializarFormularioArchivos();
   }
  
  onFileChange(event:any) {
  
    var filesTemporal = event.target.files; //FileList object
     var fileE:InputFileI [] = [];
     for (var i = 0; i < event.target.files.length; i++) { //for multiple files

      let fileName = filesTemporal[i].name;
      let idxDot = fileName.lastIndexOf(".") + 1;
      let extFile = fileName.slice(idxDot, fileName.length).toLowerCase();

      if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="pdf"){
          
        fileE.push({
          'file': filesTemporal[i],
          'namefile': filesTemporal[i].name,
          'status': '',
          'message': ''
        })

      }else{ 
          this.alertasService.Swal_alert('error', 'Solo se permiten archivos jpg-jpeg-png y pdf..');
      } 
     }

      this.filesOT = fileE;
  }

  obtnerArchivoYacargado(nombreArchivo:string){
    var flagRepetida=false;
    for (const obj of this.documentosOC) {
      if (  obj.LogOCcoNombreArchivo == nombreArchivo ) {
           flagRepetida = true;
           break;
      }
    }
    return flagRepetida;
  }

  
  subirArchivo(){

    if ( this.IdOC_Global == 0 || this.IdOC_Global == null)  {
      this.alertasService.Swal_alert('error', 'No se cargo la informacion de la OC, por favor actualizar la pagina..');
      return;
    }
  
    if (this.formParamsFile.value.tipoDocumento == '0' || this.formParamsFile.value.tipoDocumento == 0 || this.formParamsFile.value.tipoDocumento == null)  {
      this.alertasService.Swal_alert('error', 'Por favor seleccione el Tipo de Documento.');
      return;
    }
  
    if (!this.formParamsFile.value.file) {
      this.alertasService.Swal_alert('error', 'Por favor seleccione el archivo que va a cargar.');
      return;
    }
  
    if (this.obtnerArchivoYacargado( this.filesOT[0].file.name ) ==true) {
      this.alertasService.Swal_alert('error', 'El archivo que intenta subir, Ya se encuentra cargado');
      return;
    }
    const esGanador = ( this.formParamsFile.value.ganador == true ) ? 1 : 0 ;
  
    Swal.fire({
      icon: 'info',allowOutsideClick: false,allowEscapeKey: false,text: 'Espere por favor'
    })
    Swal.showLoading();
    this.uploadService.upload_fileOrdenCompra( this.IdOC_Global, this.formParamsFile.value.tipoDocumento, this.filesOT[0].file , this.idUserGlobal,esGanador ).subscribe(
      (res:any) =>{
        Swal.close();
  
        if (res.ok==true) {
          //------enfocando el estado a registrado ----     
          this.alertasService.Swal_Success('Proceso de carga realizado correctamente..');
          this.blank();
          this.detalleDocumentosOC();
        }else{
          alert(JSON.stringify(res.data));
        }
        },(err) => {
          Swal.close();
          alert(JSON.stringify(err.data));
        }
    );
  
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

  eliminarArchivoSeleccionado(item:any){
    this.alertasService.Swal_Question('Sistemas', 'Esta seguro de eliminar ?')
    .then((result)=>{
      if(result.value){
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Eliminando, espere por favor'
        })
        Swal.showLoading();
        this.escritorioOCService.set_eliminar_archivoOC(item.LogOCcoIdentidad).subscribe((res:RespuestaServer)=>{
            Swal.close();
            console.log(res);
            if (res.ok) {
                     this.alertasService.Swal_Success("Proceso realizado correctamente..")
                     var index = this.documentosOC.indexOf( item );
                     this.documentosOC.splice( index, 1 );
            }else{
              this.alertasService.Swal_alert('error', JSON.stringify(res.data));
              alert(JSON.stringify(res.data));
            }
         }, (error) => {    
             Swal.close();
             alert(JSON.stringify(error));
         })  
      }
     }) 
  
  }


}

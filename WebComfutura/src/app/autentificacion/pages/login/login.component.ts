import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
 
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertasService } from '../../../services/alertas/alertas.service';
import { LoginService } from '../../../services/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showMenu:boolean=false;
  formParams : FormGroup;
  
  constructor( private alertasService :AlertasService, private spinner: NgxSpinnerService, private loginService : LoginService, private router:Router) { 
     
  }

  ngOnInit(): void {
    // this.showMenu = this.loginService.getSession();
    this.inicializarFormularioAnuncio();
  }
    
  inicializarFormularioAnuncio(){ 
    this.formParams = new FormGroup({
      usuario : new FormControl(''), 
      contrasenia : new FormControl('')
     })
  }
    
  iniciarSesion(){
    if (this.formParams.value.usuario == '' || this.formParams.value.usuario == 0) {
      this.alertasService.Swal_alert('error','Ingrese el usuario');
      return 
    }
    if (this.formParams.value.contrasenia == '' || this.formParams.value.contrasenia == null) {
      this.alertasService.Swal_alert('error','Ingrese la contraseña');
      return 
    }

    this.spinner.show();
    this.loginService.get_iniciarSesion(this.formParams.value.usuario, this.formParams.value.contrasenia.trim())
        .subscribe((res:any)=>{ 
          this.spinner.hide();
          if (res.ok==true) {               
             this.router.navigateByUrl('/home');
          }else{
            this.alertasService.Swal_alert('error',JSON.stringify(res.data));
            console.log(JSON.stringify(res.data));
          } 
        }, (error:any)=>{
          this.spinner.hide();
          alert(JSON.stringify(error));
        })
  }

  irRegistrarse(){
    this.router.navigateByUrl('/Autentificacion/registro');
  }

}
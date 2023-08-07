import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  modulos:any [] =[];
  constructor(private  loginService :LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.homeSeleccionado$.next(true);
    this.modulos =  this.loginService.getModulos();
  }

  mostrando_MenuModulo(modulo:any){

    this.loginService.set_idModulo(modulo.id_opcion);

    if (modulo.id_opcion == 1 ) {
      this.router.navigateByUrl('/Logistica');
    }
    if (modulo.id_opcion == 2 ) {
      this.router.navigateByUrl('/Requerimientos');
    }
    if (modulo.id_opcion == 3 ) {
      this.router.navigateByUrl('/GestionProyectos');
    }

  }

}

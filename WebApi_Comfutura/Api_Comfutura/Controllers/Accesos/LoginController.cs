using Api_Comfutura.Models;
using Api_Comfutura.Services.Interfaces.Accesos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api_Comfutura.Controllers.Accesos
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly ILogin loginServices;

        public LoginController(ILogin loginService)
        {
            this.loginServices = loginService;
        }

        [HttpGet("IniciarSesion")]
        public object IniciarSesion(string login, string constrasenia)
        {
            Resultado res = new Resultado();
            object resul;

            try
            {             
                resul = loginServices.iniciarSesion(login, constrasenia); 
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;

                resul = res;
            }
            return resul;
        }

        [HttpGet("generarArbolAccesos")]
        public object generarArbolAccesos()
        {
            Resultado res = new Resultado();
            object resul;

            try
            {
                resul = loginServices.generarArbolAccesos();
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;

                resul = res;
            }
            return resul;
        }

        [HttpGet("get_reporteResumen_rrmm")]
        public object get_reporteResumen_rrmm(int idCiclo, int idUsuario)
        {  
            return loginServices.reporteResumen_rrmm(idCiclo, idUsuario); 
        }



    }
}

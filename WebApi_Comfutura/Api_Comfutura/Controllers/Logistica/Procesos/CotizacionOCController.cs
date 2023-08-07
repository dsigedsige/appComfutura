using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Implementations.Requerimientos.Procesos;
using Api_Comfutura.Services.Implementations.Uploads;
using Api_Comfutura.Services.Interfaces.Logistica.Procesos;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Comfutura.Controllers.Logistica.Procesos
{
    [Route("api/[controller]")]
    [ApiController]  

    public class CotizacionOCController : ControllerBase
    {
        private readonly IcotizacionOC cotizacionOCService;
        private readonly IUploads uploadService;

        public CotizacionOCController(IcotizacionOC cotizacionOCService  ,IUploads uploadService)
        {
            this.cotizacionOCService = cotizacionOCService;
            this.uploadService = uploadService;
        }

        [HttpGet("buscarOC")]
        public object buscarOC(string nroOc, string usuario)
        {
            return cotizacionOCService.get_buscarOC(nroOc, usuario);
        }

        [HttpGet("detalleDocumentosOC")]
        public object detalleDocumentosOC(int IdOC, string usuario)
        {
            return cotizacionOCService.get_detalleDocumentosOC(IdOC, usuario);
        }

        [HttpGet("eliminar_archivoOC")]
        public object eliminar_archivoOC(int idOCcotizacion)
        {
            return cotizacionOCService.set_eliminar_archivoOC(idOCcotizacion);
        }

        [HttpPost("guardarArchivoOC")]
        public object guardarArchivoOC([FromForm] IFormFile file, int idOC, int idTipoDoc, string idUsuario , int Ganador)
        {
            return uploadService.guardarArchivoOC(file, idOC, idTipoDoc, idUsuario, Ganador);
        }


    }
}

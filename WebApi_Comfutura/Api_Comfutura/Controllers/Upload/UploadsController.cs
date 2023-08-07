using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api_Comfutura.Controllers.Upload
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadsController : ControllerBase
    {
        private readonly IUploads uploadService;
        private readonly IAlmacenarArchivos almacenarArchivosServices;

        public UploadsController(IUploads uploadService, IAlmacenarArchivos almacenarArchivosServices)
        {
            this.uploadService = uploadService;
            this.almacenarArchivosServices = almacenarArchivosServices;
        }

        [HttpPost("post_guardarImagenUsuario_old")]
        public object post_guardarImagenUsuario_old([FromForm] IFormFile file, string filtros)
        {
             return  uploadService.guardarImagenUsuario(file, filtros);
        }

        [HttpPost("post_guardarImagenUsuario")]
        public async Task<string> post_guardarImagenUsuario([FromForm] IFormFile file, string filtros)
        {
            var foto = "";
            if (file.Length > 0)
            {
                 foto = await almacenarArchivosServices.guardarArchivo(file, "Imagen");
            }
            else {
                foto = "sin foto";
            }

            return foto;
        }


        [HttpPost("post_guardarExcelMedico")]
        public object post_guardarExcelMedico([FromForm] IFormFile file, string filtros)
        {
            return uploadService.guardarExcelMedico(file, filtros);
        }

        [HttpPost("post_generarExcel_cancelaciones")]
        public object post_generarExcel_cancelaciones(string mesAnio, int idUsuario)
        {
            return uploadService.generarExcel_cancelaciones(mesAnio, idUsuario);
        }


    }
}

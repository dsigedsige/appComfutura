using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api_Comfutura.Services.Interfaces.Uploads
{
    public interface IUploads
    {
        Task<object> guardarImagenUsuario([FromForm] IFormFile file, string filtros);
        Task<object> guardarExcelMedico([FromForm] IFormFile file, string filtros);

        Task<object> generarExcel_cancelaciones(string mesAnio, int idUsuario);

        Task<object> guardarArchivoRequerimiento([FromForm] IFormFile file, int idOt, int idTipoDoc, string idUsuario);

        Task<object> guardarArchivoOC([FromForm] IFormFile file, int idOC, int idTipoDoc, string idUsuario, int Ganador);

        Task<object> guardarArchivoCobranzas([FromForm] IFormFile file, int IdCobranza , string idUsuario);

        Task<object> guardarArchivoDetracciones([FromForm] IFormFile file, int IdDocumento, string idUsuario);

    }
}

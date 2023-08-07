namespace Api_Comfutura.Services.Interfaces.Uploads
{
    public interface IAlmacenarArchivos
    {
        Task<string> guardarArchivo(IFormFile file,string carpetaContenedora);
        Task<string> editarArchivo(byte[] contenido, string extension, string contenedor, string ruta, string tipoDato);

        Task  borrarArchivo( string ruta, string contenedor);
    }
}

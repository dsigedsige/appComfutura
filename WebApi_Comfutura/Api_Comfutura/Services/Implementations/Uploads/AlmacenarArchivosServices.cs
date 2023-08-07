using Api_Comfutura.Services.Interfaces.Uploads;

namespace Api_Comfutura.Services.Implementations.Uploads
{
    public class AlmacenarArchivosServices : IAlmacenarArchivos
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AlmacenarArchivosServices( IWebHostEnvironment   env , IHttpContextAccessor httpContextAccessor)
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }


        public Task borrarArchivo(string ruta, string contenedor)
        {
            if (ruta != null)
            {
                var nombreArchivo = Path.GetFileName(ruta);
                string directorioArchivo = Path.Combine(env.WebRootPath, contenedor, nombreArchivo);

                if (File.Exists(directorioArchivo))
                {
                    File.Delete(directorioArchivo);
                }             
            }

            return Task.FromResult(0);
        }

        public async Task<string> editarArchivo(byte[] contenido, string extension, string contenedor, string ruta, string tipoDato)
        {
            await borrarArchivo(ruta, contenedor);
            //return await guardarArchivo(contenido, extension, contenedor, tipoDato);
            return "";
        }

        public async Task<string> guardarArchivo_old(byte[] contenido, string extension, string contenedor, string tipoDato)
        {
            var nombreArchivo = Guid.Parse(Guid.NewGuid().ToString("B")) + extension;
            string folder = Path.Combine(env.WebRootPath, contenedor);

            //--- si no existe la carpeta la creamos -----
            if (!Directory.Exists(folder)) {
                Directory.CreateDirectory(folder);
            }
            //-- ruta del archivo
            string ruta = Path.Combine(folder, nombreArchivo);

            //---guardamos el archivo----
            await File.WriteAllBytesAsync(ruta, contenido);

            //----obteniendo el dominio ----
            //var urlActual = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var urlActual = "";
            var urlBd = Path.Combine(urlActual, contenedor, nombreArchivo).Replace("\\","/") ;

            return urlBd;
        }


        public async Task<string> guardarArchivo(IFormFile file,string carpetaContenedora)
        {
            string extension = System.IO.Path.GetExtension(file.FileName);
            string nombreArchivo = Guid.Parse(Guid.NewGuid().ToString("B")) + extension;
            string folder = Path.Combine(env.WebRootPath, carpetaContenedora);

            //--- si no existe la carpeta la creamos -----
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            //-- ruta del archivo
            string ruta = Path.Combine(folder, nombreArchivo);

            //---guardamos el archivo----
            using (var stream = new FileStream(ruta, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //----obteniendo el dominio ----
            //var urlActual = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var urlActual = "";
            var urlBd = Path.Combine(urlActual, carpetaContenedora, nombreArchivo).Replace("\\", "/");


            return urlBd;
        }



    }
}

using Api_Comfutura.Models;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Logistica.Procesos;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Api_Comfutura.Services.Implementations.Logistica.Procesos
{
    public class CotizacionOCServices : IcotizacionOC
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;

        public CotizacionOCServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration, IWebHostEnvironment environment)
        {
            context = _context;
            this.configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }


        public  object get_buscarOC(string nroOc , string usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_COTIZACION_BUSCAR_OC", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroOc", SqlDbType.VarChar).Value = nroOc;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            res.ok = true;
                            res.data = dt_detalle;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public object get_detalleDocumentosOC(int IdOC, string usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_COTIZACION_DOCUMENTOS_OC", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdOC", SqlDbType.Int).Value = IdOC;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        DataTable dt_detalle = new DataTable();
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                            res.ok = true;
                            res.data = dt_detalle;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public object set_eliminar_archivoOC(int idOCcotizacion)
        {
            Resultado res = new Resultado();
            string urlFotoAntes = "";
            string path = "";

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {

                    TblOrdenCompraCotizacione? object_archivo;
                    object_archivo = context.TblOrdenCompraCotizaciones.Where(p => p.LogOccoIdentidad == idOCcotizacion).FirstOrDefault<TblOrdenCompraCotizacione>();

                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_COTIZACION_ELIMINAR_ARCHIVO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOCcotizacion", SqlDbType.Int).Value = idOCcotizacion;
                        cmd.ExecuteNonQueryAsync();

                        res.ok = true;
                        res.data = "OK";

                        if (object_archivo != null)
                        {
                            urlFotoAntes = (string.IsNullOrEmpty(object_archivo.LogOccoNombreArchivoServidor)) ? "" : object_archivo.LogOccoNombreArchivoServidor
                                ;

                            if (urlFotoAntes.Length > 0)
                            {
                                path = Path.Combine(environment.WebRootPath, "ArchivosAppEscritorio", urlFotoAntes);

                                if (File.Exists(path))
                                {
                                    File.Delete(path);
                                }
                            }
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


    }
}

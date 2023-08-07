using Api_Comfutura.Models;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Api_Comfutura.Services.Implementations.Uploads
{
    public class UploadsServices : IUploads
    {

        private readonly MFsoft_COMFUTURAContext db;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;


        public UploadsServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.db = _context;
            this._configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }

         public async Task<object> guardarImagenUsuario([FromForm] IFormFile file , string filtros)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";


            try
            {
                string[] parametros = filtros.Split('|');
                int idUsuario = Convert.ToInt32(parametros[0].ToString());
                int idusuarioLogin = Convert.ToInt32(parametros[1].ToString());


                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = idUsuario + "_image_user_" + Guid.Parse(Guid.NewGuid().ToString("B")) + extension;
                    
                    path =  Path.Combine(environment.WebRootPath, "Imagen",nombreFileServer );

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    res.ok = true;
                    res.data = "Se guardo correctamente..";

                    //if (File.Exists(path))
                    //{
                    //    ///----validando que en servidor solo halla una sola foto---
                    //    //TblUsuario? object_usuario;
                    //    //object_usuario = db.TblUsuarios.Where(p => p.IdUsuario == idUsuario).FirstOrDefault<TblUsuario>();
                    //    //string urlFotoAntes = (string.IsNullOrEmpty(object_usuario.Fotourl)) ? "" : object_usuario.Fotourl;

                    //    //Set_Actualizar_imagenUsuario(idUsuario, nombreFileServer);

                    //    string urlFotoAntes = "Archivos/Imagen/100_image_user_f3d6194b-fab4-4b12-b9ed-952e6ee8d507.jpg";

                    //    path = Path.Combine(environment.WebRootPath,urlFotoAntes);

                    //    res.ok = true;
                    //    res.data = path;

                    //    //---si previamente habia una foto, al reemplazarla borramos la anterior
                    //    if (urlFotoAntes.Length > 0)
                    //    {
                    //        //path = System.Web.Hosting.HostingEnvironment.MapPath("~/Imagen/" + urlFotoAntes);

                    //        if (File.Exists(path))
                    //        {
                    //            File.Delete(path);
                    //        }

                    //        path =  environment.ContentRootPath + urlFotoAntes;


                    //    }


                    //}
                    //else
                    //{
                    //    res.ok = false;
                    //    res.data = "No se pudo guardar el archivo en el servidor..";
                    //}
                }
                else {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }  
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }


        //public string Set_Actualizar_imagenUsuario(int idProducto, string nombreFileServer)
        //{
        //    string resultado = "";
        //    //try
        //    //{
        //    //    using (SqlConnection cn = new SqlConnection(bdConexion.cadenaBDcx()))
        //    //    {
        //    //        cn.Open();
        //    //        using (SqlCommand cmd = new SqlCommand("SP_PROY_W_MANT_USUARIOS_FOTO", cn))
        //    //        {
        //    //            cmd.CommandTimeout = 0;
        //    //            cmd.CommandType = CommandType.StoredProcedure;
        //    //            cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = idProducto;
        //    //            cmd.Parameters.Add("@nombreFoto", SqlDbType.VarChar).Value = nombreFileServer;

        //    //            cmd.ExecuteNonQuery();
        //    //            resultado = "OK";
        //    //        }
        //    //    }
        //    //}
        //    //catch (Exception e)
        //    //{
        //    //    resultado = e.Message;
        //    //}
        //    //return resultado;
        //}


 

        public async Task<object> guardarExcelMedico([FromForm] IFormFile file, string filtros)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";

            try
            {
                string[] parametros = filtros.Split('|');
                int idUsuario = Convert.ToInt32(parametros[0].ToString());
                int idusuarioLogin = Convert.ToInt32(parametros[1].ToString());


                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = idUsuario + "_excel_" + Guid.Parse(Guid.NewGuid().ToString("B")) + extension;

                    path = Path.Combine(environment.WebRootPath, "Archivos/Excel", nombreFileServer);

                    //-----guardando la el archivo .....
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //-------almacenando la archivo---
                    if (File.Exists(path))
                    {
 
                        string valor = await setAlmacenandoFile_ExcelMedico(path, file.FileName, idUsuario);
                        if (valor == "OK")
                        {
                            res.ok = true;
                            res.data = await get_datosCargadosMedicos(idUsuario);

                        }
                    }
                    else
                    {
                        res.ok = false;
                        res.data = "No se pudo almacenar el archivo en el servidor";
        
                    } 
                }
                else
                {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }



        public async Task<DataTable> ListaExcel(string fileLocation, string nombreLibro)
        {
            DataTable dt = new DataTable();
 
             using (OleDbConnection connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\""))
            {
                try
                {
                    await connection.OpenAsync();

                    OleDbDataAdapter da = new OleDbDataAdapter("SELECT *FROM  " + nombreLibro, connection);
                    da.SelectCommand.CommandType = CommandType.Text;
                    da.Fill(dt);
                    await connection.CloseAsync();
                }
                catch (Exception)
                {
                    await connection.CloseAsync();
                    throw;
                } 
            }
 
            return dt;
        }


        public async Task<string> setAlmacenandoFile_ExcelMedico(string fileLocation, string nombreArchivo, int idUsuario)
        {
            string resultado = "";
            DataTable dt = new DataTable();

            try
            {
                dt = await ListaExcel(fileLocation, "[Medicos$]");

                using (SqlConnection con = new SqlConnection(cadenaConexion))
                {
                    await con.OpenAsync();

                    //eliminando registros del usuario
                    using (SqlCommand cmd = new SqlCommand("SP_PROY_W_MANT_MEDICO_TEMPORAL_MEDICOS_DELETE", con))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = idUsuario;
                       await cmd.ExecuteNonQueryAsync();
                    }

                    //guardando al informacion de la importacion
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(con))
                    {

                        bulkCopy.BatchSize = 500;
                        bulkCopy.NotifyAfter = 1000;
                        bulkCopy.DestinationTableName = "TEMPORAL_MEDICOS";
                        await bulkCopy.WriteToServerAsync(dt);

                        //Actualizando campos 

                        string Sql = "UPDATE TEMPORAL_MEDICOS SET nombreArchivo='" + nombreArchivo + "', usuario_importacion='" + idUsuario + "', fechaBD=getdate()   WHERE usuario_importacion IS NULL    ";

                        using (SqlCommand cmd = new SqlCommand(Sql, con))
                        {
                            cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.Text;
                            await cmd.ExecuteNonQueryAsync();
                        }
                    }
                    resultado = "OK";
                }
            }
            catch (Exception)
            {
                throw;
            }
            return resultado;
        }


        public async Task<DataTable> get_datosCargadosMedicos(int id_usuario)
        {
            DataTable dt_detalle = new DataTable();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    await cn.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand("SP_PROY_W_MANT_MEDICO_TEMPORAL_MEDICOS_LISTAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@id_usuario", SqlDbType.VarChar).Value = id_usuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return dt_detalle;
        }


        public async Task<object> generarExcel_cancelaciones(string mesAnio, int idUsuario)
        {
            Resultado res = new Resultado();
            string[] fechaMesAnio = mesAnio.Split('-');
            DataTable dt_detalle = new DataTable();

            try
            {

                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    await cn.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand("SP_PROY_W_PROC_GASTOS_ASIENTO_CONTABLE_CANCELACIONES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@mes", SqlDbType.Int).Value = fechaMesAnio[1];
                        cmd.Parameters.Add("@anio", SqlDbType.Int).Value = fechaMesAnio[0];

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dt_detalle);

                            if (dt_detalle.Rows.Count <= 0)
                            {
                                res.ok = false;
                                res.data = "0|No hay informacion disponible";
                            }
                            else
                            {
                                res.ok = true;
                                res.data = generarExcel_cancelacionesGastos(dt_detalle, idUsuario);
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

        public string generarExcel_cancelacionesGastos(DataTable listPendientes, int idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 0;
            int index = 0;
            int cantCol = 0;

            try
            {

                var nombreFileServer = idUsuario + "_cancelaciones_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta  = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = _configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("Cancelaciones");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma",8);
                            

                    cantCol = listPendientes.Columns.Count;

                    _fila += 1;
                    //---- incrustando las columnas ------
                    foreach (DataColumn col in listPendientes.Columns)
                    {
                        index += 1;
                        oWs.Cells[_fila, index].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);    //--bordes en una celda-------
                        oWs.Cells[_fila, index].Value = col;

                    }
                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listPendientes.Rows)
                    {
                        index = 0;
                        foreach (DataColumn col in listPendientes.Columns)
                        {
                            index += 1;
                            oWs.Cells[_fila, index].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);    //--bordes en una celda-------
                            oWs.Cells[_fila, index].Value = row[col].ToString();
                        }
                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= cantCol; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Res;
        }
 

        Task<object> IUploads.generarExcel_cancelaciones(string mesAnio, int idUsuario)
        {
            throw new NotImplementedException();
        }


        public async Task<object> guardarArchivoRequerimiento([FromForm] IFormFile file, int idOt, int idTipoDoc, string idUsuario)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";

            try
            {       
                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = Guid.Parse(Guid.NewGuid().ToString("B")) + extension;

                    path = Path.Combine(environment.WebRootPath, "Archivos", nombreFileServer);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (File.Exists(path))
                    {
                        guardar_archivoRequerimiento(idOt, idTipoDoc, idUsuario, nombreFile, nombreFileServer);
                    }
                    else
                    {
                        res.ok = false;
                        res.data = "No se pudo guardar el archivo en el servidor..";
                    }
                    res.ok = true;
                    res.data = "Se guardo correctamente..";
                }
                else
                {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }


        public void guardar_archivoRequerimiento(int idOt, int idTipoDoc, string idUsuario, string nombreArchivo, string nombreServidor)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_GRABAR_ARCHIVOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOt", SqlDbType.Int).Value = idOt;
                        cmd.Parameters.Add("@idTipoDoc", SqlDbType.Int).Value = idTipoDoc;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = nombreArchivo;
                        cmd.Parameters.Add("@nombreServidor", SqlDbType.VarChar).Value = nombreServidor;

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }



        public async Task<object> guardarArchivoOC([FromForm] IFormFile file, int idOC, int idTipoDoc, string idUsuario, int Ganador)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";

            try
            {
                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = Guid.Parse(Guid.NewGuid().ToString("B")) + extension;

                    path = Path.Combine(environment.WebRootPath, "ArchivosAppEscritorio", nombreFileServer);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (File.Exists(path))
                    {
                        grabar_archivoOc(idOC, idTipoDoc, idUsuario, nombreFile, nombreFileServer, Ganador);
                    }
                    else
                    {
                        res.ok = false;
                        res.data = "No se pudo guardar el archivo en el servidor..";
                    }
                    res.ok = true;
                    res.data = "Se guardo correctamente..";
                }
                else
                {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }

        public void grabar_archivoOc(int idOC, int idTipoDoc, string idUsuario, string nombreArchivo, string nombreServidor, int Ganador)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_COTIZACION_GRABAR_ARCHIVOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOC", SqlDbType.Int).Value = idOC;
                        cmd.Parameters.Add("@idTipoDoc", SqlDbType.Int).Value = idTipoDoc;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = nombreArchivo;
                        cmd.Parameters.Add("@nombreServidor", SqlDbType.VarChar).Value = nombreServidor;
                        cmd.Parameters.Add("@Ganador", SqlDbType.Int).Value = Ganador;

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<object> guardarArchivoCobranzas([FromForm] IFormFile file, int IdCobranza, string idUsuario)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";

            try
            {
                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = "cobr_anza_" + Guid.Parse(Guid.NewGuid().ToString("B")) + extension;

                    path = Path.Combine(environment.WebRootPath, "Imagen", nombreFileServer);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (File.Exists(path))
                    {
                        grabar_archivoCobranza(IdCobranza ,idUsuario, nombreFile, nombreFileServer);
                    }
                    else
                    {
                        res.ok = false;
                        res.data = "No se pudo guardar el archivo en el servidor..";
                    }
                    res.ok = true;
                    res.data = "Se guardo correctamente..";
                }
                else
                {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }

        public void grabar_archivoCobranza(int IdCobranza, string idUsuario, string nombreArchivo, string nombreServidor)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_COBRANZAS_GRABAR_VOUCHER", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdCobranza", SqlDbType.Int).Value = IdCobranza;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = nombreArchivo;
                        cmd.Parameters.Add("@nombreServidor", SqlDbType.VarChar).Value = nombreServidor;

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<object> guardarArchivoDetracciones([FromForm] IFormFile file, int IdDocumento, string idUsuario)
        {
            Resultado res = new Resultado();

            string nombreFileServer = "";
            string path = "";

            try
            {
                if (file.Length > 0)
                {
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string nombreFile = file.FileName;

                    nombreFileServer = "detr_acci_on_" + Guid.Parse(Guid.NewGuid().ToString("B")) + extension;

                    path = Path.Combine(environment.WebRootPath, "Imagen", nombreFileServer);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (File.Exists(path))
                    {
                        grabar_archivoDetraccion(IdDocumento, idUsuario, nombreFile, nombreFileServer);
                    }
                    else
                    {
                        res.ok = false;
                        res.data = "No se pudo guardar el archivo en el servidor..";
                    }
                    res.ok = true;
                    res.data = "Se guardo correctamente..";
                }
                else
                {
                    res.ok = false;
                    res.data = "No se encontro el archivo enviado...";
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }

            return res;
        }

        public void grabar_archivoDetraccion(int IdDocumento, string idUsuario, string nombreArchivo, string nombreServidor)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_GRABAR_VOUCHER_DETRACCION", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdDocumento", SqlDbType.Int).Value = IdDocumento;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;
                        cmd.Parameters.Add("@nombreArchivo", SqlDbType.VarChar).Value = nombreArchivo;
                        cmd.Parameters.Add("@nombreServidor", SqlDbType.VarChar).Value = nombreServidor;

                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }




    }
}

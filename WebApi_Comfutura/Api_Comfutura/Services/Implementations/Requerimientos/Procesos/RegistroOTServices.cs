using Api_Comfutura.Models;
using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Drawing;
using System.IO;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Api_Comfutura.Services.Implementations.Requerimientos.Procesos
{
    public class RegistroOTServices : IRegistroOT
    {
        private readonly MFsoft_COMFUTURAContext db;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;

        public RegistroOTServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration,  IWebHostEnvironment environment)
        {
            this.db = _context;
            this.configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
 
        }

        public  object get_ubigeosDepartamento()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_DEPARTAMENTO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public  object get_ubigeosProvincias(string idDepartamento)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_PROVINCIA", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@CodDpto", SqlDbType.VarChar).Value = idDepartamento;

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

        public  object get_ubigeosDistritos(string idDepartamento, string idProvincia)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_DISTRITO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@CodDpto", SqlDbType.VarChar).Value = idDepartamento;
                        cmd.Parameters.Add("@CodProv", SqlDbType.VarChar).Value = idProvincia;

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

        public  object get_estadosRegistroOT()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_ESTADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public  object get_registroOTcab(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            List<RegistroOT_E> obj_List = new List<RegistroOT_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@departamento", SqlDbType.VarChar).Value = departamento;
                        cmd.Parameters.Add("@provincia", SqlDbType.VarChar).Value = provincia;
                        cmd.Parameters.Add("@distrito", SqlDbType.VarChar).Value = distrito;

                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroOT_E Entidad = new RegistroOT_E();

                                Entidad.idOT = Convert.ToInt32(dr["idOT"]);
                                   
                                Entidad.estado = dr["estado"].ToString();
                                Entidad.descripcionEstado = dr["descripcionEstado"].ToString();

                                Entidad.nroOT = dr["nroOT"].ToString();
                                Entidad.nombreOT = dr["nombreOT"].ToString();
                                Entidad.proyecto = dr["proyecto"].ToString();
                                Entidad.nombreSite = dr["nombreSite"].ToString();
                                Entidad.id = dr["id"].ToString();

                                Entidad.region = dr["region"].ToString();
                                Entidad.fechaApertura = dr["fechaApertura"].ToString();
                                Entidad.cliente = dr["cliente"].ToString();
 
                                obj_List.Add(Entidad);
                            }
                            dr.Close();
                        }

                        res.ok = true;
                        res.data = obj_List;
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

        public  object get_proyectos()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_PROYECTOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public  object get_clientes()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_CLIENTE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public  object get_personales()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_PERSONAL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public  object get_registroOT_id(int idOT)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_CAB_ID", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

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

        public  object set_anular_registroOT(int idOT)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;
                         cmd.ExecuteNonQueryAsync();

                        res.ok = true;
                        res.data = "OK";
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

        public  object get_descargarGrilla_registroOTcab(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            DataTable listaDetallado = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                     cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_CAB_EXCEL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@departamento", SqlDbType.VarChar).Value = departamento;
                        cmd.Parameters.Add("@provincia", SqlDbType.VarChar).Value = provincia;
                        cmd.Parameters.Add("@distrito", SqlDbType.VarChar).Value = distrito;

                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(listaDetallado);
                        }
                    }
                }

                if (listaDetallado.Rows.Count <= 0)
                {
                    res.ok = false;
                    res.data = "0|No hay informacion disponible";
                }
                else
                {
                    res.ok = true;
                    res.data = generarExcel_registroOT_new(listaDetallado, usuario);
                }

            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }
  
        public string generarExcel_registroOT(DataTable listDetalle, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {

                var nombreFileServer = idUsuario + "_registroOT_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("registroOT");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);


                    oWs.Cells[_fila, pos].Value = "#"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NOMBRE OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PROYECTO"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "NOMBRE SITE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ID"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "REGION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA APERTURA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "CLIENTE"; pos += 1;

                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        ac += 1;
                        pos = 1;

                        oWs.Cells[_fila, pos].Value = ac; pos += 1;
                        oWs.Cells[_fila, pos].Value = row["descripcionEstado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["nroOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["nombreOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["proyecto"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["nombreSite"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["id"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["region"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["fechaApertura"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["cliente"].ToString(); pos += 1; 

                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 10; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Res;
        }

        public string generarExcel_registroOT_new(DataTable listDetalle, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {

                var nombreFileServer = idUsuario + "_registroOT_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("registroOT");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);


                    oWs.Cells[_fila, pos].Value = "Item"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Año"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Numero OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Nombre de OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Area"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Nombre del SITE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ID"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Region"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Monto de Presupuesto"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha Asignacion"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "Cliente"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha de Envio TSS"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha de Envio PPTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha de Validacion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Cont. Dias Envio PPTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Cont.Tiempo Asignacion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha O.C"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Solicitud PAP"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Numero O.C"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Posicion"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "Importe O.C"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Forma de Pago"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Días trans. desde la Asig. hasta OC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Tiempo trans. desde la Asignación"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Tiempo trans. desde la Validación del PPTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha Inicio"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha Final"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Fecha de Finalizacion"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Importe Liquidado"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "% Liquidacion"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "Fecha de Emision Fac."; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Numero Factura"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Importe de Factura"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Estado"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Jefatura del Cliente Solicitante"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Analista del Cliente Solicitante"; pos += 1;                    
                    oWs.Cells[_fila, pos].Value = "Coordinador TI/CW"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Jefatura Responsable"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Ejecutante"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "Analista Contable"; pos += 1;
 

                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        ac += 1;
                        pos = 1;

                        oWs.Cells[_fila, pos].Value = ac; pos += 1;                    

                        oWs.Cells[_fila, pos].Value = row["Anio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NumeroOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NombreOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Area"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NombreSITE"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["ID"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Region"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["MontoPresupuesto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaAsignacion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["Cliente"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaEnvioTSS"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaEnvioPPTO"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaValidacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["ContDiasEnvioPPTO"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["ContTiempoAsignacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaOC"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["SolicitudPAP"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NumeroOC"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Posicion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["ImporteOC"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FormaPago"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["DiasTransDesdeAsigHastaOC"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["TiempoTransDesdeAsignacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["TiempoTransDesdeValidacionPPTO"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaInicio"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaFinal"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaFinalizacion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["ImporteLiquidado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["PorcentajeLiquidacion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["FechaEmisionFac"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NumeroFactura"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["ImporteFactura"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Estado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["JefaturaClienteSolicitante"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["AnalistaClienteSolicitante"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["CoordinadorTICW"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["JefaturaResponsable"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Ejecutante"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["AnalistaContable"].ToString(); pos += 1; 

                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 40; k++)
                    {
                        oWs.Column(k).AutoFit();
                    }

                    oEx.Save();
                    Res = FileExcel;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Res;
        }


        public object get_tiposDocumentos()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_COMBO_TIPOS_DOC", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

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

        public object get_detalleArchivosOT( int idOT )
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_DETALLE_ARCHIVOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOT", SqlDbType.Int).Value = idOT;

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

        public object set_eliminar_archivoOT(int idOtArchivo)
        {
            Resultado res = new Resultado();
            string urlFotoAntes = "";
            string path = "";

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {

                    TblTelefoniaOtArchivo? object_archivo;
                    object_archivo = db.TblTelefoniaOtArchivos.Where(p => p.IdOtArchivo == idOtArchivo).FirstOrDefault<TblTelefoniaOtArchivo>();

                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_OT_ELIMINAR_ARCHIVOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idOtArchivo", SqlDbType.Int).Value = idOtArchivo;
                        cmd.ExecuteNonQueryAsync();

                        res.ok = true;
                        res.data = "OK";

                        if (object_archivo != null) {
                            urlFotoAntes = (string.IsNullOrEmpty(object_archivo.NombreArchivoServidor)) ? "" : object_archivo.NombreArchivoServidor;

                            if (urlFotoAntes.Length > 0) {
                                path = Path.Combine(environment.WebRootPath, "Archivos", urlFotoAntes);

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

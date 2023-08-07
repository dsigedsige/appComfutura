using Api_Comfutura.Models;
using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Models.Share;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Microsoft.Data.SqlClient;
using System.Data;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Api_Comfutura.Services.Implementations.Requerimientos.Procesos
{
    public class RegistroSolicitudesServices : IRegistroSolicitudes
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;

        public RegistroSolicitudesServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration, IWebHostEnvironment environment)
        {
            context = _context;
            this.configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }

        public object get_registroSolicitudCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            List<RegistroSolicitud_E> obj_List = new List<RegistroSolicitud_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@departamento", SqlDbType.VarChar).Value = departamento;
                        cmd.Parameters.Add("@provincia", SqlDbType.VarChar).Value = provincia;
                        cmd.Parameters.Add("@nroRequerimiento", SqlDbType.VarChar).Value = String.IsNullOrEmpty(nroRequerimiento) ? DBNull.Value : nroRequerimiento;

                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroSolicitud_E Entidad = new RegistroSolicitud_E();

                                Entidad.IdSolicitud = Convert.ToInt32(dr["IdSolicitud"]);
                                Entidad.NroSolicitud = dr["NroSolicitud"].ToString();
                                Entidad.IdPresupuesto = Convert.ToInt32(dr["IdPresupuesto"]);
                                Entidad.NroPresupuesto = dr["NroPresupuesto"].ToString();
                                Entidad.FechaSolicitud = Convert.ToDateTime(dr["FechaSolicitud"]);

                                Entidad.IdOt = dr["IdOt"].ToString();
                                Entidad.NroOT = dr["NroOT"].ToString();
                                Entidad.Site = dr["Site"].ToString();

                                Entidad.IdProyectoTelefonia = dr["IdProyectoTelefonia"].ToString();
                                Entidad.Proyecto = dr["Proyecto"].ToString();

                                Entidad.IdTipoTrabajoTelefonia = dr["IdTipoTrabajoTelefonia"].ToString();
                                Entidad.TipoTrabajo = dr["TipoTrabajo"].ToString();                    
                                
                                Entidad.Estado = dr["Estado"].ToString();
                                Entidad.descripcionEstado = dr["descripcionEstado"].ToString();

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
         
        public object get_estadosSolicitudes()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_COMBO_ESTADOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Combos_E Entidad = new Combos_E();

                                Entidad.id = dr["id"].ToString();
                                Entidad.descripcion = dr["descripcion"].ToString();

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

        public object get_buscarNroPresupuesto(string nroPresupuesto)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_BUSCAR_NRO_PRESUPUESTO", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroPresupuesto", SqlDbType.VarChar).Value = nroPresupuesto;

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

        public async void set_insertUpdate_solicitudes(int IdSolicitud, string? usuario, string Proceso)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                   await cn.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_CAB_INSERT_UPDATE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = usuario;
                        cmd.Parameters.Add("@Proceso", SqlDbType.VarChar).Value = Proceso;
                        await cmd.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public object get_descargarGrilla_solicitudesCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            DataTable listaDetallado = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@departamento", SqlDbType.VarChar).Value = departamento;
                        cmd.Parameters.Add("@provincia", SqlDbType.VarChar).Value = provincia;
                        cmd.Parameters.Add("@nroRequerimiento", SqlDbType.VarChar).Value = String.IsNullOrEmpty(nroRequerimiento) ? DBNull.Value : nroRequerimiento;

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
                    res.data = generarExcel_solicitudes(listaDetallado, usuario);
                }

            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public string generarExcel_solicitudes(DataTable listDetalle, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {

                var nombreFileServer = idUsuario + "_solicitudes_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("solicitudes");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);

                    oWs.Cells[_fila, pos].Value = "#"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO  "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NRO REQUERIMIENTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA REQUERIMIENTO "; pos += 1;

                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SITE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "PROYECTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO TRABAJO   "; pos += 1;      

                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        ac += 1;
                        pos = 1;

                        oWs.Cells[_fila, pos].Value = ac; pos += 1;
                        oWs.Cells[_fila, pos].Value = row["descripcionEstado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NroSolicitud"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaSolicitud"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["NroOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Site"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Proyecto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["TipoTrabajo"].ToString(); pos += 1;     

                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 8; k++)
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


        public object set_anular_solicitud(int IdSolicitud, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;


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

        public object get_detalleResumenSolicitud(int IdSolicitud)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_TAB_RESUMEN", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;

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


        public object set_provisionar_solicitud(int IdSolicitud, string IdUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_PROVISIONAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;
                        cmd.Parameters.Add("@IdUsuario", SqlDbType.VarChar).Value = IdUsuario;


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

        //---- TAB MATERIALES -----


        public object get_materialesSolicitud(int IdSolicitud)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_TAB_MATERIAL", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;

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

        public object get_detalleTabsGruposSolicitud(int IdSolicitud, int IdTipoTabs)
        {
            Resultado res = new Resultado();
            List<TabsGruposSolicitud_E> obj_List = new List<TabsGruposSolicitud_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_DETALLE_TAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;
                        cmd.Parameters.Add("@IdTipoTabs", SqlDbType.Int).Value = IdTipoTabs;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                TabsGruposSolicitud_E Entidad = new TabsGruposSolicitud_E();

                                Entidad.checkeado = false;
                                Entidad.IdSolicitudTabs = Convert.ToInt32(dr["IdSolicitudTabs"].ToString());
                                Entidad.IdSolicitud = Convert.ToInt32(dr["IdSolicitud"].ToString());
                                Entidad.IdTipoTabs = Convert.ToInt32(dr["IdTipoTabs"].ToString());
                                Entidad.IdTipoMovCaja = dr["IdTipoMovCaja"].ToString();
                                Entidad.DescripcionDetallada = dr["DescripcionDetallada"].ToString();
                                Entidad.AlmUmedCodigo = dr["AlmUmedCodigo"].ToString();
                                Entidad.DescripcionUM = dr["DescripcionUM"].ToString();

                                Entidad.CantidadPresupuesto = dr["CantidadPresupuesto"].ToString();
                                Entidad.PrecioPresupuesto = dr["PrecioPresupuesto"].ToString();
                                Entidad.CostoPresupuesto = dr["CostoPresupuesto"].ToString();

                                Entidad.CantidadSolicitud = dr["CantidadSolicitud"].ToString();
                                Entidad.PrecioSolicitud = dr["PrecioSolicitud"].ToString();
                                Entidad.CostoSolicitud = dr["CostoSolicitud"].ToString();

                                Entidad.IdTipoPersonal = dr["IdTipoPersonal"].ToString();
                                Entidad.NroDocPersonal = dr["NroDocPersonal"].ToString();
                                Entidad.DescripcionPersonal = dr["DescripcionPersonal"].ToString();

                                Entidad.IdBanco = dr["IdBanco"].ToString();
                                Entidad.PubMoneCodigo = dr["PubMoneCodigo"].ToString();
                                Entidad.CuentaBanco = dr["CuentaBanco"].ToString();
                                Entidad.CuentaInterbancarioBanco = dr["CuentaInterbancarioBanco"].ToString();
                                Entidad.Estado = dr["Estado"].ToString();
                                Entidad.Fecha = String.IsNullOrEmpty(dr["Fecha"].ToString()) ? null : Convert.ToDateTime(dr["Fecha"]);

                                Entidad.DescripcionBanco = dr["DescripcionBanco"].ToString();
                                Entidad.CargoPersonal = dr["CargoPersonal"].ToString();
                                Entidad.DescripcionCargoPersonal = dr["DescripcionCargoPersonal"].ToString();
                                Entidad.ObsRendicion = dr["ObsRendicion"].ToString();                            

                                Entidad.TotalGeneralPresupuesto = dr["TotalGeneralPresupuesto"].ToString();
                                Entidad.TotalGeneralRequerimiento = dr["TotalGeneralRequerimiento"].ToString();
                                Entidad.SaldoGeneralPendiente = dr["SaldoGeneralPendiente"].ToString();

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

        public object set_eliminarTabsGruposSolicitud(int IdSolicitudTabs)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_DELETE_TABS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitudTabs", SqlDbType.Int).Value = IdSolicitudTabs;
                        cmd.ExecuteNonQuery();

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

        public object set_anularTabsGruposSolicitud(int IdSolicitudTabs,   string IdUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_ANULAR_TABS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdSolicitudTabs", SqlDbType.Int).Value = IdSolicitudTabs;
                        cmd.Parameters.Add("@IdUsuario", SqlDbType.VarChar).Value = IdUsuario;
                        cmd.ExecuteNonQuery();

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

        public object set_saveDetalleTabsMasivo(TabsAsignacionPersonal objTabs, int IdSolicitud, string usuario)
        {
            Resultado res = new Resultado();
            string idSolicitudes = "";
            if (objTabs.ListSolicitudesTabs != null)
            {
                idSolicitudes = String.Join(",", objTabs.ListSolicitudesTabs);
            }
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_SOLICITUD_ASIGNAR_PERSONAL_TABS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@idSolicitudesMasivos", SqlDbType.VarChar).Value = idSolicitudes;
                        cmd.Parameters.Add("@IdSolicitud", SqlDbType.Int).Value = IdSolicitud;

                        cmd.Parameters.Add("@IdTipoPersonal", SqlDbType.VarChar).Value = objTabs.IdTipoPersonal;
                        cmd.Parameters.Add("@NroDocPersonal", SqlDbType.VarChar).Value = objTabs.NroDocPersonal;
                        cmd.Parameters.Add("@IdBanco", SqlDbType.Int).Value = objTabs.IdBanco;
                        cmd.Parameters.Add("@PubMoneCodigo", SqlDbType.VarChar).Value = objTabs.PubMoneCodigo;
                        cmd.Parameters.Add("@CuentaBanco", SqlDbType.VarChar).Value = objTabs.CuentaBanco;
                        cmd.Parameters.Add("@CuentaInterbancarioBanco", SqlDbType.VarChar).Value = objTabs.CuentaInterbancarioBanco;

                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;


                        var resu = cmd.ExecuteNonQuery();

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

    }
}

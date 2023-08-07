using Api_Comfutura.Models;
using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Models.Share;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Microsoft.Data.SqlClient;
using OfficeOpenXml.Style;
using System.Data;
using System.Drawing;
using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Api_Comfutura.Services.Implementations.Requerimientos.Procesos
{
    public class RegistroRequerimientoServices : IRegistroRequerimiento
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;

        public RegistroRequerimientoServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration, IWebHostEnvironment environment)
        {
            context = _context;
            this.configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }

 
        public object get_estadosRequerimiento()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_ESTADOS", cn))
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

        public object get_registroRequerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            List<RegistroRequerimiento_E> obj_List = new List<RegistroRequerimiento_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@departamento", SqlDbType.VarChar).Value = departamento;
                        cmd.Parameters.Add("@provincia", SqlDbType.VarChar).Value = provincia;
                        cmd.Parameters.Add("@nroRequerimiento", SqlDbType.VarChar).Value = String.IsNullOrEmpty(nroRequerimiento)? DBNull.Value : nroRequerimiento;

                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroRequerimiento_E Entidad = new RegistroRequerimiento_E();

                                Entidad.IdRequerimiento = Convert.ToInt32(dr["IdRequerimiento"]);    
                                Entidad.NroRequerimiento = dr["NroRequerimiento"].ToString();
                                Entidad.FechaCosto = Convert.ToDateTime(dr["FechaCosto"]);
                                Entidad.HoraCosto = dr["HoraCosto"].ToString();

                                Entidad.IdProyectoTelefonia = dr["IdProyectoTelefonia"].ToString();
                                Entidad.Proyecto = dr["Proyecto"].ToString();

                                Entidad.IdTipoTrabajoTelefonia = dr["IdTipoTrabajoTelefonia"].ToString();
                                Entidad.TipoTrabajo = dr["TipoTrabajo"].ToString();

                                Entidad.IdAreaTelefonia = dr["IdAreaTelefonia"].ToString();
                                Entidad.Area = dr["Area"].ToString();

                                Entidad.IdOt = dr["IdOt"].ToString();
                                Entidad.NroOT = dr["NroOT"].ToString();
                                Entidad.Site = dr["Site"].ToString();

                                Entidad.TiempoEjecucion = dr["TiempoEjecucion"].ToString();
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
        
        public object get_tiposTrabajo()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_TIPO_TRABAJO", cn))
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
        
        public object get_areas()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_AREAS", cn))
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

        public object get_buscarNroOT(string nroOT)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_BUSCAR_NRO_OT", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroOT", SqlDbType.VarChar).Value = nroOT;

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

        public object set_anular_requerimiento(int IdRequerimiento, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;
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


        public object get_descargarGrilla_requerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            Resultado res = new Resultado();
            DataTable listaDetallado = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_CAB", cn))
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
                    res.data = generarExcel_requerimiento(listaDetallado, usuario);
                }

            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public string generarExcel_requerimiento(DataTable listDetalle, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {

                var nombreFileServer = idUsuario + "_requerimiento_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("requerimiento");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);


                    oWs.Cells[_fila, pos].Value = "#"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NRO REQUERIMIENTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA COSTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "HORA DE COSTO "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "OT"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "SITE"; pos += 1;

                    oWs.Cells[_fila, pos].Value = "PROYECTO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO TRABAJO "; pos += 1;
                    oWs.Cells[_fila, pos].Value = "AREA"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIEMPO EJECUCION"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO"; pos += 1;
 

                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        ac += 1;
                        pos = 1;

                        oWs.Cells[_fila, pos].Value = ac; pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NroRequerimiento"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaCosto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["HoraCosto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NroOT"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Site"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["Proyecto"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["TipoTrabajo"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["Area"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["TiempoEjecucion"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["descripcionEstado"].ToString(); pos += 1;

                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 11; k++)
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

        //---- TAB CRONOGRAMAS -----


        public object get_detalleCronograma(int IdRequerimiento)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_CRONOGRAMAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;

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

        public object set_eliminar_cronograma(int IdReqCronograma)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_DELETE_CRONOGRAMA", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdReqCronograma", SqlDbType.Int).Value = IdReqCronograma;
 
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
        

        public object get_partidas()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_PARTIDAS", cn))
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


        public object get_detalleResumen(int IdRequerimiento)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_RESUMEN", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;

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

        //---- TAB MATERIALES -----


        public object get_materialesCab(int IdRequerimiento)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_MATERIALES_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;

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


        public object get_detalleMateriales(string usuario)
        {
            Resultado res = new Resultado();
            List<MaterialesDet_E> obj_List = new List<MaterialesDet_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_MATERIALES_DET", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                MaterialesDet_E Entidad = new MaterialesDet_E();

                                Entidad.checkeado = false;
                                Entidad.codigoMaterial = dr["codigoMaterial"].ToString();
                                Entidad.descripcionMaterial = dr["descripcionMaterial"].ToString();
                                Entidad.unidadMedida = dr["unidadMedida"].ToString();
                                Entidad.costo = dr["costo"].ToString();

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


        public object set_grabarMateriales(string codigosMateriales, int IdRequerimiento, string usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_MATERIALES_GRABAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@codigosMateriales", SqlDbType.VarChar).Value = codigosMateriales;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;


                       var resu =  cmd.ExecuteNonQuery();

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

        public object set_actualizar_cantidadMaterial(int IdReqMaterial, string AlmArtiCodigo, string CantidadPresupuesto, string CostoPresupuesto, string Usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_MATERIALES_ACTUALIZAR_CANT", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdReqMaterial", SqlDbType.Int).Value = IdReqMaterial;
                        cmd.Parameters.Add("@AlmArtiCodigo", SqlDbType.VarChar).Value = AlmArtiCodigo;
                        cmd.Parameters.Add("@CantidadPresupuesto", SqlDbType.VarChar).Value = CantidadPresupuesto;
                        cmd.Parameters.Add("@CostoPresupuesto", SqlDbType.VarChar).Value = CostoPresupuesto;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = Usuario;


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

        public object set_eliminar_material(int IdReqMaterial)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_MATERIALES_ELIMINAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdReqMaterial", SqlDbType.Int).Value = IdReqMaterial;

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

        //----contratista
 
        public object get_unidadMedidas()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_UM", cn))
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
                                Entidad.abreviatura = dr["abreviatura"].ToString();

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
        
        public object get_tiposDocumentos()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_TIPO_DOC", cn))
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
         
        public object get_monedas()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_MONEDA", cn))
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
         
        public object get_bancos()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_BANCOS", cn))
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

        public object get_personales(string tipoDoc)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_PERSONALES", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@tipoDoc", SqlDbType.VarChar).Value = tipoDoc;

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

        public object get_detalleTabsGrupos(int IdRequerimiento, int IdTipoTabs)
        {
            Resultado res = new Resultado();
            List<TabsGrupos_E> obj_List = new List<TabsGrupos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_DETALLE_TABS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;
                        cmd.Parameters.Add("@IdTipoTabs", SqlDbType.Int).Value = IdTipoTabs;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                TabsGrupos_E Entidad = new TabsGrupos_E(); 

                                Entidad.IdTabs = Convert.ToInt32(dr["IdTabs"].ToString());
                                Entidad.IdRequerimiento = Convert.ToInt32(dr["IdRequerimiento"].ToString());
                                Entidad.IdTipoTabs = Convert.ToInt32(dr["IdTipoTabs"].ToString());
                                Entidad.IdTipoMovCaja = dr["IdTipoMovCaja"].ToString();
                                Entidad.DescripcionDetallada = dr["DescripcionDetallada"].ToString();
                                Entidad.AlmUmedCodigo = dr["AlmUmedCodigo"].ToString();
                                Entidad.DescripcionUM = dr["DescripcionUM"].ToString();

                                Entidad.CantidadPresupuesto = dr["CantidadPresupuesto"].ToString();
                                Entidad.PrecioPresupuesto = dr["PrecioPresupuesto"].ToString();
                                Entidad.CostoPresupuesto = dr["CostoPresupuesto"].ToString(); 
                                Entidad.IdtipoPersonal = dr["IdtipoPersonal"].ToString();
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

        public object set_eliminarTabsGrupos(int IdTabs)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_DELETE_TABS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTabs", SqlDbType.Int).Value = IdTabs;

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

        public object get_tiposConceptos()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_TIPO_CONCEPTO", cn))
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

        public object get_cargosPersonal()
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_COMBO_CARGO", cn))
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


        //*----REPORTES

        public object get_descargar_cronograma(int IdRequerimiento, string usuario)
        {
            Resultado res = new Resultado();
            DataTable listaDetallado = new DataTable();
            DataTable listaFechas = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_RPT_CRONOGRAMA_DET", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(listaDetallado);
                        }
                    }

                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_REQUERIMIENTO_RPT_CRONOGRAMA_FECHAS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdRequerimiento", SqlDbType.Int).Value = IdRequerimiento;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = usuario;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(listaFechas);
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
                    res.data = generarExcel_cronograma(listaDetallado, listaFechas, usuario);
                }

            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public string generarExcel_cronograma(DataTable listDetalle, DataTable listaFechas ,string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;
            int cantDia = 1;
            bool ubicoFecha = false;

            try
            {

                var nombreFileServer = idUsuario + "_crono_grama_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("cronograma");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);

                    int cantRegistro = listaFechas.Rows.Count + 3;

                    oWs.Cells[1, 1].Style.Font.Size = 24; //letra tamaño  2
                    oWs.Cells[1, 1].Value = listDetalle.Rows[0]["tituloReporte"].ToString();
                    oWs.Cells[1, 1, 1, cantRegistro].Merge = true;  // combinar celdaS

                    _fila += 2;


                    oWs.Cells[_fila, pos].Style.Font.Bold = true; oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = "ITEM"; pos += 1;

                    oWs.Cells[_fila, pos].Style.Font.Bold = true;
                    oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = "ACTIVIDADES"; pos += 1;

                    oWs.Cells[_fila, pos].Style.Font.Bold = true;
                    oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = "FECHA"; pos += 1;

                    //---- incrustando del cabecera ----
                    foreach (DataRow row in listaFechas.Rows)
                    {
                        oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        oWs.Cells[_fila, pos].Value = row["fechaDia"].ToString(); pos += 1;
                    }

                    _fila += 1;
                    pos = 1;

                    oWs.Cells[_fila, pos].Style.Font.Bold = true;
                    oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = ""; pos += 1;

                    oWs.Cells[_fila, pos].Style.Font.Bold = true;
                    oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = listDetalle.Rows[0]["site"].ToString(); pos += 1;

                    oWs.Cells[_fila, pos].Style.Font.Bold = true;
                    oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                    oWs.Cells[_fila, pos].Value = "PROG. "; pos += 1;

                    ///enmarcando
                    foreach (DataRow row in listaFechas.Rows)
                    {
                        oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        pos += 1;
                    }
                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        pos = 1;
                        cantDia = 0;
                        ubicoFecha = false;

                        oWs.Cells[_fila, pos].Value = row["codigo_Partida"].ToString(); pos += 1;         
                        oWs.Cells[_fila, pos].Value = row["descripcion_Partida"].ToString(); pos += 1; 
                        oWs.Cells[_fila, pos].Value = row["Duracion"].ToString(); pos += 1;                    
            
                        foreach (DataRow item in listaFechas.Rows)
                        {
                            if (row["FechaInicio"].ToString() == item["fecha"].ToString())
                            {
                                cantDia++;
                                ubicoFecha = true;

                                oWs.Cells[_fila, pos].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                                oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center; // alinear texto 
                                oWs.Cells[_fila, pos].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                oWs.Cells[_fila, pos].Style.Fill.BackgroundColor.SetColor(Color.Chocolate); // color celda
                                oWs.Cells[_fila, pos].Value = "1"; pos += 1;
                                continue;
                            }
                            if (ubicoFecha == true)
                            {
                                if (cantDia <= Convert.ToInt32(row["Duracion"].ToString())) {

                                    if (item["fechaDia"].ToString() == "Domingo")
                                    {
                                        oWs.Cells[_fila, pos].Value = "";
                                        oWs.Cells[_fila, pos].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                        oWs.Cells[_fila, pos].Style.Fill.BackgroundColor.SetColor(Color.DimGray);
                                    }
                                    else {
                                        oWs.Cells[_fila, pos].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                                        oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center; // alinear texto 
                                        oWs.Cells[_fila, pos].Style.Fill.PatternType = ExcelFillStyle.Solid;
                                        oWs.Cells[_fila, pos].Style.Fill.BackgroundColor.SetColor(Color.Chocolate); // color celda
                                        oWs.Cells[_fila, pos].Value = "1";
                                        cantDia++;
                                    } 
                                }
                                if (cantDia == Convert.ToInt32(row["Duracion"].ToString()))
                                {
                                    ubicoFecha = false;
                                    break;
                                }
                            }
                            pos += 1;
                        }

                        _fila++;
                    }

                    //bordes Generales
                    _fila = 5;
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        pos = 1;
                        cantDia = 0;
                        oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        pos += 1;
                        oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        pos += 1;
                        oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                        pos += 1;

                        foreach (DataRow item in listaFechas.Rows)
                        {
                            oWs.Cells[_fila, pos].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin);
                            pos += 1;
                        }
                        _fila++;
                    }

                    oWs.Row(1).Style.Font.Bold = true;
                    oWs.Row(1).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(1).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    oWs.Row(3).Style.Font.Bold = true;
                    oWs.Row(3).Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Center;
                    oWs.Row(3).Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;

                    for (int k = 1; k <= 3; k++)
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


    }
}

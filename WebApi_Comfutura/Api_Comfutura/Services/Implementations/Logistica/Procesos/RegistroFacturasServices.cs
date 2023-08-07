using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Models;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Logistica.Procesos;
using Microsoft.Data.SqlClient;
using System.Data;
using Api_Comfutura.Models.Share;
using Api_Comfutura.Models.Logistica.Procesos;

using Excel = OfficeOpenXml;
using Style = OfficeOpenXml.Style;

namespace Api_Comfutura.Services.Implementations.Logistica.Procesos
{
    public class RegistroFacturasServices : IRegistroFacturas
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        private readonly string cadenaConexion;

        public RegistroFacturasServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration, IWebHostEnvironment environment)
        {
            context = _context;
            this.configuration = configuration;
            this.environment = environment;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }

        public object get_estados()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_COMBO_ESTADO", cn))
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

        public object get_tipoDocumentos()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_COMBO_TIPO_DOC", cn))
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


        public object get_registroFacturasCab(string cliente, string? nroOrdenCompra, string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente)
        {
            Resultado res = new Resultado();
            List<RegistroFacturas_E> obj_List = new List<RegistroFacturas_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@cliente", SqlDbType.VarChar).Value = cliente;
                        cmd.Parameters.Add("@nroOrdenCompra", SqlDbType.VarChar).Value = String.IsNullOrEmpty(nroOrdenCompra) ? DBNull.Value : nroOrdenCompra;
                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;
                        cmd.Parameters.Add("@detracPendiente", SqlDbType.Int).Value = detracPendiente;

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                RegistroFacturas_E Entidad = new RegistroFacturas_E();

                                Entidad.IdTelefoniaDocumentos = dr["IdTelefoniaDocumentos"].ToString();
                                Entidad.Estado = dr["Estado"].ToString();
                                Entidad.DescripcionEstado = dr["DescripcionEstado"].ToString();

                                Entidad.IdTipoDocumento = dr["IdTipoDocumento"].ToString();
                                Entidad.PubMoneCodigo = dr["PubMoneCodigo"].ToString();                                
                            
                                Entidad.DescripcionTipoDoc = dr["DescripcionTipoDoc"].ToString();
                                Entidad.NroDocumento = dr["NroDocumento"].ToString();

                                Entidad.FechaEmsion = Convert.ToDateTime(dr["FechaEmsion"].ToString());
                                Entidad.DescripcionCliente = dr["DescripcionCliente"].ToString();
                                Entidad.DescripcionMoneda = dr["DescripcionMoneda"].ToString();
                                Entidad.BaseImponible = dr["BaseImponible"].ToString();

                                Entidad.ImporteTotal = dr["ImporteTotal"].ToString();
                                Entidad.ImporteNeto = dr["ImporteNeto"].ToString();
                                Entidad.TotalCobrado = dr["TotalCobrado"].ToString();

                                Entidad.SaldoCobrar = dr["SaldoCobrar"].ToString();
                                Entidad.FactoringFlag = Convert.ToInt32( dr["FactoringFlag"]);
                                Entidad.DetraccionFlag = Convert.ToInt32(dr["DetraccionFlag"]);

                                Entidad.PubCcteRucCliente =  dr["PubCcteRucCliente"].ToString();
                                Entidad.TasaDetraccion = Convert.ToInt32(dr["TasaDetraccion"]);

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


        public object get_buscarOrdenCompra(string nroOC, string posic)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_BUSCAR_OC", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@nroOC", SqlDbType.VarChar).Value = nroOC;
                        cmd.Parameters.Add("@posic", SqlDbType.VarChar).Value = posic;

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


        public object get_buscarOT(string nroOT)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_BUSCAR_OT", cn))
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

        public object get_registroFacturaID(int IdTelefoniaDocumentos)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_ID", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTelefoniaDocumentos", SqlDbType.Int).Value = IdTelefoniaDocumentos;

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

        public object get_descargarGrilla_registroFactura(string cliente,string? nroOrdenCompra ,string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente)
        {
            Resultado res = new Resultado();
            DataTable listaDetallado = new DataTable();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@cliente", SqlDbType.VarChar).Value = cliente;
                        cmd.Parameters.Add("@nroOrdenCompra", SqlDbType.VarChar).Value = String.IsNullOrEmpty(nroOrdenCompra) ? DBNull.Value : nroOrdenCompra;
                        cmd.Parameters.Add("@fecha_ini", SqlDbType.VarChar).Value = fecha_ini;
                        cmd.Parameters.Add("@fecha_fin", SqlDbType.VarChar).Value = fecha_fin;
                        cmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estado;
                        cmd.Parameters.Add("@usuario", SqlDbType.VarChar).Value = usuario;
                        cmd.Parameters.Add("@detracPendiente", SqlDbType.Int).Value = detracPendiente;

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
                    res.data = generarExcel_registroFacturas(listaDetallado, usuario);
                }
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        public string generarExcel_registroFacturas(DataTable listDetalle, string idUsuario)
        {
            string Res = "";
            string FileRuta = "";
            string FileExcel = "";
            int _fila = 1;
            int pos = 1;
            int ac = 0;

            try
            {

                var nombreFileServer = idUsuario + "_registroFacturas_" + Guid.Parse(Guid.NewGuid().ToString("B")) + ".xlsx";
                FileRuta = Path.Combine(environment.WebRootPath, "Excel", nombreFileServer);

                FileExcel = configuration.GetSection("servidorArchivosExcel").Value + nombreFileServer;

                FileInfo _file = new FileInfo(FileRuta);

                using (Excel.ExcelPackage oEx = new Excel.ExcelPackage(_file))
                {
                    Excel.ExcelWorksheet oWs = oEx.Workbook.Worksheets.Add("registroFacturas");
                    oWs.Cells.Style.Font.SetFromFont("Tahoma", 8);

                    oWs.Cells[_fila, pos].Value = "#"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "ESTADO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "TIPO DOC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "NRO DOC"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "FECHA EMISION "; pos += 1;

                    oWs.Cells[_fila, pos].Value = "CLIENTE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "MON"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "BASE IMPONIBLE"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "IMP. TOTAL"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "IMP. NETO"; pos += 1;
                    oWs.Cells[_fila, pos].Value = "IMPORTE COBRADO"; pos += 1;
 
                    _fila += 1;

                    //---- incrustando del detalle ----
                    foreach (DataRow row in listDetalle.Rows)
                    {
                        ac += 1;
                        pos = 1;

                        oWs.Cells[_fila, pos].Value = ac; pos += 1;
                        oWs.Cells[_fila, pos].Value = row["DescripcionEstado"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["DescripcionTipoDoc"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["NroDocumento"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["FechaEmsion"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Value = row["DescripcionCliente"].ToString(); pos += 1;
                        oWs.Cells[_fila, pos].Value = row["DescripcionMoneda"].ToString(); pos += 1;

                        oWs.Cells[_fila, pos].Style.Numberformat.Format = "#,##0";
                        oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Right;
                        oWs.Cells[_fila, pos].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                        oWs.Cells[_fila, pos].Value = String.IsNullOrEmpty(row["BaseImponible"].ToString()) ? 0 : Convert.ToDouble(row["BaseImponible"].ToString()); pos += 1;   
                         
                        oWs.Cells[_fila, pos].Style.Numberformat.Format = "#,##0";
                        oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Right;
                        oWs.Cells[_fila, pos].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                        oWs.Cells[_fila, pos].Value = String.IsNullOrEmpty(row["ImporteTotal"].ToString()) ? 0 : Convert.ToDouble(row["ImporteTotal"].ToString()); pos += 1;

                        oWs.Cells[_fila, pos].Style.Numberformat.Format = "#,##0";
                        oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Right;
                        oWs.Cells[_fila, pos].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                        oWs.Cells[_fila, pos].Value = String.IsNullOrEmpty(row["ImporteNeto"].ToString()) ? 0 : Convert.ToDouble(row["ImporteNeto"].ToString()); pos += 1;

                         oWs.Cells[_fila, pos].Style.Numberformat.Format = "#,##0";
                        oWs.Cells[_fila, pos].Style.HorizontalAlignment = Style.ExcelHorizontalAlignment.Right;
                        oWs.Cells[_fila, pos].Style.VerticalAlignment = Style.ExcelVerticalAlignment.Center;
                        oWs.Cells[_fila, pos].Value = String.IsNullOrEmpty(row["TotalCobrado"].ToString()) ? 0 : Convert.ToDouble(row["TotalCobrado"].ToString()); pos += 1;

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

        public object set_anular_registroFactura(int IdTelefoniaDocumentos)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_ANULAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTelefoniaDocumentos", SqlDbType.Int).Value = IdTelefoniaDocumentos;
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

        public object get_cobranzasCab(int IdTelefoniaDocumentos)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_COBRANZAS_CAB", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTelefoniaDocumentos", SqlDbType.Int).Value = IdTelefoniaDocumentos;

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
          
        public object set_eliminar_archivoCobranza(int IdCobranza)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_COBRANZAS_ELIMINAR", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdCobranza", SqlDbType.Int).Value = IdCobranza;

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

        public void set_insertUpdate_facturas(int IdDocumento, string? usuario, string Proceso)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_INSERT_UPDATE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdDocumento", SqlDbType.Int).Value = IdDocumento;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = usuario;
                        cmd.Parameters.Add("@Proceso", SqlDbType.VarChar).Value = Proceso;
                        cmd.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void set_insertUpdate_cobranza(int IdCobranza,string? usuario, string Proceso)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_COBRANZAS_INSERT_UPDATE", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdCobranza", SqlDbType.Int).Value = IdCobranza;
                        cmd.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = usuario;
                        cmd.Parameters.Add("@Proceso", SqlDbType.VarChar).Value = Proceso;
                        cmd.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public object get_tiposCobros()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_COMBO_TIPO_COBROS", cn))
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

 
        public object  set_insertUpdate_detracciones(int IdTelefoniaDocumentos, string FechaPagoDetraccion, string? NroOperacionDetraccion, string ImporteDetraccion, string UsuarioCreacion)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_I_U_DETRACCION", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTelefoniaDocumentos", SqlDbType.Int).Value = IdTelefoniaDocumentos;
                        cmd.Parameters.Add("@FechaPagoDetraccion", SqlDbType.VarChar).Value = FechaPagoDetraccion;

                        cmd.Parameters.Add("@NroOperacionDetraccion", SqlDbType.VarChar).Value = String.IsNullOrEmpty(NroOperacionDetraccion) ? DBNull.Value : NroOperacionDetraccion;
                        cmd.Parameters.Add("@ImporteDetraccion", SqlDbType.VarChar).Value = ImporteDetraccion;
                        cmd.Parameters.Add("@UsuarioCreacion", SqlDbType.VarChar).Value = UsuarioCreacion;

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

        public object set_cerrar_detraccion(int IdDocumento, string idUsuario) 
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_CERRAR_DETRACCION", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdDocumento", SqlDbType.Int).Value = IdDocumento;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

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


        public object get_proveedor()
        {
            Resultado res = new Resultado();
            List<Combos_E> obj_List = new List<Combos_E>();

            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_COMBO_PROVEEDOR", cn))
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


        public object set_insertUpdate_factoring(int IdTelefoniaDocumentos, string PubCCteRuCFactoring, string? PorComisionFactoring, string ImporteFactoring, string FechaRegistroFactoring, string UsuarioCreacion)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_I_U_FACTORING", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdTelefoniaDocumentos", SqlDbType.Int).Value = IdTelefoniaDocumentos;
                        cmd.Parameters.Add("@PubCCteRuCFactoring", SqlDbType.VarChar).Value = PubCCteRuCFactoring;
                        cmd.Parameters.Add("@PorComisionFactoring", SqlDbType.VarChar).Value = PorComisionFactoring; 
                        cmd.Parameters.Add("@ImporteFactoring", SqlDbType.VarChar).Value = ImporteFactoring;
                        cmd.Parameters.Add("@FechaRegistroFactoring", SqlDbType.VarChar).Value = FechaRegistroFactoring; 
                        cmd.Parameters.Add("@UsuarioCreacion", SqlDbType.VarChar).Value = UsuarioCreacion;

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

        public object set_cerrar_factoring(int IdDocumento, string idUsuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DSIGE_PROY_W_REGISTRO_FACTURAS_CERRAR_FACTORING", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@IdDocumento", SqlDbType.Int).Value = IdDocumento;
                        cmd.Parameters.Add("@idUsuario", SqlDbType.VarChar).Value = idUsuario;

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


    }
}

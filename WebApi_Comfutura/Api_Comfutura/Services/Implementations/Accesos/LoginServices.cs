using Api_Comfutura.Models;
using Api_Comfutura.Models.Accesos;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Accesos;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.VisualBasic;

namespace Api_Comfutura.Services.Implementations.Accesos
{
    public class LoginServices : ILogin
    {
        private readonly MFsoft_COMFUTURAContext db;
        private readonly IConfiguration _configuration;
        private readonly string cadenaConexion;

        public LoginServices(MFsoft_COMFUTURAContext _context, IConfiguration configuration)
        {
            this.db = _context;
            this._configuration = configuration;
            this.cadenaConexion = configuration.GetConnectionString("cn");
        }
 
        public static string EncriptarClave(string cExpresion, bool bEncriptarCadena)
        {
            string cResult = "";
            string cPatron = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwwyz";
            string cEncrip = "^çºªæÆöûÿø£Ø×ƒ¬½¼¡«»ÄÅÉêèï7485912360^çºªæÆöûÿø£Ø×ƒ¬½¼¡«»ÄÅÉêèï";


            if (bEncriptarCadena == true)
            {
                cResult = CHRTRAN(cExpresion, cPatron, cEncrip);
            }
            else
            {
                cResult = CHRTRAN(cExpresion, cEncrip, cPatron);
            }

            return cResult;

        }

        public static string CHRTRAN(string cExpresion, string cPatronBase, string cPatronReemplazo)
        {
            string cResult = "";

            int rgChar;
            int nPosReplace;

            for (rgChar = 1; rgChar <= Strings.Len(cExpresion); rgChar++)
            {
                nPosReplace = Strings.InStr(1, cPatronBase, Strings.Mid(cExpresion, rgChar, 1));

                if (nPosReplace == 0)
                {
                    nPosReplace = rgChar;
                    cResult = cResult + Strings.Mid(cExpresion, nPosReplace, 1);
                }
                else
                {
                    if (nPosReplace > cPatronReemplazo.Length)
                    {
                        nPosReplace = rgChar;
                        cResult = cResult + Strings.Mid(cExpresion, nPosReplace, 1);
                    }
                    else
                    {
                        cResult = cResult + Strings.Mid(cPatronReemplazo, nPosReplace, 1);
                    }
                }
            }
            return cResult;
        }



        public object iniciarSesion(string login, string contra)
        {
            Resultado res = new Resultado();
            object resul;
            try
            { 
                    string claveEncriptada = EncriptarClave(contra, true);

                //var flagLogin = db.PubUsuarios.Count(e => e.PubUsuaLogin == login && e.PubUsuaClave == claveEncriptada);
                PubUsuario? objUsuario = db.PubUsuarios.Where(p => p.PubUsuaLogin == login && p.PubUsuaClave == claveEncriptada).SingleOrDefault();

                   if(objUsuario == null)
                    {
                        res.ok = false;
                        res.data = "El usuario y/o contraseña no son correctos, verifique ";
                        resul = res;
                    }
                    else
                    {
                        if (objUsuario?.PubEstaCodigo == "002")
                        {
                            res.ok = false;
                            res.data = "El usuario se encuentra desactivado.. ";
                            resul = res;
                        }
                        else
                        {
                            Menu listamenu = new Menu();
                            List<MenuPermisos> listaAccesos = new List<MenuPermisos>();

                            var Parents = new string[] { "0" };

                            var listaModulos = (from w in db.TblAceesosEventos
                                                join od in db.TblDefinicionOpciones on w.IdOpcion equals od.IdOpcion
                                                join u in db.PubUsuarios on w.IdUsuario equals u.PubUsuaCodigo
                                                where u.PubUsuaCodigo == objUsuario.PubUsuaCodigo && Parents.Contains(od.ParentId.ToString()) && od.Estado == 1
                                                orderby od.OrdenOpcion ascending
                                                select new
                                                {
                                                    IdOpcion = w.IdOpcion,
                                                    id_usuarios = w.IdUsuario,
                                                    nombre_principal = od.NombreOpcion,
                                                    parent_id_principal = od.ParentId,
                                                    urlmagene_principal = od.UrlImagenOpcion
                                                }).Distinct();

                            foreach (var item in listaModulos)
                            {
                                MenuPermisos listaJsonObj = new MenuPermisos();

                                listaJsonObj.id_opcion = Convert.ToInt32(item.IdOpcion);
                                listaJsonObj.id_usuarios = Convert.ToInt32(item.id_usuarios);
                                listaJsonObj.nombre_principal = item.nombre_principal;
                                listaJsonObj.parent_id_principal = Convert.ToInt32(item.parent_id_principal);
                                listaJsonObj.urlmagene_principal = item.urlmagene_principal;
                                listaJsonObj.listMenu = (from w in db.TblAceesosEventos
                                                         join od in db.TblDefinicionOpciones on w.IdOpcion equals od.IdOpcion
                                                         join u in db.PubUsuarios on w.IdUsuario equals u.PubUsuaCodigo
                                                         where u.PubUsuaCodigo == objUsuario.PubUsuaCodigo && od.ParentId == item.IdOpcion && od.Estado == 1   
                                                         orderby od.OrdenOpcion ascending
                                                         select new
                                                         {
                                                             nombre_page = od.NombreOpcion,
                                                             url_page = od.UrlOpcion,
                                                             orden = od.OrdenOpcion,
                                                             od.IdOpcion,
                                                             listMenuItem = (from w3 in db.TblAceesosEventos
                                                                             join od3 in db.TblDefinicionOpciones on w3.IdOpcion equals od3.IdOpcion
                                                                             join u3 in db.PubUsuarios on w3.IdUsuario equals u3.PubUsuaCodigo
                                                                             where u3.PubUsuaCodigo == objUsuario.PubUsuaCodigo && od3.ParentId == od.IdOpcion && od3.Estado == 1
                                                                             orderby od3.OrdenOpcion ascending
                                                                             select new
                                                                             {
                                                                                 nombre_page = od3.NombreOpcion,
                                                                                 url_page = od3.UrlOpcion,
                                                                                 orden = od3.OrdenOpcion,
                                                                                 od3.IdOpcion
                                                                             })
                                                                             .ToList()                                                                            
                                                      })
                                                .ToList()
                                                .Distinct();

                                listaAccesos.Add(listaJsonObj);
                            }

                            listamenu.menuPermisos = listaAccesos;
                            //listamenu.menuEventos = get_AccesoEventos(objUsuario.PubUsuaCodigo);
                            listamenu.id_usuario = objUsuario.PubUsuaCodigo;
                            listamenu.nombre_usuario = objUsuario.PubUsuaNombre;
                            listamenu.login_usuario = objUsuario.PubUsuaLogin;

                        res.ok = true;
                            res.data = listamenu;

                            resul = res;
                        }

                    }
 
            }
            catch (Exception)
            {
                throw;
            }
            return resul;
        }




        private string generarToken(string LoginUsuario)
        {
            string tokenGenerado = "";
            try
            {
                var _symetricSeguritykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:ClaveSecreta"]));

                var _signingCredentials = new SigningCredentials(_symetricSeguritykey, SecurityAlgorithms.HmacSha256);

                var _header = new JwtHeader(_signingCredentials);

                /// claims

                var _claims = new[] { new Claim(JwtRegisteredClaimNames.Email, LoginUsuario), };

                /// paiload

                var _payload = new JwtPayload(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: _claims,
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddHours(24)
                );

                /// token

                var _token = new JwtSecurityToken(_header, _payload);

                tokenGenerado = new JwtSecurityTokenHandler().WriteToken(_token);

            }
            catch (Exception)
            {
                throw;
            }
            return tokenGenerado;
        }


        public Resultado generarArbolAccesos() {

            Resultado res = new Resultado();

            var Parents = new string[] { "1" };
            MenuAcceso listamenuAcceso = new MenuAcceso();
            List<MenuPermisosAcceso> listaAccesos = new List<MenuPermisosAcceso>();

            var listaMenu = (from od in db.TblDefinicionOpciones
                             where Parents.Contains(od.ParentId.ToString()) && od.Estado == 1 && od.TipoInterface == "W"
                             select new
                             {
                                 od.IdOpcion,
                                 od.NombreOpcion
                             }).Distinct();

            foreach (var item in listaMenu)
            {
                MenuPermisosAcceso listaJsonObj = new MenuPermisosAcceso();

                listaJsonObj.text = item.NombreOpcion;
                listaJsonObj.value = item.IdOpcion;
                listaJsonObj.children = (from od in db.TblDefinicionOpciones
                                         where od.ParentId == item.IdOpcion && od.Estado == 1
                                         select new
                                         {
                                             text = od.NombreOpcion,
                                             value = od.IdOpcion,
                                             Checked = false
                                         })
                                .Distinct()
                                .ToList();
                listaAccesos.Add(listaJsonObj);
            }

            listamenuAcceso.text = "ITF PERU";
            listamenuAcceso.value = "-1";
            listamenuAcceso.children = listaAccesos;

            res.ok = true;
            res.data = listamenuAcceso;

            return res;

        }
             


        public object reporteResumen_rrmm(int idCiclo , int idUsuario) {

            Resultado res = new Resultado();
            object? resul = null;

            try
            {
                //TblUsuario? objUsuario = db.PubUsuarios.Where(p => p.IdUsuario == idUsuario).SingleOrDefault();

                ////if (objUsuario == null)
                ////{
                ////    res.ok = false;
                ////    res.data = "No se encontro informacion del usuario";

                ////    resul = res;
                ////}
                ////else
                ////{
                ////    if (objUsuario.EsSupervisor == 1)
                ////    {
                ////        resul = generarResumenGeneral_supervisor(idCiclo, idUsuario);
                ////    }
                ////    else
                ////    {
                ////        resul = generarResumenGeneral_normal(idCiclo, idUsuario);
                ////    }
                ////}
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;

                resul = res;
            }

            return resul;
        }


        public object generarResumenGeneral_supervisor(int id_ciclo, int id_usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_PROY_M_LISTA_CICLOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.Add("@id_ciclo", SqlDbType.Int).Value = id_ciclo;
                        //cmd.Parameters.Add("@id_supervisor", SqlDbType.Int).Value = id_usuario;

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

        public object generarResumenGeneral_normal(int id_ciclo, int id_usuario)
        {
            Resultado res = new Resultado();
            try
            {
                using (SqlConnection cn = new SqlConnection(cadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_PROY_M_LISTA_CICLOS", cn))
                    {
                        cmd.CommandTimeout = 0;
                        cmd.CommandType = CommandType.StoredProcedure;
                        //cmd.Parameters.Add("@id_ciclo", SqlDbType.Int).Value = id_ciclo;
                        //cmd.Parameters.Add("@id_usuario", SqlDbType.Int).Value = id_usuario;

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









    }
}

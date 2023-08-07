using Api_Comfutura.Models;
using Api_Comfutura.Models.Requerimientos.Procesos;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Implementations.Logistica.Procesos;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Comfutura.Controllers.Requerimientos.Procesos
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroSolicitudesController : ControllerBase
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IRegistroSolicitudes registroSolicitudesServices;

        public RegistroSolicitudesController(MFsoft_COMFUTURAContext context, IRegistroSolicitudes registroSolicitudesServices)
        {
            this.context = context;
            this.registroSolicitudesServices = registroSolicitudesServices;
        }

        [HttpGet("registroSolicitudCab")]
        public object registroSolicitudCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            return registroSolicitudesServices.get_registroSolicitudCab(departamento, provincia, nroRequerimiento, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("estadosSolicitudes")]
        public object estadosSolicitudes()
        {
            return registroSolicitudesServices.get_estadosSolicitudes();
        }

        [HttpGet("buscarNroPresupuesto")]
        public object buscarNroPresupuesto(string nroPresupuesto)
        {
            return registroSolicitudesServices.get_buscarNroPresupuesto(nroPresupuesto);
        }

        [HttpGet("descargarGrilla_solicitudesCab")]
        public object descargarGrilla_solicitudesCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            return registroSolicitudesServices.get_descargarGrilla_solicitudesCab(departamento, provincia, nroRequerimiento, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("anular_Solicitud")]
        public object anular_Solicitud(int IdSolicitud, string idUsuario)
        {
            return registroSolicitudesServices.set_anular_solicitud(IdSolicitud, idUsuario);
        }
        //------ TAB RESUMEN
        [HttpGet("detalleResumenSolicitud")]
        public object detalleResumenSolicitud(int IdSolicitud)
        {
            return registroSolicitudesServices.get_detalleResumenSolicitud(IdSolicitud);
        }

        [HttpGet("provisionar_solicitud")]
        public object provisionar_solicitud(int IdSolicitud, string idUsuario)
        {
            return registroSolicitudesServices.set_provisionar_solicitud(IdSolicitud, idUsuario);
        }

        //------ TAB MATERIAL
        [HttpGet("materialesSolicitud")]
        public object materialesSolicitud(int IdSolicitud)
        {
            return registroSolicitudesServices.get_materialesSolicitud(IdSolicitud);
        }

        [HttpGet("detalleTabsGruposSolicitud")]
        public object detalleTabsGrupos(int IdSolicitud, int IdTipoTabs)
        {
            return registroSolicitudesServices.get_detalleTabsGruposSolicitud(IdSolicitud, IdTipoTabs);
        }

        [HttpGet("eliminar_tabsGruposSolicitud")]
        public object eliminar_tabsGruposSolicitud(int IdSolicitudTabs)
        {
            return registroSolicitudesServices.set_eliminarTabsGruposSolicitud(IdSolicitudTabs);
        }

        [HttpGet("anular_tabsGruposSolicitud")]
        public object anular_tabsGruposSolicitud(int IdSolicitudTabs, string IdUsuario)
        {
            return registroSolicitudesServices.set_anularTabsGruposSolicitud(IdSolicitudTabs, IdUsuario);
        }




        //   METODOS CRUD 

        [HttpPut("put_editRegistroSolicitudes/{id}")]
        public async Task<object> put_editRegistroSolicitudes(int id, TblTelefoniaSolicitudesCab tblTelefoniaSolicitudesCab)
        {
            Resultado res = new Resultado();

            TblTelefoniaSolicitudesCab? objReemplazar;
            objReemplazar = await context.TblTelefoniaSolicitudesCabs.Where(u => u.IdSolicitud == id).FirstOrDefaultAsync<TblTelefoniaSolicitudesCab>();

            if (objReemplazar != null)
            {
                objReemplazar.IdPresupuesto = tblTelefoniaSolicitudesCab.IdPresupuesto;
                objReemplazar.NroPresupuesto = tblTelefoniaSolicitudesCab.NroPresupuesto;
                objReemplazar.FechaSolicitud = tblTelefoniaSolicitudesCab.FechaSolicitud; 

                objReemplazar.Estado = tblTelefoniaSolicitudesCab.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaSolicitudesCab.UsuarioCreacion;
                objReemplazar.FechaEdicion = DateTime.Now;

                context.Entry(objReemplazar).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();
                    registroSolicitudesServices.set_insertUpdate_solicitudes(id, tblTelefoniaSolicitudesCab.UsuarioCreacion, "U");

                    res.ok = true;
                    res.data = "OK";
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    res.ok = false;
                    res.data = ex.Message;
                }
            }
            else
            {
                res.ok = false;
                res.data = "No se encontro registro con el ID ingresado.";
            }
            return res;
        }

        [HttpPost("post_saveRegistroSolicitudes")]
        public async Task<object> post_saveRegistroSolicitudes(TblTelefoniaSolicitudesCab tblTelefoniaSolicitudesCab)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaSolicitudesCab.FechaCreacion = DateTime.Now;
                context.TblTelefoniaSolicitudesCabs.Add(tblTelefoniaSolicitudesCab);
                await context.SaveChangesAsync();

                registroSolicitudesServices.set_insertUpdate_solicitudes(tblTelefoniaSolicitudesCab.IdSolicitud, tblTelefoniaSolicitudesCab.UsuarioCreacion, "I");
                context.Entry(tblTelefoniaSolicitudesCab).Reload();

                res.ok = true;
                res.data = new
                {
                    IdSolicitud = tblTelefoniaSolicitudesCab.IdSolicitud,
                    NroSolicitud = tblTelefoniaSolicitudesCab.NroSolicitud
                };
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }



        [HttpPost("post_saveTabsGrupoSolicitud")]
        public async Task<object> post_saveTabsGrupoSolicitud(TblTelefoniaSolicitudesTab tblTelefoniaSolicitudesTab)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaSolicitudesTab.FechaCreacion = DateTime.Now;
                context.TblTelefoniaSolicitudesTabs.Add(tblTelefoniaSolicitudesTab);

                await context.SaveChangesAsync();

                res.ok = true;
                res.data = tblTelefoniaSolicitudesTab.IdSolicitudTabs;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut("put_editTabsGrupoSolicitud/{id}")]
        public async Task<object> put_editTabsGrupoSolicitud(int id, TblTelefoniaSolicitudesTab tblTelefoniaSolicitudesTab)
        {
            Resultado res = new Resultado();

            TblTelefoniaSolicitudesTab? objReemplazar;
            objReemplazar = await context.TblTelefoniaSolicitudesTabs.Where(u => u.IdSolicitudTabs == id).FirstOrDefaultAsync<TblTelefoniaSolicitudesTab>();

            if (objReemplazar != null)
            {
                objReemplazar.IdTipoTabs = tblTelefoniaSolicitudesTab.IdTipoTabs;
                objReemplazar.IdTipoMovCaja = tblTelefoniaSolicitudesTab.IdTipoMovCaja;
                objReemplazar.DescripcionDetallada = tblTelefoniaSolicitudesTab.DescripcionDetallada;
                objReemplazar.Fecha = tblTelefoniaSolicitudesTab.Fecha;
                objReemplazar.AlmUmedCodigo = tblTelefoniaSolicitudesTab.AlmUmedCodigo;

                objReemplazar.CantidadSolicitud = tblTelefoniaSolicitudesTab.CantidadSolicitud;
                objReemplazar.PrecioSolicitud = tblTelefoniaSolicitudesTab.PrecioSolicitud;
                objReemplazar.CostoSolicitud = tblTelefoniaSolicitudesTab.CostoSolicitud;

                objReemplazar.IdTipoPersonal = tblTelefoniaSolicitudesTab.IdTipoPersonal;
                objReemplazar.NroDocPersonal = tblTelefoniaSolicitudesTab.NroDocPersonal;
                objReemplazar.IdBanco = tblTelefoniaSolicitudesTab.IdBanco;
                objReemplazar.PubMoneCodigo = tblTelefoniaSolicitudesTab.PubMoneCodigo;

                objReemplazar.CuentaBanco = tblTelefoniaSolicitudesTab.CuentaBanco;
                objReemplazar.CuentaInterbancarioBanco = tblTelefoniaSolicitudesTab.CuentaInterbancarioBanco;
                objReemplazar.ObsRendicion = tblTelefoniaSolicitudesTab.ObsRendicion;

                objReemplazar.UsuarioEdicion = tblTelefoniaSolicitudesTab.UsuarioCreacion;
                objReemplazar.FechaEdicion = DateTime.Now;

                context.Entry(objReemplazar).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();

                    res.ok = true;
                    res.data = "OK";
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    res.ok = false;
                    res.data = ex.Message;
                }
            }
            else
            {
                res.ok = false;
                res.data = "No se encontro registro con el ID ingresado.";
            }

            return res;
        }


        [HttpPost("post_saveDetalleTabsMasivo")]
        public object post_saveDetalleTabsMasivo( TabsAsignacionPersonal objTabs ,  int IdSolicitud, string usuario)
        {
            return registroSolicitudesServices.set_saveDetalleTabsMasivo(objTabs, IdSolicitud, usuario);
        }





    }
}

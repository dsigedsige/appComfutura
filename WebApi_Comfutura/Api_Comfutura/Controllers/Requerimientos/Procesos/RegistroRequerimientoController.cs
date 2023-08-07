using Api_Comfutura.Models;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Implementations.Requerimientos.Procesos;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Comfutura.Controllers.Requerimientos.Procesos
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroRequerimientoController : ControllerBase
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IRegistroRequerimiento requerimientoService;

        public RegistroRequerimientoController(MFsoft_COMFUTURAContext context, IRegistroRequerimiento requerimientoService)
        {
            this.context = context;
            this.requerimientoService = requerimientoService;
        }

        [HttpGet("estadosRequerimiento")]
        public object estadosRequerimiento()
        {
            return requerimientoService.get_estadosRequerimiento();
        }

        [HttpGet("registroRequerimientoCab")]
        public object registroRequerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            return requerimientoService.get_registroRequerimientoCab(departamento, provincia, nroRequerimiento, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("tiposTrabajo")]
        public object tiposTrabajo()
        {
            return requerimientoService.get_tiposTrabajo();
        }

        [HttpGet("areas")]
        public object areas()
        {
            return requerimientoService.get_areas();
        }

        [HttpGet("buscarNroOT")]
        public object buscarNroOT(string nroOT)
        {
            return requerimientoService.get_buscarNroOT(nroOT);
        }

        [HttpGet("anular_requerimiento")]
        public object anular_requerimiento(int IdRequerimiento, string idUsuario)
        {
            return requerimientoService.set_anular_requerimiento(IdRequerimiento, idUsuario);
        }

        [HttpGet("descargarGrilla_requerimientoCab")]
        public object descargarGrilla_requerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            return requerimientoService.get_descargarGrilla_requerimientoCab(departamento, provincia, nroRequerimiento, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("detalleCronogramas")]
        public object detalleCronogramas(int IdRequerimiento)
        {
            return requerimientoService.get_detalleCronograma(IdRequerimiento);
        }

        [HttpGet("eliminar_cronograma")]
        public object eliminar_cronograma(int IdReqCronograma)
        {
            return requerimientoService.set_eliminar_cronograma(IdReqCronograma);
        }

        [HttpGet("partidas")]
        public object partidas()
        {
            return requerimientoService.get_partidas();
        }
        //------ TAB RESUMEN
        [HttpGet("detalleResumen")]
        public object detalleResumen(int IdRequerimiento)
        {
            return requerimientoService.get_detalleResumen(IdRequerimiento);
        }

        //------ TAB MATERIAL
        [HttpGet("materialesCab")]
        public object materialesCab(int IdRequerimiento)
        {
            return requerimientoService.get_materialesCab(IdRequerimiento);
        }

        [HttpGet("detalleMateriales")]
        public object detalleMateriales(string usuario)
        {
            return requerimientoService.get_detalleMateriales(usuario);
        }

        [HttpGet("actualizar_cantidadMaterial")]
        public object actualizar_cantidadMaterial(int IdReqMaterial, string AlmArtiCodigo, string CantidadPresupuesto, string CostoPresupuesto, string Usuario)
        {
            return requerimientoService.set_actualizar_cantidadMaterial(IdReqMaterial, AlmArtiCodigo, CantidadPresupuesto, CostoPresupuesto, Usuario);
        }

        [HttpGet("eliminar_material")]
        public object eliminar_material(int IdReqMaterial)
        {
            return requerimientoService.set_eliminar_material(IdReqMaterial);
        }

        //------ TAB CONTRATISTA

        [HttpGet("unidadMedida")]
        public object unidadMedida()
        {
            return requerimientoService.get_unidadMedidas();
        }

        [HttpGet("tiposDocumentos")]
        public object tiposDocumentos()
        {
            return requerimientoService.get_tiposDocumentos();
        }

        [HttpGet("monedas")]
        public object monedas()
        {
            return requerimientoService.get_monedas();
        }

        [HttpGet("bancos")]
        public object bancos()
        {
            return requerimientoService.get_bancos();
        }

        [HttpGet("personales")]
        public object personales(string tipoDoc)
        {
            return requerimientoService.get_personales(tipoDoc);
        }

        [HttpGet("detalleTabsGrupos")]
        public object detalleTabsGrupos(int IdRequerimiento, int IdTipoTabs)
        {
            return requerimientoService.get_detalleTabsGrupos(IdRequerimiento, IdTipoTabs);
        }

        [HttpGet("eliminar_tabsGrupos")]
        public object eliminar_tabsGrupos(int IdTabs)
        {
            return requerimientoService.set_eliminarTabsGrupos(IdTabs);
        }


        [HttpGet("tiposConceptos")]
        public object tiposConceptos()
        {
            return requerimientoService.get_tiposConceptos();
        }


        [HttpGet("cargosPersonal")]
        public object cargosPersonal()
        {
            return requerimientoService.get_cargosPersonal();
        }

         /// -- REPORTES

        [HttpGet("descargar_cronograma")]
        public object descargar_cronograma(int IdRequerimiento, string usuario)
        {
            return requerimientoService.get_descargar_cronograma(IdRequerimiento, usuario);
        }


        //*------CRUD-----

        [HttpPut("put_editRegistroRequerimiento/{id}")]
        public async Task<object> PutTblTelefoniaOtCab(int id, TblTelefoniaRequerimientoCab tblTelefoniaRequerimientoCab)
        {
            Resultado res = new Resultado();

            TblTelefoniaRequerimientoCab? objReemplazar;
            objReemplazar = await context.TblTelefoniaRequerimientoCabs.Where(u => u.IdRequerimiento == id).FirstOrDefaultAsync<TblTelefoniaRequerimientoCab>();

            if (objReemplazar != null)
            {
                objReemplazar.FechaCosto = tblTelefoniaRequerimientoCab.FechaCosto;
                objReemplazar.HoraCosto = tblTelefoniaRequerimientoCab.HoraCosto;
                objReemplazar.IdProyectoTelefonia = tblTelefoniaRequerimientoCab.IdProyectoTelefonia;
                objReemplazar.IdTipoTrabajoTelefonia = tblTelefoniaRequerimientoCab.IdTipoTrabajoTelefonia;

                objReemplazar.IdAreaTelefonia = tblTelefoniaRequerimientoCab.IdAreaTelefonia;
                objReemplazar.IdOt = tblTelefoniaRequerimientoCab.IdOt;
                objReemplazar.TiempoEjecucion = tblTelefoniaRequerimientoCab.TiempoEjecucion;

                objReemplazar.Estado = tblTelefoniaRequerimientoCab.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaRequerimientoCab.UsuarioCreacion;
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


        [HttpPost("post_saveRegistroRequerimiento")]
        public async Task<object> PostTblTelefoniaRequerimientoCab(TblTelefoniaRequerimientoCab tblTelefoniaRequerimientoCab)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaRequerimientoCab.FechaCreacion = DateTime.Now;
                context.TblTelefoniaRequerimientoCabs.Add(tblTelefoniaRequerimientoCab);
                await context.SaveChangesAsync();

                res.ok = true;
                res.data = tblTelefoniaRequerimientoCab.IdRequerimiento;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        [HttpPost("post_saveCronograma")]
        public async Task<object> PostTblTelefoniaRequerimientoCronograma(TblTelefoniaRequerimientoCronograma tblTelefoniaRequerimientoCronograma)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaRequerimientoCronograma.FechaCreacion = DateTime.Now;
                context.TblTelefoniaRequerimientoCronogramas.Add(tblTelefoniaRequerimientoCronograma);

                await context.SaveChangesAsync();

                res.ok = true;
                res.data = tblTelefoniaRequerimientoCronograma.IdReqCronograma;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }


        [HttpPut("put_editCronograma/{id}")]
        public async Task<object> PutTblTelefoniaRequerimientoCronograma(int id, TblTelefoniaRequerimientoCronograma tblTelefoniaRequerimientoCronograma)
        {
            Resultado res = new Resultado();

            TblTelefoniaRequerimientoCronograma? objReemplazar;
            objReemplazar = await context.TblTelefoniaRequerimientoCronogramas.Where(u => u.IdReqCronograma == id).FirstOrDefaultAsync<TblTelefoniaRequerimientoCronograma>();

            if (objReemplazar != null)
            {
                objReemplazar.IdPartida = tblTelefoniaRequerimientoCronograma.IdPartida;
                objReemplazar.Duracion = tblTelefoniaRequerimientoCronograma.Duracion;
                objReemplazar.FechaInicio = tblTelefoniaRequerimientoCronograma.FechaInicio;
                objReemplazar.FechaTermino = tblTelefoniaRequerimientoCronograma.FechaTermino;

                objReemplazar.Estado = tblTelefoniaRequerimientoCronograma.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaRequerimientoCronograma.UsuarioCreacion;
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


        [HttpPost("post_saveMaterial")]
        public object post_saveMaterial(List<string> listMateriales,  int IdRequerimiento , string usuario)
        {
            string codigosMateriales = String.Join(",", listMateriales);
            return requerimientoService.set_grabarMateriales(codigosMateriales, IdRequerimiento,  usuario); 
        }


        [HttpPost("post_saveTabsGrupo")]
        public async Task<object> PostTblTelefoniaTab(TblTelefoniaTab tblTelefoniaTab)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaTab.FechaCreacion = DateTime.Now;
                context.TblTelefoniaTabs.Add(tblTelefoniaTab);

                await context.SaveChangesAsync();

                res.ok = true;
                res.data = tblTelefoniaTab.IdTabs;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut("put_editTabsGrupo/{id}")]
        public async Task<object> PutTblTelefoniaTab(int id, TblTelefoniaTab tblTelefoniaTab)
        {
            Resultado res = new Resultado();

            TblTelefoniaTab? objReemplazar;
            objReemplazar = await context.TblTelefoniaTabs.Where(u => u.IdTabs == id).FirstOrDefaultAsync<TblTelefoniaTab>();

            if (objReemplazar != null)
            {
                objReemplazar.IdTipoTabs = tblTelefoniaTab.IdTipoTabs;
                objReemplazar.IdTipoMovCaja = tblTelefoniaTab.IdTipoMovCaja;
                objReemplazar.DescripcionDetallada = tblTelefoniaTab.DescripcionDetallada;
                objReemplazar.Fecha = tblTelefoniaTab.Fecha;
                objReemplazar.AlmUmedCodigo = tblTelefoniaTab.AlmUmedCodigo;
                objReemplazar.CantidadPresupuesto = tblTelefoniaTab.CantidadPresupuesto;
                objReemplazar.PrecioPresupuesto = tblTelefoniaTab.PrecioPresupuesto;
                objReemplazar.CostoPresupuesto = tblTelefoniaTab.CostoPresupuesto;

                objReemplazar.IdtipoPersonal = tblTelefoniaTab.IdtipoPersonal;
                objReemplazar.NroDocPersonal = tblTelefoniaTab.NroDocPersonal;
                objReemplazar.IdBanco = tblTelefoniaTab.IdBanco;
                objReemplazar.PubMoneCodigo = tblTelefoniaTab.PubMoneCodigo;

                objReemplazar.CuentaBanco = tblTelefoniaTab.CuentaBanco;
                objReemplazar.CuentaInterbancarioBanco = tblTelefoniaTab.CuentaInterbancarioBanco;
      
                objReemplazar.Estado = tblTelefoniaTab.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaTab.UsuarioCreacion;
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


    }
}

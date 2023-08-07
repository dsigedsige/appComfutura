using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Interfaces.Requerimientos.Procesos;
using Api_Comfutura.Models;
using Api_Comfutura.Services.Implementations.Accesos;
using Api_Comfutura.Services.Interfaces.Uploads;
using Api_Comfutura.Services.Implementations.Uploads;

namespace Api_Comfutura.Controllers.Requerimientos.Procesos
{
    [Route("api/[controller]")]
    [ApiController]
    public class TblTelefoniaOtCabsController : ControllerBase
    {
        private readonly MFsoft_COMFUTURAContext _context;
        private readonly IRegistroOT registroOTService;
        private readonly IUploads uploadService;

        public TblTelefoniaOtCabsController(MFsoft_COMFUTURAContext context , IRegistroOT registroOTService, IUploads uploadService)
        {
            _context = context;
            this.registroOTService = registroOTService;
            this.uploadService = uploadService;
        }

        [HttpGet("UbigeoDepartamentos")]
        public object Departamentos()
        {
            return registroOTService.get_ubigeosDepartamento(); 
        }

        [HttpGet("UbigeoProvincias")]
        public object Provincias(string idDepartamento)
        {
            return registroOTService.get_ubigeosProvincias(idDepartamento);
        }

        [HttpGet("UbigeoDistritos")]
        public object UbigeoDistritos(string idDepartamento, string idProvincia)
        {
            return registroOTService.get_ubigeosDistritos(idDepartamento, idProvincia);
        }

        [HttpGet("EstadosRegistroOT")]
        public object estadosRegistroOT()
        {
            return registroOTService.get_estadosRegistroOT();
        }

        [HttpGet("registroOTcab")]
        public object registroOTcab(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin , string estado,  string usuario)
        {
            return registroOTService.get_registroOTcab( departamento, provincia, distrito, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("proyectos")]
        public object proyectos()
        {
            return registroOTService.get_proyectos();
        }

        [HttpGet("clientes")]
        public object clientes()
        {
            return registroOTService.get_clientes();
        }

        [HttpGet("personales")]
        public object personales()
        {
            return registroOTService.get_personales();
        }

        [HttpGet("registroOT_id")]
        public object registroOT_id(int idOT)
        {
            return registroOTService.get_registroOT_id(idOT);
        }

        [HttpGet("anular_registroOT")]
        public object anular_registroOT(int idOT)
        {
            return registroOTService.set_anular_registroOT(idOT);
        }

        [HttpGet("descargarGrilla_registroOT")]
        public object descargarGrilla_registroOT(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin, string estado, string usuario)
        {
            return registroOTService.get_descargarGrilla_registroOTcab(departamento, provincia, distrito, fecha_ini, fecha_fin, estado, usuario);
        }

        [HttpGet("tiposDocumentos")]
        public object tiposDocumentos()
        {
            return registroOTService.get_tiposDocumentos();
        }

        [HttpGet("detalleArchivosOT")]
        public object detalleArchivosOT(int idOT)
        {
            return registroOTService.get_detalleArchivosOT(idOT);
        }

        [HttpPost("guardarArchivosOT")]
        public object guardarArchivosOT([FromForm] IFormFile file, int idOt, int idTipoDoc, string idUsuario)
        {
            return uploadService.guardarArchivoRequerimiento(file, idOt, idTipoDoc, idUsuario);
        }

        [HttpGet("eliminar_archivoOT")]
        public object eliminar_archivoOT(int idOtArchivo)
        {
            return registroOTService.set_eliminar_archivoOT(idOtArchivo);
        }




        // GET: api/TblTelefoniaOtCabs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblTelefoniaOtCab>>> GetTblTelefoniaOtCabs()
        {
          if (_context.TblTelefoniaOtCabs == null)
          {
              return NotFound();
          }
            return await _context.TblTelefoniaOtCabs.ToListAsync();
        }

        // GET: api/TblTelefoniaOtCabs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblTelefoniaOtCab>> GetTblTelefoniaOtCab(int id)
        {
          if (_context.TblTelefoniaOtCabs == null)
          {
              return NotFound();
          }
            var tblTelefoniaOtCab = await _context.TblTelefoniaOtCabs.FindAsync(id);

            if (tblTelefoniaOtCab == null)
            {
                return NotFound();
            }

            return tblTelefoniaOtCab;
        }
          
        [HttpPut("put_editRegistroOT/{id}")]
        public async Task<object> PutTblTelefoniaOtCab(int id, TblTelefoniaOtCab tblTelefoniaOtCab)
        {
            Resultado res = new Resultado();

            TblTelefoniaOtCab? objReemplazar;
            objReemplazar = await _context.TblTelefoniaOtCabs.Where(u => u.IdOt == id).FirstOrDefaultAsync<TblTelefoniaOtCab>();

            if (objReemplazar != null)
            {
                objReemplazar.NroOt = tblTelefoniaOtCab.NroOt;
                objReemplazar.NombreOt = tblTelefoniaOtCab.NombreOt;
                objReemplazar.GesProyCodigo = tblTelefoniaOtCab.GesProyCodigo;
                objReemplazar.IdTipoTrabajoTelefonia = tblTelefoniaOtCab.IdTipoTrabajoTelefonia;
                objReemplazar.IdAreaTelefonia = tblTelefoniaOtCab.IdAreaTelefonia;

                objReemplazar.NombreSite = tblTelefoniaOtCab.NombreSite;
                objReemplazar.NumeroIdOt = tblTelefoniaOtCab.NumeroIdOt;
                objReemplazar.IdRegion = tblTelefoniaOtCab.IdRegion;
                objReemplazar.IdProvincia = tblTelefoniaOtCab.IdProvincia;
                objReemplazar.IdDistrito = tblTelefoniaOtCab.IdDistrito;
                objReemplazar.FechaApertura = tblTelefoniaOtCab.FechaApertura;
                objReemplazar.PubCcteRucCliente = tblTelefoniaOtCab.PubCcteRucCliente;

                objReemplazar.JefeClienteSolicitante = tblTelefoniaOtCab.JefeClienteSolicitante;
                objReemplazar.AnalistaClienteSolicitante = tblTelefoniaOtCab.AnalistaClienteSolicitante;
                objReemplazar.IdPersonalCoodinador = tblTelefoniaOtCab.IdPersonalCoodinador;
                objReemplazar.IdPersonalJefeResponsable = tblTelefoniaOtCab.IdPersonalJefeResponsable;
                objReemplazar.IdPersonalLiquidador = tblTelefoniaOtCab.IdPersonalLiquidador;
                objReemplazar.IdPersonalEjecutante = tblTelefoniaOtCab.IdPersonalEjecutante;

                objReemplazar.Estado = tblTelefoniaOtCab.Estado;

                objReemplazar.UsuarioEdicion = tblTelefoniaOtCab.UsuarioCreacion;
                objReemplazar.FechaEdicion = DateTime.Now;

                _context.Entry(objReemplazar).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
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


        [HttpPost("post_saveRegistroOT")]
        public async Task<object> PostTblTelefoniaOtCab(TblTelefoniaOtCab tblTelefoniaOtCab)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaOtCab.FechaCreacion = DateTime.Now;
                _context.TblTelefoniaOtCabs.Add(tblTelefoniaOtCab);
                await _context.SaveChangesAsync();

                res.ok = true;
                res.data = tblTelefoniaOtCab.IdOt;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }
         

        // DELETE: api/TblTelefoniaOtCabs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblTelefoniaOtCab(int id)
        {
            if (_context.TblTelefoniaOtCabs == null)
            {
                return NotFound();
            }
            var tblTelefoniaOtCab = await _context.TblTelefoniaOtCabs.FindAsync(id);
            if (tblTelefoniaOtCab == null)
            {
                return NotFound();
            }

            _context.TblTelefoniaOtCabs.Remove(tblTelefoniaOtCab);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblTelefoniaOtCabExists(int id)
        {
            return (_context.TblTelefoniaOtCabs?.Any(e => e.IdOt == id)).GetValueOrDefault();
        }
    }
}

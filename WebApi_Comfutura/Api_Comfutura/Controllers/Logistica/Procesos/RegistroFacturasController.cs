using Api_Comfutura.Models;
using Api_Comfutura.Persistence.Context;
using Api_Comfutura.Services.Implementations.Requerimientos.Procesos;
using Api_Comfutura.Services.Interfaces.Logistica.Procesos;
using Api_Comfutura.Services.Interfaces.Uploads;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Comfutura.Controllers.Logistica.Procesos
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroFacturasController : ControllerBase
    {
        private readonly MFsoft_COMFUTURAContext context;
        private readonly IRegistroFacturas registroFacturasService;
        private readonly IUploads uploadService;

        public RegistroFacturasController(MFsoft_COMFUTURAContext context , IRegistroFacturas registroFacturasService, IUploads uploadService)
        {
            this.context = context;
            this.registroFacturasService = registroFacturasService;
            this.uploadService = uploadService;
        }

        [HttpGet("estadosRegistroFacturas")]
        public object estadosRegistroFacturas()
        {
            return registroFacturasService.get_estados();
        }

        [HttpGet("tiposDocumentos")]
        public object tiposDocumentos()
        {
            return registroFacturasService.get_tipoDocumentos();
        }

        [HttpGet("registroFacturascab")]
        public object registroFacturascab(string cliente, string? nroOrdenCompra, string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente)
        {
            return registroFacturasService.get_registroFacturasCab(cliente, nroOrdenCompra,  fecha_ini, fecha_fin, estado, usuario, detracPendiente);
        }

        [HttpGet("buscarOrdenCompra")]
        public object buscarOrdenCompra(string nroOC, string posic)
        {
            return registroFacturasService.get_buscarOrdenCompra(nroOC, posic);
        }

        [HttpGet("buscarOT")]
        public object buscarOT(string nroOT)
        {
            return registroFacturasService.get_buscarOT(nroOT);
        }

        [HttpGet("registroFacturasId")]
        public object registroFacturasId(int IdTelefoniaDocumentos)
        {
            return registroFacturasService.get_registroFacturaID(IdTelefoniaDocumentos);
        }

        [HttpGet("descargarGrilla_registroFacturas")]
        public object descargarGrilla_registroFacturas(  string cliente, string? nroOrdenCompra, string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente)
        {
            return registroFacturasService.get_descargarGrilla_registroFactura(cliente, nroOrdenCompra, fecha_ini, fecha_fin, estado, usuario, detracPendiente);
        }

        [HttpGet("anular_registroFactura")]
        public object anular_registroFactura(int IdTelefoniaDocumentos)
        {
            return registroFacturasService.set_anular_registroFactura(IdTelefoniaDocumentos);
        }

        [HttpGet("cobranzasCab")]
        public object cobranzasCab(int IdTelefoniaDocumentos)
        {
            return registroFacturasService.get_cobranzasCab(IdTelefoniaDocumentos);
        }

        [HttpPost("guardarArchivosCobranza")]
        public object guardarArchivosCobranza([FromForm] IFormFile file, int IdCobranza, string idUsuario)
        {
            return uploadService.guardarArchivoCobranzas(file, IdCobranza, idUsuario);
        }

        [HttpGet("eliminar_archivoCobranza")]
        public object eliminar_archivoCobranza(int IdCobranza)
        {
            return registroFacturasService.set_eliminar_archivoCobranza(IdCobranza);
        }

        [HttpGet("tiposCobros")]
        public object tiposCobros()
        {
            return registroFacturasService.get_tiposCobros();
        }

        [HttpGet("save_update_detracciones")]
        public object save_update_detracciones(int IdTelefoniaDocumentos, string FechaPagoDetraccion, string? NroOperacionDetraccion , string ImporteDetraccion, string UsuarioCreacion)
        {
            return registroFacturasService.set_insertUpdate_detracciones(IdTelefoniaDocumentos, FechaPagoDetraccion, NroOperacionDetraccion, ImporteDetraccion, UsuarioCreacion);
        }


        [HttpPost("guardarArchivoDetracciones")]
        public object guardarArchivoDetracciones([FromForm] IFormFile file, int IdDocumento, string idUsuario)
        {
            return uploadService.guardarArchivoDetracciones(file, IdDocumento, idUsuario);
        }

        [HttpGet("cerrar_detraccion")]
        public object cerrar_detraccion(int IdDocumento, string idUsuario)
        {
            return registroFacturasService.set_cerrar_detraccion(IdDocumento, idUsuario);
        }
        [HttpGet("proveedorFactoring")]
        public object proveedorFactoring()
        {
            return registroFacturasService.get_proveedor();
        }

        [HttpGet("save_update_factoring")]
        public object save_update_factoring(int IdTelefoniaDocumentos, string PubCCteRuCFactoring, string? PorComisionFactoring, string ImporteFactoring, string FechaRegistroFactoring, string UsuarioCreacion)
        {
            return registroFacturasService.set_insertUpdate_factoring(IdTelefoniaDocumentos, PubCCteRuCFactoring, PorComisionFactoring, ImporteFactoring, FechaRegistroFactoring, UsuarioCreacion);
        }



        [HttpGet("cerrar_factoring")]
        public object cerrar_factoring(int IdDocumento, string idUsuario)
        {
            return registroFacturasService.set_cerrar_factoring(IdDocumento, idUsuario);
        }

        //METODOS CRUD


        [HttpPut("put_editRegistroFacturas/{id}")]
        public async Task<object> PutTblTelefoniaDocumento(int id, TblTelefoniaDocumento tblTelefoniaDocumento)
        {
            Resultado res = new Resultado();

            TblTelefoniaDocumento? objReemplazar;
            objReemplazar = await context.TblTelefoniaDocumentos.Where(u => u.IdTelefoniaDocumentos == id).FirstOrDefaultAsync<TblTelefoniaDocumento>();

            if (objReemplazar != null)
            {
                objReemplazar.IdTipoDocumento = tblTelefoniaDocumento.IdTipoDocumento;
                objReemplazar.NroDocumento = tblTelefoniaDocumento.NroDocumento;
                objReemplazar.FechaEmsion = tblTelefoniaDocumento.FechaEmsion;
                objReemplazar.SolicitudPap = tblTelefoniaDocumento.SolicitudPap;
                objReemplazar.NroOrdenCompra = tblTelefoniaDocumento.NroOrdenCompra;
                objReemplazar.Posicion = tblTelefoniaDocumento.Posicion;

                objReemplazar.Ot = tblTelefoniaDocumento.Ot;
                objReemplazar.PubCcteRucCliente = tblTelefoniaDocumento.PubCcteRucCliente;
                objReemplazar.PubMoneCodigo = tblTelefoniaDocumento.PubMoneCodigo;
                objReemplazar.PorIgv = tblTelefoniaDocumento.PorIgv;
                objReemplazar.Glosa = tblTelefoniaDocumento.Glosa;
                objReemplazar.Proyecto = tblTelefoniaDocumento.Proyecto;

                objReemplazar.BaseImponible = tblTelefoniaDocumento.BaseImponible;
                objReemplazar.TotalIgv= tblTelefoniaDocumento.TotalIgv;
                objReemplazar.ImporteTotal = tblTelefoniaDocumento.ImporteTotal;
                objReemplazar.TasaDetraccion = tblTelefoniaDocumento.TasaDetraccion;
                objReemplazar.TotalImpuesto = tblTelefoniaDocumento.TotalImpuesto;
                objReemplazar.ImporteNeto = tblTelefoniaDocumento.ImporteNeto;
                objReemplazar.TotalCobrado = tblTelefoniaDocumento.TotalCobrado;

                objReemplazar.Estado = tblTelefoniaDocumento.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaDocumento.UsuarioCreacion;
                objReemplazar.FechaEdicion = DateTime.Now;

                context.Entry(objReemplazar).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();

                    registroFacturasService.set_insertUpdate_facturas(id, tblTelefoniaDocumento.UsuarioCreacion , "U");

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

        [HttpPost("post_saveRegistroFacturas")]
        public async Task<object> PostTblTelefoniaDocumento(TblTelefoniaDocumento tblTelefoniaDocumento)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaDocumento.FechaCreacion = DateTime.Now;
                context.TblTelefoniaDocumentos.Add(tblTelefoniaDocumento);
                await context.SaveChangesAsync();

                registroFacturasService.set_insertUpdate_facturas(tblTelefoniaDocumento.IdTelefoniaDocumentos, tblTelefoniaDocumento.UsuarioCreacion, "I");

                res.ok = true;
                res.data = tblTelefoniaDocumento.IdTelefoniaDocumentos;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPost("post_saveCobranzas")]
        public async Task<object> post_saveCobranzas(TblTelefoniaDocumentosCobrado tblTelefoniaDocumentoCobrado)
        {
            Resultado res = new Resultado();
            try
            {
                tblTelefoniaDocumentoCobrado.FechaCreacion = DateTime.Now;
                context.TblTelefoniaDocumentosCobrados.Add(tblTelefoniaDocumentoCobrado);
                await context.SaveChangesAsync();

                registroFacturasService.set_insertUpdate_cobranza(tblTelefoniaDocumentoCobrado.IdTelefoniaDocCobrados, tblTelefoniaDocumentoCobrado.UsuarioCreacion  , "I");

                res.ok = true;
                res.data = tblTelefoniaDocumentoCobrado.IdTelefoniaDocCobrados;
            }
            catch (Exception ex)
            {
                res.ok = false;
                res.data = ex.Message;
            }
            return res;
        }

        [HttpPut("put_editCobranzas/{id}")]
        public async Task<object> put_editCobranzas(int id, TblTelefoniaDocumentosCobrado tblTelefoniaDocumentoCobrado)
        {
            Resultado res = new Resultado();

            TblTelefoniaDocumentosCobrado? objReemplazar;
            objReemplazar = await context.TblTelefoniaDocumentosCobrados.Where(u => u.IdTelefoniaDocCobrados == id).FirstOrDefaultAsync<TblTelefoniaDocumentosCobrado>();

            if (objReemplazar != null)
            {
                objReemplazar.FechaCobro = tblTelefoniaDocumentoCobrado.FechaCobro;
                objReemplazar.NroOperacion = tblTelefoniaDocumentoCobrado.NroOperacion;
                objReemplazar.ImporteCobrado = tblTelefoniaDocumentoCobrado.ImporteCobrado;
                objReemplazar.IdBanco = tblTelefoniaDocumentoCobrado.IdBanco;
                objReemplazar.IdTipoCobro = tblTelefoniaDocumentoCobrado.IdTipoCobro;

                objReemplazar.Estado = tblTelefoniaDocumentoCobrado.Estado;
                objReemplazar.UsuarioEdicion = tblTelefoniaDocumentoCobrado.UsuarioCreacion;
                objReemplazar.FechaEdicion = DateTime.Now;

                context.Entry(objReemplazar).State = EntityState.Modified;

                try
                {
                    await context.SaveChangesAsync();

                    registroFacturasService.set_insertUpdate_cobranza(id, tblTelefoniaDocumentoCobrado.UsuarioCreacion, "U");

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

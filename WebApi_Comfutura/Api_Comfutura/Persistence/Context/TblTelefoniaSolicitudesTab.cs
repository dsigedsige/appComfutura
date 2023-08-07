using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaSolicitudesTab
    {
        public int IdSolicitudTabs { get; set; }
        public int? IdSolicitud { get; set; }
        public int? IdTipoTabs { get; set; }
        public int? IdTipoMovCaja { get; set; }
        public string? DescripcionDetallada { get; set; }
        public string? AlmUmedCodigo { get; set; }
        public decimal? CantidadPresupuesto { get; set; }
        public decimal? PrecioPresupuesto { get; set; }
        public decimal? CostoPresupuesto { get; set; }
        public decimal? CantidadSolicitud { get; set; }
        public decimal? PrecioSolicitud { get; set; }
        public decimal? CostoSolicitud { get; set; }
        public string? IdTipoPersonal { get; set; }
        public string? NroDocPersonal { get; set; }
        public int? IdBanco { get; set; }
        public string? PubMoneCodigo { get; set; }
        public string? CuentaBanco { get; set; }
        public string? CuentaInterbancarioBanco { get; set; }
        public DateTime? FechaValidacion { get; set; }
        public decimal? CantidadValidacion { get; set; }
        public decimal? PrecioValidacion { get; set; }
        public decimal? ImporteValidacion { get; set; }
        public string? Estado1 { get; set; }
        public decimal? PorDetraccion { get; set; }
        public decimal? ImporteDetraccion { get; set; }
        public string? Estado2 { get; set; }
        public DateTime? FechaDeposito { get; set; }
        public decimal? ImporteDeposito { get; set; }
        public string? NroOperacionDeposito { get; set; }
        public string? NombreArchivoDeposito { get; set; }
        public string? NombreArchivoServidorDeposito { get; set; }
        public DateTime? FechaRendicion { get; set; }
        public decimal? ImporteRendicion { get; set; }
        public string? NroDocumentoRendicion { get; set; }
        public string? NombreArchivoRendicion { get; set; }
        public string? NombreArchivoServidorRendicion { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public DateTime? Fecha { get; set; }
        public string? ObsRendicion { get; set; }
    }
}

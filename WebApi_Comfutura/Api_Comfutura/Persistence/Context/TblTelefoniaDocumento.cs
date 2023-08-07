using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaDocumento
    {
        public int IdTelefoniaDocumentos { get; set; }
        public int? IdTipoDocumento { get; set; }
        public string? NroDocumento { get; set; }
        public DateTime? FechaEmsion { get; set; }
        public string? SolicitudPap { get; set; }
        public string? NroOrdenCompra { get; set; }
        public string? Posicion { get; set; }
        public string? Ot { get; set; }
        public string? PubCcteRucCliente { get; set; }
        public string? PubMoneCodigo { get; set; }
        public decimal? PorIgv { get; set; }
        public string? Glosa { get; set; }
        public string? Proyecto { get; set; }
        public decimal? BaseImponible { get; set; }
        public decimal? TotalIgv { get; set; }
        public decimal? ImporteTotal { get; set; }
        public decimal? TasaDetraccion { get; set; }
        public decimal? TotalImpuesto { get; set; }
        public decimal? ImporteNeto { get; set; }
        public decimal? TotalCobrado { get; set; }
        public string? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public string? PubCcteRuCfactoring { get; set; }
        public decimal? PorComisionFactoring { get; set; }
        public decimal? ImporteFactoring { get; set; }
        public DateTime? FechaRegistroFactoring { get; set; }
        public DateTime? FechaPagoDetraccion { get; set; }
        public string? NroOperacionDetraccion { get; set; }
        public decimal? ImporteDetraccion { get; set; }
        public string? VoucherNombreDetraccion { get; set; }
        public string? VoucherNombreServidorDetraccion { get; set; }
        public int? FactoringFlag { get; set; }
        public int? DetraccionFlag { get; set; }
    }
}

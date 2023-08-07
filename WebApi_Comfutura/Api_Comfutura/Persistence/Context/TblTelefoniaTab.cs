using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaTab
    {
        public int IdTabs { get; set; }
        public int? IdRequerimiento { get; set; }
        public int? IdTipoTabs { get; set; }
        public int? IdTipoMovCaja { get; set; }
        public string? DescripcionDetallada { get; set; }
        public string? AlmUmedCodigo { get; set; }
        public decimal? CantidadPresupuesto { get; set; }
        public decimal? PrecioPresupuesto { get; set; }
        public decimal? CostoPresupuesto { get; set; }
        public decimal? CantidadEjecutado { get; set; }
        public decimal? PrecioEjecutado { get; set; }
        public decimal? CostoEjecutado { get; set; }
        public string? IdtipoPersonal { get; set; }
        public string? NroDocPersonal { get; set; }
        public int? IdBanco { get; set; }
        public string? PubMoneCodigo { get; set; }
        public string? CuentaBanco { get; set; }
        public string? CuentaInterbancarioBanco { get; set; }
        public string? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public DateTime? Fecha { get; set; }
    }
}

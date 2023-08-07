using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaRequerimientoMaterial
    {
        public int IdReqMaterial { get; set; }
        public int? IdRequerimiento { get; set; }
        public string? AlmArtiCodigo { get; set; }
        public decimal? CantidadPresupuesto { get; set; }
        public decimal? CostoPresupuesto { get; set; }
        public decimal? CantidadEjecutado { get; set; }
        public decimal? CostoEjecutado { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}

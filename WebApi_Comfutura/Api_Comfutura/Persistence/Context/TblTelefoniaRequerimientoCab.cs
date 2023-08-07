using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaRequerimientoCab
    {
        public int IdRequerimiento { get; set; }
        public string? NroRequerimiento { get; set; }
        public DateTime? FechaCosto { get; set; }
        public string? HoraCosto { get; set; }
        public string? IdProyectoTelefonia { get; set; }
        public int? IdTipoTrabajoTelefonia { get; set; }
        public int? IdAreaTelefonia { get; set; }
        public int? IdOt { get; set; }
        public string? TiempoEjecucion { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}

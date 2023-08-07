using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaRequerimientoCronograma
    {
        public int IdReqCronograma { get; set; }
        public int? IdRequerimiento { get; set; }
        public int? IdPartida { get; set; }
        public int? Duracion { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaTermino { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}

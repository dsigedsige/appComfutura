using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblAceesosEvento
    {
        public int IdAccesoEvento { get; set; }
        public int? IdOpcion { get; set; }
        public string? IdUsuario { get; set; }
        public int? IdEvento { get; set; }
        public int? Estado { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public string? Eventos { get; set; }
    }
}

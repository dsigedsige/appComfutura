using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaSolicitudesCab
    {
        public int IdSolicitud { get; set; }
        public string? NroSolicitud { get; set; }
        public int? IdPresupuesto { get; set; }
        public string? NroPresupuesto { get; set; }
        public DateTime? FechaSolicitud { get; set; }
        public int? IdOt { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public string? UsuarioRechazoSolicitud { get; set; }
        public DateTime? FechaRechazoSolicitud { get; set; }
        public string? ObsRechazoSolicitud { get; set; }
        public string? UsuarioObsSolicitud { get; set; }
        public DateTime? FechaObsSolicitud { get; set; }
        public string? ObsSolicitud { get; set; }
    }
}

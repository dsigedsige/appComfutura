using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaOtArchivo
    {
        public int IdOtArchivo { get; set; }
        public int? IdOt { get; set; }
        public int? IdTipoDocFile { get; set; }
        public string? NombreArchivo { get; set; }
        public string? NombreArchivoServidor { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}

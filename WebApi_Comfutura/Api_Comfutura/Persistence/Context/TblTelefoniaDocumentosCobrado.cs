using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaDocumentosCobrado
    {
        public int IdTelefoniaDocCobrados { get; set; }
        public int? IdTelefoniaDocumentos { get; set; }
        public DateTime? FechaCobro { get; set; }
        public string? NroOperacion { get; set; }
        public decimal? ImporteCobrado { get; set; }
        public int? IdBanco { get; set; }
        public string? NombreArchivo { get; set; }
        public string? NombreArchivoServidor { get; set; }
        public string? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public int? IdTipoCobro { get; set; }
    }
}

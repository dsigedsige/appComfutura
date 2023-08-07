using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblOrdenCompraCotizacione
    {
        public int LogOccoIdentidad { get; set; }
        public int? LogOcomIdentidad { get; set; }
        public int? IdTipoDocFile { get; set; }
        public string? LogOccoNombreArchivo { get; set; }
        public string? LogOccoNombreArchivoServidor { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? LogOccoGanador { get; set; }
    }
}

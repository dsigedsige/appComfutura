using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblDefinicionOpcione
    {
        public int IdOpcion { get; set; }
        public string? NombreOpcion { get; set; }
        public string? UrlOpcion { get; set; }
        public int? ParentId { get; set; }
        public string? NombreParentId { get; set; }
        public string? UrlImagenOpcion { get; set; }
        public int? OrdenOpcion { get; set; }
        public int? Estado { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
        public int? InterfaceOpcion { get; set; }
        public string? TipoInterface { get; set; }
    }
}

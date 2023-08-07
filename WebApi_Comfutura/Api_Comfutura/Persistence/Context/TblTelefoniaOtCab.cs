using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class TblTelefoniaOtCab
    {
        public int IdOt { get; set; }
        public string? NroOt { get; set; }
        public string? NombreOt { get; set; }
        public string? GesProyCodigo { get; set; }
        public int? IdTipoTrabajoTelefonia { get; set; }
        public int? IdAreaTelefonia { get; set; }
        public string? NombreSite { get; set; }
        public string? NumeroIdOt { get; set; }
        public int? IdRegion { get; set; }
        public int? IdProvincia { get; set; }
        public int? IdDistrito { get; set; }
        public DateTime? FechaApertura { get; set; }
        public string? PubCcteRucCliente { get; set; }
        public string? JefeClienteSolicitante { get; set; }
        public string? AnalistaClienteSolicitante { get; set; }
        public int? IdPersonalCoodinador { get; set; }
        public int? IdPersonalJefeResponsable { get; set; }
        public int? IdPersonalLiquidador { get; set; }
        public int? IdPersonalEjecutante { get; set; }
        public int? IdPersonalContable { get; set; }
        public int? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public DateTime? FechaEdicion { get; set; }
    }
}

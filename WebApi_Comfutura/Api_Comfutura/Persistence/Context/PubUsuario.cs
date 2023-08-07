using System;
using System.Collections.Generic;

namespace Api_Comfutura.Persistence.Context
{
    public partial class PubUsuario
    {
        public string? PubUsuaNombre { get; set; }
        public string PubUsuaCodigo { get; set; } = null!;
        public string PubUsuaLogin { get; set; } = null!;
        public string? PubUsuaClave { get; set; }
        public string? PubUsuaCargo { get; set; }
        public string? PubUsuaEmail { get; set; }
        public string? PubUsuaAdm { get; set; }
        public string? PubUsuaSis { get; set; }
        public string? PubEstaCodigo { get; set; }
        public string? PubUsuaUsuCrea { get; set; }
        public DateTime? PubUsuaFecCrea { get; set; }
        public string? PubUsuaUsuModi { get; set; }
        public DateTime? PubUsuaFecModi { get; set; }
        public int PubUsuaIdentidad { get; set; }
        public string? PubAreaCodigo { get; set; }
        public string? PubUsuaObs { get; set; }
        public string? PubDni { get; set; }
    }
}

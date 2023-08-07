namespace Api_Comfutura.Models.Logistica.Procesos
{
    public class RegistroFacturas_E
    {
        public string? IdTelefoniaDocumentos { get; set; }
        public string? IdTipoDocumento { get; set; }
        public string? NroDocumento { get; set; }
        public DateTime? FechaEmsion { get; set; }
        public string? SolicitudPAP { get; set; }
        public string? NroOrdenCompra { get; set; }
        public string? Posicion { get; set; }
        public string? OT { get; set; }
        public string? PubCcteRucCliente { get; set; }
        public string? PubMoneCodigo { get; set; }
        public string? PorIgv { get; set; }

        public string? Glosa { get; set; }
        public string? Proyecto { get; set; }


        public string? BaseImponible { get; set; }
        public string? TotalIGV { get; set; }
        public string? ImporteTotal { get; set; }
        public int? TasaDetraccion { get; set; }
        public string? TotalImpuesto { get; set; }
        public string? ImporteNeto { get; set; }
        public string? TotalCobrado { get; set; }
        public string? Estado { get; set; }
        public string? UsuarioCreacion { get; set; }
        public string? FechaCreacion { get; set; }
        public string? UsuarioEdicion { get; set; }
        public string? FechaEdicion { get; set; }


        public string? DescripcionEstado { get; set; }
        public string? DescripcionTipoDoc { get; set; }
        public string? DescripcionCliente { get; set; }
        public string? DescripcionMoneda { get; set; }

        public string? SaldoCobrar { get; set; }
        public int? FactoringFlag { get; set; }
        public int? DetraccionFlag { get; set; }

    }
}

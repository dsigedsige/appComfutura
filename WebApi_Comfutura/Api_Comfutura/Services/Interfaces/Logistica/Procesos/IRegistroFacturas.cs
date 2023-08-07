namespace Api_Comfutura.Services.Interfaces.Logistica.Procesos
{
    public interface IRegistroFacturas
    {
        object get_estados();

        object get_tipoDocumentos();
        object get_registroFacturasCab(string cliente, string? nroOrdenCompra, string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente);

        object get_buscarOrdenCompra(string nroOC, string posic);

        object get_buscarOT(string nroOT);

        object get_registroFacturaID(int IdTelefoniaDocumentos);

        object get_descargarGrilla_registroFactura(string cliente,string? nroOrdenCompra, string fecha_ini, string fecha_fin, string estado, string usuario, int detracPendiente);

        object set_anular_registroFactura(int IdTelefoniaDocumentos);
        object get_cobranzasCab(int IdTelefoniaDocumentos);

        object set_eliminar_archivoCobranza(int IdCobranza);

        void set_insertUpdate_facturas(int IdDocumento, string? usuario,string Proceso);
        void set_insertUpdate_cobranza(int IdCobranza, string? usuario, string Proceso);

        object get_tiposCobros();

        object set_insertUpdate_detracciones(int IdTelefoniaDocumentos, string FechaPagoDetraccion, string? NroOperacionDetraccion, string ImporteDetraccion, string UsuarioCreacion);

        object set_cerrar_detraccion(int IdDocumento, string idUsuario);

        object get_proveedor();

        object set_insertUpdate_factoring(int IdTelefoniaDocumentos, string PubCCteRuCFactoring, string? PorComisionFactoring, string ImporteFactoring, string FechaRegistroFactoring, string UsuarioCreacion);

        object set_cerrar_factoring(int IdDocumento, string idUsuario);



    }
}

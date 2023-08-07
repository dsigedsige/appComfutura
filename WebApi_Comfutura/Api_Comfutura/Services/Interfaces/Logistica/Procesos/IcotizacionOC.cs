namespace Api_Comfutura.Services.Interfaces.Logistica.Procesos
{
    public interface IcotizacionOC
    {
        object get_buscarOC(string nroOc, string usuario);

        public object get_detalleDocumentosOC(int IdOC, string usuario);

        object set_eliminar_archivoOC(int idOCcotizacion);
    }
}

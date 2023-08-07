namespace Api_Comfutura.Services.Interfaces.Requerimientos.Procesos
{
    public interface IRegistroOT
    {
        object get_ubigeosDepartamento();

        object get_ubigeosProvincias( string idDepartamento);
        object get_ubigeosDistritos(string idDepartamento, string idProvincia);

        object get_estadosRegistroOT();

        object get_registroOTcab(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin, string estado, string usuario);

         object get_proyectos();
 
         object get_clientes();
 
         object get_personales();
 
         object get_registroOT_id(int idOT);
 
         object set_anular_registroOT(int idOT);

        object get_descargarGrilla_registroOTcab(string departamento, string provincia, string distrito, string fecha_ini, string fecha_fin, string estado, string usuario);

        object get_tiposDocumentos();
        object get_detalleArchivosOT(int idOT);

        object set_eliminar_archivoOT(int idOtArchivo);


    }
}

using Api_Comfutura.Models.Requerimientos.Procesos;

namespace Api_Comfutura.Services.Interfaces.Requerimientos.Procesos
{
    public interface IRegistroSolicitudes
    {
        object get_registroSolicitudCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario);

        object get_estadosSolicitudes();

        object get_buscarNroPresupuesto(string nroPresupuesto);

        void set_insertUpdate_solicitudes(int IdSolicitud, string? usuario, string Proceso);

        public object get_descargarGrilla_solicitudesCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario);

        object set_anular_solicitud(int IdSolicitud, string idUsuario);

        object get_detalleResumenSolicitud(int IdSolicitud);

        object set_provisionar_solicitud(int IdSolicitud, string IdUsuario);

        object get_materialesSolicitud(int IdSolicitud);

        object get_detalleTabsGruposSolicitud(int IdSolicitud, int IdTipoTabs);

        object set_eliminarTabsGruposSolicitud(int IdSolicitudTabs);

        object set_anularTabsGruposSolicitud(int IdSolicitudTabs, string IdUsuario);

        object set_saveDetalleTabsMasivo(TabsAsignacionPersonal objTabs, int IdSolicitud, string usuario);


    }
}

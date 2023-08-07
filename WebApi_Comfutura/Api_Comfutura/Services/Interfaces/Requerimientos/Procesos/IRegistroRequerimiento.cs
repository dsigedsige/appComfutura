namespace Api_Comfutura.Services.Interfaces.Requerimientos.Procesos
{
    public interface IRegistroRequerimiento
    {
        object get_estadosRequerimiento();

        object get_registroRequerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario);

        object get_tiposTrabajo();

        object get_areas();

        object get_buscarNroOT(string nroOT);

        object set_anular_requerimiento(int IdRequerimiento, string idUsuario);

        object get_descargarGrilla_requerimientoCab(string departamento, string provincia, string? nroRequerimiento, string fecha_ini, string fecha_fin, string estado, string usuario);


        object get_descargar_cronograma(int IdRequerimiento, string usuario);


        //------TAB CRONOGRAMAS -----

        object get_detalleCronograma(int IdRequerimiento);
        object set_eliminar_cronograma(int IdReqCronograma );

        object get_partidas();

        //------TAB RESUMEN -----

        object get_detalleResumen(int IdRequerimiento);

        //------TAB MATERIALES -----

        object get_materialesCab(int IdRequerimiento);

        object get_detalleMateriales(string usuario);

        object set_grabarMateriales(string codigosMateriales, int IdRequerimiento, string usuario);

        object set_actualizar_cantidadMaterial(int IdReqMaterial, string AlmArtiCodigo, string CantidadPresupuesto, string CostoPresupuesto, string Usuario);

        object set_eliminar_material(int IdReqMaterial);

        //----contratista

        object get_unidadMedidas();

        object get_tiposDocumentos();

        object get_monedas();
        object get_bancos();
        object get_personales(string tipoDoc);

        object get_detalleTabsGrupos(int IdRequerimiento, int IdTipoTabs);

        object set_eliminarTabsGrupos(int IdTabs);

        object get_tiposConceptos();

        object get_cargosPersonal();


    }
}

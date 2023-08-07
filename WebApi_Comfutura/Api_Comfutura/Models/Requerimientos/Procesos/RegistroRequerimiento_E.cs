namespace Api_Comfutura.Models.Requerimientos.Procesos
{
    public class RegistroRequerimiento_E
    {
        public int IdRequerimiento { get; set; }
        public string? NroRequerimiento { get; set; }
        public DateTime? FechaCosto { get; set; }
        public string? HoraCosto { get; set; }
        public string? IdProyectoTelefonia { get; set; }
        public string? IdTipoTrabajoTelefonia { get; set; }
        public string? IdAreaTelefonia { get; set; }
        public string? IdOt { get; set; }
        public string? TiempoEjecucion { get; set; }
        public string? Estado { get; set; }

        public string? Proyecto { get; set; }
        public string? TipoTrabajo { get; set; }
        public string? Area { get; set; }
        public string? NroOT { get; set; }
        public string? descripcionEstado { get; set; }
        public string? Site { get; set; }        

    }

    public class MaterialesDet_E
    {
        public bool checkeado { get; set; }
        public string? codigoMaterial { get; set; }
        public string? descripcionMaterial { get; set; }
        public string? unidadMedida { get; set; }
        public string? costo { get; set; }

    }

    public class TabsGrupos_E
    {
        public int? IdTabs { get; set; }
        public int? IdRequerimiento { get; set; }
        public int? IdTipoTabs { get; set; }
        public string? IdTipoMovCaja { get; set; }
        public string? DescripcionDetallada { get; set; }
        public string? AlmUmedCodigo { get; set; }
        public string? DescripcionUM { get; set; }

        
        public string? CantidadPresupuesto { get; set; }
        public string? PrecioPresupuesto { get; set; }
        public string? CostoPresupuesto { get; set; }
 
        public string? IdtipoPersonal { get; set; }
        public string? NroDocPersonal { get; set; }

        public string? DescripcionPersonal { get; set; }

        public string? IdBanco { get; set; }
        public string? PubMoneCodigo { get; set; }
        public string? CuentaBanco { get; set; }
        public string? CuentaInterbancarioBanco { get; set; }
        public string? Estado { get; set; }
        public DateTime? Fecha { get; set; }

        public string? CargoPersonal { get; set; }
        public string? DescripcionCargoPersonal { get; set; }
        public string? DescripcionBanco { get; set; }

    }


}

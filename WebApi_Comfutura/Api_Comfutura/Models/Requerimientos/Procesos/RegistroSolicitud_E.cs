namespace Api_Comfutura.Models.Requerimientos.Procesos
{
    public class RegistroSolicitud_E
    {
        public int IdSolicitud { get; set; }
        public string? NroSolicitud { get; set; }

        public int IdPresupuesto { get; set; }
        public string? NroPresupuesto { get; set; }
        public DateTime? FechaSolicitud { get; set; }


 
        public string? IdProyectoTelefonia { get; set; }
        public string? IdTipoTrabajoTelefonia { get; set; }
 
        public string? IdOt { get; set; }
 
        public string? Estado { get; set; }

        public string? Proyecto { get; set; }
        public string? TipoTrabajo { get; set; }
 
        public string? NroOT { get; set; }
        public string? descripcionEstado { get; set; }
        public string? Site { get; set; }
    }

    public class TabsGruposSolicitud_E
    {
        public bool? checkeado { get; set; }
        public int? IdSolicitudTabs { get; set; }
        public int? IdSolicitud { get; set; }
        public int? IdTipoTabs { get; set; }
        public string? IdTipoMovCaja { get; set; }
        public string? DescripcionDetallada { get; set; }
        public string? AlmUmedCodigo { get; set; }
        public string? DescripcionUM { get; set; }

        public string? CantidadPresupuesto { get; set; }
        public string? PrecioPresupuesto { get; set; }
        public string? CostoPresupuesto { get; set; }


        public string? CantidadSolicitud { get; set; }
        public string? PrecioSolicitud { get; set; }
        public string? CostoSolicitud { get; set; }

        public string? IdTipoPersonal { get; set; }
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


        public string? TotalGeneralPresupuesto { get; set; }
        public string? TotalGeneralRequerimiento { get; set; }
        public string? SaldoGeneralPendiente { get; set; }

        public string? ObsRendicion { get; set; }


        

    }

    public class TabsAsignacionPersonal
    { 
        public string? IdTipoPersonal { get; set; }
        public string? NroDocPersonal { get; set; }
        public string? IdBanco { get; set; }
        public string? PubMoneCodigo { get; set; }
        public string? CuentaBanco { get; set; }
        public string? CuentaInterbancarioBanco { get; set; }

        public List<string>? ListSolicitudesTabs { get; set; }

    }



}

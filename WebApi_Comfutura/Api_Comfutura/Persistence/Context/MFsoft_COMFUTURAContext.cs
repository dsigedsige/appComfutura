using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Api_Comfutura.Persistence.Context
{
    public partial class MFsoft_COMFUTURAContext : DbContext
    {
        public MFsoft_COMFUTURAContext()
        {
        }

        public MFsoft_COMFUTURAContext(DbContextOptions<MFsoft_COMFUTURAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PubUsuario> PubUsuarios { get; set; } = null!;
        public virtual DbSet<TblAceesosEvento> TblAceesosEventos { get; set; } = null!;
        public virtual DbSet<TblDefinicionOpcione> TblDefinicionOpciones { get; set; } = null!;
        public virtual DbSet<TblOrdenCompraCotizacione> TblOrdenCompraCotizaciones { get; set; } = null!;
        public virtual DbSet<TblTelefoniaDocumento> TblTelefoniaDocumentos { get; set; } = null!;
        public virtual DbSet<TblTelefoniaDocumentosCobrado> TblTelefoniaDocumentosCobrados { get; set; } = null!;
        public virtual DbSet<TblTelefoniaOtArchivo> TblTelefoniaOtArchivos { get; set; } = null!;
        public virtual DbSet<TblTelefoniaOtCab> TblTelefoniaOtCabs { get; set; } = null!;
        public virtual DbSet<TblTelefoniaRequerimientoCab> TblTelefoniaRequerimientoCabs { get; set; } = null!;
        public virtual DbSet<TblTelefoniaRequerimientoCronograma> TblTelefoniaRequerimientoCronogramas { get; set; } = null!;
        public virtual DbSet<TblTelefoniaRequerimientoMaterial> TblTelefoniaRequerimientoMaterials { get; set; } = null!;
        public virtual DbSet<TblTelefoniaSolicitudesCab> TblTelefoniaSolicitudesCabs { get; set; } = null!;
        public virtual DbSet<TblTelefoniaSolicitudesTab> TblTelefoniaSolicitudesTabs { get; set; } = null!;
        public virtual DbSet<TblTelefoniaTab> TblTelefoniaTabs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {


            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PubUsuario>(entity =>
            {
                entity.HasKey(e => e.PubUsuaCodigo)
                    .HasName("PK__Pub_Usuarios__6541F3FA");

                entity.ToTable("Pub_Usuarios");

                entity.Property(e => e.PubUsuaCodigo)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Codigo")
                    .IsFixedLength();

                entity.Property(e => e.PubAreaCodigo)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Area_Codigo")
                    .IsFixedLength();

                entity.Property(e => e.PubDni)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("pub_dni");

                entity.Property(e => e.PubEstaCodigo)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Esta_Codigo")
                    .IsFixedLength();

                entity.Property(e => e.PubUsuaAdm)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Adm")
                    .IsFixedLength();

                entity.Property(e => e.PubUsuaCargo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Cargo");

                entity.Property(e => e.PubUsuaClave)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Clave");

                entity.Property(e => e.PubUsuaEmail)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Email");

                entity.Property(e => e.PubUsuaFecCrea)
                    .HasColumnType("datetime")
                    .HasColumnName("Pub_Usua_FecCrea");

                entity.Property(e => e.PubUsuaFecModi)
                    .HasColumnType("datetime")
                    .HasColumnName("Pub_Usua_FecModi");

                entity.Property(e => e.PubUsuaIdentidad)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Pub_Usua_Identidad");

                entity.Property(e => e.PubUsuaLogin)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Login");

                entity.Property(e => e.PubUsuaNombre)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Nombre");

                entity.Property(e => e.PubUsuaObs)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Obs");

                entity.Property(e => e.PubUsuaSis)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_Sis")
                    .IsFixedLength();

                entity.Property(e => e.PubUsuaUsuCrea)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_UsuCrea")
                    .IsFixedLength();

                entity.Property(e => e.PubUsuaUsuModi)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("Pub_Usua_UsuModi")
                    .IsFixedLength();
            });

            modelBuilder.Entity<TblAceesosEvento>(entity =>
            {
                entity.HasKey(e => e.IdAccesoEvento)
                    .HasName("PK__tbl_Acee__8CBC51F1B3B690CC");

                entity.ToTable("tbl_Aceesos_Evento");

                entity.Property(e => e.IdAccesoEvento).HasColumnName("id_Acceso_evento");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.Eventos)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_creacion");

                entity.Property(e => e.FechaEdicion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_edicion");

                entity.Property(e => e.IdEvento).HasColumnName("id_Evento");

                entity.Property(e => e.IdOpcion).HasColumnName("id_Opcion");

                entity.Property(e => e.IdUsuario)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("id_Usuario");

                entity.Property(e => e.UsuarioCreacion).HasColumnName("usuario_creacion");

                entity.Property(e => e.UsuarioEdicion).HasColumnName("usuario_edicion");
            });

            modelBuilder.Entity<TblDefinicionOpcione>(entity =>
            {
                entity.HasKey(e => e.IdOpcion)
                    .HasName("PK__tbl_Defi__EFAF42586128E101");

                entity.ToTable("tbl_Definicion_Opciones");

                entity.Property(e => e.IdOpcion).HasColumnName("id_opcion");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_creacion");

                entity.Property(e => e.FechaEdicion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_edicion");

                entity.Property(e => e.InterfaceOpcion).HasColumnName("interface_Opcion");

                entity.Property(e => e.NombreOpcion)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("nombre_opcion");

                entity.Property(e => e.NombreParentId)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("nombreParentID");

                entity.Property(e => e.OrdenOpcion).HasColumnName("orden_Opcion");

                entity.Property(e => e.ParentId).HasColumnName("parentID");

                entity.Property(e => e.TipoInterface)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.UrlImagenOpcion)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("urlImagen_Opcion");

                entity.Property(e => e.UrlOpcion)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("url_opcion");

                entity.Property(e => e.UsuarioCreacion).HasColumnName("usuario_creacion");

                entity.Property(e => e.UsuarioEdicion).HasColumnName("usuario_edicion");
            });

            modelBuilder.Entity<TblOrdenCompraCotizacione>(entity =>
            {
                entity.HasKey(e => e.LogOccoIdentidad)
                    .HasName("PK__Tbl_Orde__BD32FB20BB996A5A");

                entity.ToTable("Tbl_OrdenCompra_Cotizaciones");

                entity.Property(e => e.LogOccoIdentidad).HasColumnName("LogOCcoIdentidad");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.LogOccoGanador).HasColumnName("LogOCcoGanador");

                entity.Property(e => e.LogOccoNombreArchivo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("LogOCcoNombreArchivo");

                entity.Property(e => e.LogOccoNombreArchivoServidor)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("LogOCcoNombreArchivoServidor");

                entity.Property(e => e.LogOcomIdentidad).HasColumnName("LogOComIdentidad");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaDocumento>(entity =>
            {
                entity.HasKey(e => e.IdTelefoniaDocumentos)
                    .HasName("PK__tbl_Tele__5F3218D45D93DEB2");

                entity.ToTable("tbl_Telefonia_Documentos");

                entity.Property(e => e.BaseImponible).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.Estado)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.FechaEmsion).HasColumnType("datetime");

                entity.Property(e => e.FechaPagoDetraccion).HasColumnType("datetime");

                entity.Property(e => e.FechaRegistroFactoring).HasColumnType("datetime");

                entity.Property(e => e.Glosa)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.ImporteDetraccion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteFactoring).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteNeto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteTotal).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.NroDocumento)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NroOperacionDetraccion)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NroOrdenCompra)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Ot)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PorComisionFactoring).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PorIgv).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.Posicion)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Proyecto)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.PubCcteRuCfactoring)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("PubCCteRuCFactoring");

                entity.Property(e => e.PubCcteRucCliente)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PubMoneCodigo)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.SolicitudPap)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TasaDetraccion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.TotalCobrado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.TotalIgv).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.TotalImpuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.VoucherNombreDetraccion)
                    .HasMaxLength(159)
                    .IsUnicode(false);

                entity.Property(e => e.VoucherNombreServidorDetraccion)
                    .HasMaxLength(159)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaDocumentosCobrado>(entity =>
            {
                entity.HasKey(e => e.IdTelefoniaDocCobrados)
                    .HasName("PK__tbl_Tele__90275578BE59262E");

                entity.ToTable("tbl_Telefonia_Documentos_Cobrados");

                entity.Property(e => e.Estado)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.FechaCobro).HasColumnType("datetime");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.ImporteCobrado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.NombreArchivo)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NombreArchivoServidor)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NroOperacion)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaOtArchivo>(entity =>
            {
                entity.HasKey(e => e.IdOtArchivo)
                    .HasName("PK__tbl_Tele__23898A5D8214D33A");

                entity.ToTable("tbl_Telefonia_OT_Archivo");

                entity.Property(e => e.IdOtArchivo).HasColumnName("id_OtArchivo");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_creacion");

                entity.Property(e => e.FechaEdicion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_edicion");

                entity.Property(e => e.IdOt).HasColumnName("id_Ot");

                entity.Property(e => e.IdTipoDocFile).HasColumnName("id_TipoDocFile");

                entity.Property(e => e.NombreArchivo)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("nombreArchivo");

                entity.Property(e => e.NombreArchivoServidor)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("nombreArchivo_servidor");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("usuario_creacion");

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("usuario_edicion");
            });

            modelBuilder.Entity<TblTelefoniaOtCab>(entity =>
            {
                entity.HasKey(e => e.IdOt)
                    .HasName("PK__tbl_Tele__0149B74683736CEB");

                entity.ToTable("tbl_Telefonia_OT_Cab");

                entity.Property(e => e.IdOt).HasColumnName("id_Ot");

                entity.Property(e => e.AnalistaClienteSolicitante)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("analistaClienteSolicitante");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FechaApertura)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaApertura");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_creacion");

                entity.Property(e => e.FechaEdicion)
                    .HasColumnType("datetime")
                    .HasColumnName("fecha_edicion");

                entity.Property(e => e.GesProyCodigo)
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("ges_proy_Codigo");

                entity.Property(e => e.IdAreaTelefonia).HasColumnName("id_Area_Telefonia");

                entity.Property(e => e.IdDistrito).HasColumnName("id_Distrito");

                entity.Property(e => e.IdPersonalContable).HasColumnName("id_personalContable");

                entity.Property(e => e.IdPersonalCoodinador).HasColumnName("id_personalCoodinador");

                entity.Property(e => e.IdPersonalEjecutante).HasColumnName("id_personalEjecutante");

                entity.Property(e => e.IdPersonalJefeResponsable).HasColumnName("id_personalJefeResponsable");

                entity.Property(e => e.IdPersonalLiquidador).HasColumnName("id_personalLiquidador");

                entity.Property(e => e.IdProvincia).HasColumnName("id_Provincia");

                entity.Property(e => e.IdRegion).HasColumnName("id_Region");

                entity.Property(e => e.IdTipoTrabajoTelefonia).HasColumnName("id_TipoTrabajo_Telefonia");

                entity.Property(e => e.JefeClienteSolicitante)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("jefeClienteSolicitante");

                entity.Property(e => e.NombreOt)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("nombre_Ot");

                entity.Property(e => e.NombreSite)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("nombreSite");

                entity.Property(e => e.NroOt)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nro_Ot");

                entity.Property(e => e.NumeroIdOt)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("numero_id_Ot");

                entity.Property(e => e.PubCcteRucCliente)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("pub_ccte_ruc_Cliente");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("usuario_creacion");

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("usuario_edicion");
            });

            modelBuilder.Entity<TblTelefoniaRequerimientoCab>(entity =>
            {
                entity.HasKey(e => e.IdRequerimiento)
                    .HasName("PK__tbl_Tele__BAFD1D03A97256C7");

                entity.ToTable("tbl_Telefonia_Requerimiento_Cab");

                entity.Property(e => e.FechaCosto).HasColumnType("datetime");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.HoraCosto)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IdProyectoTelefonia)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.NroRequerimiento)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TiempoEjecucion)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaRequerimientoCronograma>(entity =>
            {
                entity.HasKey(e => e.IdReqCronograma)
                    .HasName("PK__tbl_Tele__AF35942E1923346D");

                entity.ToTable("tbl_Telefonia_Requerimiento_Cronograma");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.FechaInicio).HasColumnType("datetime");

                entity.Property(e => e.FechaTermino).HasColumnType("datetime");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaRequerimientoMaterial>(entity =>
            {
                entity.HasKey(e => e.IdReqMaterial)
                    .HasName("PK__tbl_Tele__EF24A405067036F6");

                entity.ToTable("tbl_Telefonia_Requerimiento_Material");

                entity.Property(e => e.AlmArtiCodigo)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CantidadEjecutado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CantidadPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoEjecutado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaSolicitudesCab>(entity =>
            {
                entity.HasKey(e => e.IdSolicitud)
                    .HasName("PK__tbl_Tele__36899CEF8E240B3A");

                entity.ToTable("tbl_Telefonia_Solicitudes_Cab");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.FechaObsSolicitud).HasColumnType("datetime");

                entity.Property(e => e.FechaRechazoSolicitud).HasColumnType("datetime");

                entity.Property(e => e.FechaSolicitud).HasColumnType("datetime");

                entity.Property(e => e.NroPresupuesto)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NroSolicitud)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ObsRechazoSolicitud)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ObsSolicitud)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioObsSolicitud)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioRechazoSolicitud)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaSolicitudesTab>(entity =>
            {
                entity.HasKey(e => e.IdSolicitudTabs)
                    .HasName("PK__tbl_Tele__0C8C5DEF7CE1A4C3");

                entity.ToTable("tbl_Telefonia_Solicitudes_Tab");

                entity.Property(e => e.AlmUmedCodigo)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.CantidadPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CantidadSolicitud).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CantidadValidacion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoSolicitud).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CuentaBanco)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CuentaInterbancarioBanco)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DescripcionDetallada)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Estado1)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Estado2)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaDeposito).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.FechaRendicion).HasColumnType("datetime");

                entity.Property(e => e.FechaValidacion).HasColumnType("datetime");

                entity.Property(e => e.IdTipoPersonal)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.ImporteDeposito).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteDetraccion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteRendicion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.ImporteValidacion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.NombreArchivoDeposito)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.NombreArchivoRendicion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.NombreArchivoServidorDeposito)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NombreArchivoServidorRendicion)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.NroDocPersonal)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NroDocumentoRendicion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NroOperacionDeposito)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ObsRendicion)
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PorDetraccion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PrecioPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PrecioSolicitud).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PrecioValidacion).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PubMoneCodigo)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTelefoniaTab>(entity =>
            {
                entity.HasKey(e => e.IdTabs)
                    .HasName("PK__tbl_Tele__9FCCE053349D37C7");

                entity.ToTable("tbl_Telefonia_Tab");

                entity.Property(e => e.AlmUmedCodigo)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.CantidadEjecutado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CantidadPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoEjecutado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CostoPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.CuentaBanco)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CuentaInterbancarioBanco)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DescripcionDetallada)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.FechaEdicion).HasColumnType("datetime");

                entity.Property(e => e.IdtipoPersonal)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.NroDocPersonal)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioEjecutado).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PrecioPresupuesto).HasColumnType("decimal(28, 6)");

                entity.Property(e => e.PubMoneCodigo)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioCreacion)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioEdicion)
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

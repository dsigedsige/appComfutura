namespace Api_Comfutura.Models.Accesos
{
    public class Login
    {
        public object? listMenu { get; set; }
    }

    public class MenuPermisos
    {
        public int id_opcion { get; set; }
        public int id_usuarios { get; set; }
        public string nombre_principal { get; set; }
        public int parent_id_principal { get; set; }
        public string urlmagene_principal { get; set; }
        public object listMenu { get; set; }
    }

    public class Menu
    {
        public List<MenuPermisos>? menuPermisos { get; set; }
        public object? menuEventos { get; set; }
        public string? id_usuario { get; set; }
        public int id_perfil { get; set; }
        public string? nombre_usuario { get; set; }
        public string? login_usuario { get; set; }
        public int es_supervisor { get; set; }
        public object? obj_empresa { get; set; }

        public string? token { get; set; }
 

    }

    public class MenuPermisosAcceso
    {
        public string text { get; set; }
        public int value { get; set; }
        public object? children { get; set; }
    }

    public class MenuAcceso
    {
        public string text { get; set; }
        public string value { get; set; }
        public List<MenuPermisosAcceso>? children { get; set; }
    }

}

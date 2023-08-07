using Api_Comfutura.Models;

namespace Api_Comfutura.Services.Interfaces.Accesos
{
    public interface ILogin
    {
        object iniciarSesion(string login, string constrasenia);
        Resultado generarArbolAccesos();
        object reporteResumen_rrmm(int idCiclo, int idUsuario);
    }
 
}

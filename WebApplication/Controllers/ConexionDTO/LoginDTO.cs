using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class LoginDTO
    {
        #region FuncionObtenerUsuarios
        public Usuarios FunGetUsuarios(string user,string pass)
        {
            Usuarios _usuarios = new Usuarios();

            try
            {
                using (BDD_HRVEntities _db = new BDD_HRVEntities())
                {
                    _usuarios = _db.Usuarios.Include("Perfiles").Where(u => u.Perfiles.estado_perfil & u.login_usuario == user
                    && u.password_usuario == pass && u.estado_usuario).FirstOrDefault();
                }

                if (_usuarios == null) return null;
                else return _usuarios;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion
    }
}
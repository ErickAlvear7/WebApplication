using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class SeguridadDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();
        public List<User> FunGetUsuarios()
        {
            try
            {

                var _user = _db.Usuarios.ToList();
                List<User> _usu = new List<User>();

                foreach (var item in _user)
                {
                    _usu.Add(new User()
                    {
                        UserId = item.id_perfil,
                        Perfil = item.Perfiles.nombre_perfil,
                        Usuario = item.nombre_usuario+" "+item.apellido_usuario,
                        Login = item.login_usuario,
                        Estado = item.estado_usuario?"Activo":"Inactivo"
                    });
                }

                return _usu;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }

        public List<Perfi> FunGetPerfiles()
        {
            try
            {
                var _per = _db.Perfiles.ToList();
                List<Perfi> _perfil = new List<Perfi>();

                foreach (var item in _per)
                {
                    _perfil.Add(new Perfi()
                    {
                        IdPerfil = item.id_perfil,
                        Perfil = item.nombre_perfil,
                        Estado = item.estado_perfil?"Activo":"Inactivo"
                    });
                }

                return _perfil;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
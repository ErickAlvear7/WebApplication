using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class SeguridadDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();
        DataSet _dataSet = new DataSet();
        SqlDataAdapter _dataAdapter = new SqlDataAdapter();
     
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
        //Funcion consulta datos de SP_
        public DataSet FunConsultaDatos(int tipo1, int tipo2, string var1, string var2, string conexion)
        {
            try
            {

                using (SqlConnection _conexion = new SqlConnection(conexion)) 
                {
                    using(SqlCommand _command = new SqlCommand())
                    {
                        _command.Connection = _conexion;
                        _command.CommandTimeout = 9000;
                        _command.CommandType = CommandType.StoredProcedure;
                        _command.CommandText = "sp_ConsultaDatos";
                        _command.Parameters.AddWithValue("@tipo_in1",tipo1);
                        _command.Parameters.AddWithValue("@tipo_in2", tipo2);
                        _command.Parameters.AddWithValue("@tipo_var1", var1);
                        _command.Parameters.AddWithValue("@tipo_var2", var2);
                        _dataAdapter.SelectCommand = _command;
                        _dataAdapter.Fill(_dataSet);
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return _dataSet;
        }

        public int FunConsulataLogin(string _login)
        {
            try
            {
                
                return _db.Usuarios.Where(u => u.login_usuario == _login).FirstOrDefault().id_usuario;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
            
    }
}
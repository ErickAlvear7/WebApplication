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
        #region Variables

       
        BDD_HRVEntities _db = new BDD_HRVEntities();
        //Usuarios
        DataSet _dataSet = new DataSet();
        SqlDataAdapter _dataAdapter = new SqlDataAdapter();
        //Perfiles
        DataSet _dataS = new DataSet();
        SqlDataAdapter _dataA = new SqlDataAdapter();
        #endregion

        #region FuncionObterUsuariosPerfil     
        public List<User> FunGetUsuarios()
        {
            try
            {

                var _user = _db.Usuarios.ToList();
                List<User> _usuario = new List<User>();

                foreach (var item in _user)
                {
                    _usuario.Add(new User()
                    {
                        UserId = item.id_perfil,
                        Perfil = item.Perfiles.nombre_perfil,
                        Usuario = item.nombre_usuario+" "+item.apellido_usuario,
                        Login = item.login_usuario,
                        Estado = item.estado_usuario?"Activo":"Inactivo"
                    });
                }

                return _usuario;

            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
        #endregion

        #region FuncionObtenerPerfiles    
        public List<Perfi> FunGetPerfiles()
        {
            try
            {
                var _perfil = _db.Perfiles.ToList();
                List<Perfi> _perfiles = new List<Perfi>();

                foreach (var item in _perfil)
                {
                    _perfiles.Add(new Perfi()
                    {
                        IdPerfil = item.id_perfil,
                        Perfil = item.nombre_perfil,
                        Estado = item.estado_perfil?"Activo":"Inactivo"
                    });
                }

                return _perfiles;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion
      
        #region FuncionSpUltimoRegistroUsuario

        
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
        #endregion

        #region FuncionUltimoRegistroPerfil            
        public DataSet FunConsultaPerfil(int tipo, string var, string coneccion)
        {
            try
            {
                using(SqlConnection _con = new SqlConnection(coneccion))
                {
                    using(SqlCommand _com = new SqlCommand())
                    {
                        _com.Connection = _con;
                        _com.CommandTimeout = 9000;
                        _com.CommandType = CommandType.StoredProcedure;
                        _com.CommandText = "sp_ConsultaPerfil";
                        _com.Parameters.AddWithValue("@var_int", tipo);
                        _com.Parameters.AddWithValue("@var_char", var);
                        _dataA.SelectCommand = _com;
                        _dataA.Fill(_dataS);
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return _dataS;
        }
        #endregion

        #region FuncionConsultaUsuarioExiste
        public int FunConsulataLogin(string _login)
        {
            try
            {

                return _db.Usuarios.Where(u => u.login_usuario == _login).FirstOrDefault() == null ? 0 :
                    _db.Usuarios.Where(u => u.login_usuario == _login).FirstOrDefault().id_perfil;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region FuncionConsultaPerfilExiste
        public int FunConsultaPerfil(string _perfil)
        {
            return _db.Perfiles.Where(p => p.nombre_perfil == _perfil).FirstOrDefault() == null ? 0 :
                  _db.Perfiles.Where(p => p.nombre_perfil == _perfil).FirstOrDefault().id_perfil;
        }
        #endregion

        #region FuncionActualizarUsuarioConSP

       
        //funcion para actualizar usuario con procedimiento almacenado sql-server
        public DataSet FunUpdateUsuario(string _logAnt, string _logAct,int _perfilId, string _nombre, string _apellido, 
                                        string _password, string _estado, string coneccion)
        {
            try
            {
                using (SqlConnection _con = new SqlConnection(coneccion))
                {
                    using (SqlCommand _com = new SqlCommand())
                    {
                        _com.Connection = _con;
                        _com.CommandTimeout = 9000;
                        _com.CommandType = CommandType.StoredProcedure;
                        _com.CommandText = "sp_UpdateUsuario";
                        _com.Parameters.AddWithValue("@var_loginAnt", _logAnt);
                        _com.Parameters.AddWithValue("@var_login", _logAct);
                        _com.Parameters.AddWithValue("@var_idPerfil", _perfilId);
                        _com.Parameters.AddWithValue("@var_nombre", _nombre);
                        _com.Parameters.AddWithValue("@var_apellido", _apellido);
                        _com.Parameters.AddWithValue("@var_password", _password);
                        _com.Parameters.AddWithValue("@var_estado", _estado);
                        _dataA.SelectCommand = _com;
                        _dataA.Fill(_dataS);
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return _dataS;
        }
        #endregion
    }
}
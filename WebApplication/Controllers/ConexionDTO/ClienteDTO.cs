using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class ClienteDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();

        DataSet _dataSet = new DataSet();
        SqlDataAdapter _dataAdapter = new SqlDataAdapter();


        public List<Catalogo> FunGetClientes()
        {
            try
            {
                var __cliente = from Cli in _db.Clientes
                                from Prov in _db.ProvinciaClientes
                                from Cui in _db.CuidadClientes
                                where Cli.provincia_cliente == Prov.id_provincia && Cli.cuidad_cliente == Cui.id_cuidad
                                orderby Cli.cuidad_cliente
                                select new Catalogo
                                {
                                    ClienteId = Cli.id_cliente,
                                    Cliente = Cli.nombre_cliente,
                                    Ruc = Cli.ruc_cliente,
                                    Direccion = Cli.direccion_cliente,
                                    Contacto = Cli.contacto1_cliente,
                                    Estado = Cli.estado_cliente ? "Activo" : "Inactivo",
                                    Cuidad = Cui.nombre_cuidad,
                                    Provincia = Prov.nombre_provincia
                                    
                                };


                return __cliente.ToList();

              
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<Catalogo> FunGetClientesEquipo(int id)
        {
            try
            {
                var __cliente = from cli in _db.Clientes
                                where cli.id_cliente == id
                               
                                select new Catalogo
                                {
                                    ClienteId = cli.id_cliente,
                                    Cliente = cli.nombre_cliente,
                                    Telefono = cli.telefono1_cliente,
                                    Celular = cli.celular1_cliente,
                                    Contacto = cli.contacto1_cliente
                                };


                return __cliente.ToList();


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<CabeceraDetalle> FunGetCabDet(string _nombre)
        {

            try
            {
                var _query = from cab in _db.CabeceraEquipos
                             join det in _db.DetalleEquipos on cab.id_cabecera equals det.id_cabecera
                             where cab.nombre_cabecera == _nombre
                             select new CabeceraDetalle
                             {
                                 CodId = det.valor_detalle,
                                 Detalle = det.nombre_detalle
                             };
                return _query.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public DataSet FunGrabarEquipos(int tipo, int clieId, string grupo, string marca, string equipo, string modelo, string refri,
            string serie, string voltaje, string amperaje, string presion, string estado, int usuario, string terminal, string conexion)
        {

            try
            {

                using (SqlConnection _conexion = new SqlConnection(conexion))
                {
                    using (SqlCommand _command = new SqlCommand())
                    {
                        _command.Connection = _conexion;
                        _command.CommandTimeout = 9000;
                        _command.CommandType = CommandType.StoredProcedure;
                        _command.CommandText = "sp_InsertarEquipo";
                        _command.Parameters.AddWithValue("@in_tipo", tipo);
                        _command.Parameters.AddWithValue("@in_clienteid", clieId);
                        _command.Parameters.AddWithValue("@e_grupo", grupo);
                        _command.Parameters.AddWithValue("@e_marca", marca);
                        _command.Parameters.AddWithValue("@e_nombre", equipo);
                        _command.Parameters.AddWithValue("@e_modelo", modelo);
                        _command.Parameters.AddWithValue("@e_refrig", refri);
                        _command.Parameters.AddWithValue("@e_serie", serie);
                        _command.Parameters.AddWithValue("@e_voltaje", voltaje);
                        _command.Parameters.AddWithValue("@e_amperaje", amperaje);
                        _command.Parameters.AddWithValue("@e_presion", presion);
                        _command.Parameters.AddWithValue("@e_estado", estado);
                        _command.Parameters.AddWithValue("@e_usuario", usuario);
                        _command.Parameters.AddWithValue("@e_terminal", terminal);
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

    }
}
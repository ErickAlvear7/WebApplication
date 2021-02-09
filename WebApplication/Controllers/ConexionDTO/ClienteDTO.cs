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

        public DataSet FunGrabarEquipos(int tipo, int clieid, int equipoid, string grupo, string marca, string equipo, string modelo, string refri,
    string serie, string voltaje, string amperaje, string presion, string estado, int usuario, string terminal,
    string auxv1, string auxv2, string auxv3, int auxi1, int auxi2, int auxi3, string conexion)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conexion))
                {
                    using (SqlCommand comm = new SqlCommand())
                    {
                        comm.Connection = con;
                        comm.CommandTimeout = 9000;
                        comm.CommandType = CommandType.StoredProcedure;
                        comm.CommandText = "sp_InsertarEquipo";
                        comm.Parameters.AddWithValue("@in_tipo", tipo);
                        comm.Parameters.AddWithValue("@in_clieid", clieid);
                        comm.Parameters.AddWithValue("@in_equipoid", equipoid);
                        comm.Parameters.AddWithValue("@in_grupo", grupo);
                        comm.Parameters.AddWithValue("@in_marca", marca);
                        comm.Parameters.AddWithValue("@in_equipo", equipo);
                        comm.Parameters.AddWithValue("@in_modelo", modelo);
                        comm.Parameters.AddWithValue("@in_refrigera", refri);
                        comm.Parameters.AddWithValue("@in_serie", serie);
                        comm.Parameters.AddWithValue("@in_voltaje", voltaje);
                        comm.Parameters.AddWithValue("@in_amperaje", amperaje);
                        comm.Parameters.AddWithValue("@in_presion", presion);
                        comm.Parameters.AddWithValue("@in_estado", estado);
                        comm.Parameters.AddWithValue("@in_usuario", usuario);
                        comm.Parameters.AddWithValue("@in_terminal", terminal);
                        comm.Parameters.AddWithValue("@in_auxv1", auxv1);
                        comm.Parameters.AddWithValue("@in_auxv2", auxv2);
                        comm.Parameters.AddWithValue("@in_auxv3", auxv3);
                        comm.Parameters.AddWithValue("@in_auxi1", auxi1);
                        comm.Parameters.AddWithValue("@in_auxi2", auxi2);
                        comm.Parameters.AddWithValue("@in_auxi3", auxi3);

                        _dataAdapter.SelectCommand = comm;
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

        public List<Equipo> FunGetEquipos(int clieid)
        {
            var _query = from equipos in _db.Equipos
                         where equipos.id_cliente == clieid
                         select new Equipo
                         {
                             ArryEquipoId = equipos.id_equipo,
                             ArryGrupoId = equipos.grupo_equipo,
                             ArryGrupo = (from detalle in _db.DetalleEquipos
                                          join cabecera in _db.CabeceraEquipos on detalle.id_cabecera equals (cabecera.id_cabecera)
                                          where cabecera.nombre_cabecera == "GRUPO" &&
                                          detalle.valor_detalle == equipos.grupo_equipo
                                          select detalle.nombre_detalle).FirstOrDefault(),
                             ArryMarcaId = equipos.marca_quipo,
                             ArryMarca = (from detalle in _db.DetalleEquipos
                                          join cabecera in _db.CabeceraEquipos on detalle.id_cabecera equals (cabecera.id_cabecera)
                                          where cabecera.nombre_cabecera == "MARCA" &&
                                          detalle.valor_detalle == equipos.marca_quipo
                                          select detalle.nombre_detalle).FirstOrDefault(),
                             ArryModeloId = equipos.modelo_equipo,
                             ArryEquipo = equipos.nombre_equipo,
                             ArryModelo = (from detalle in _db.DetalleEquipos
                                           join cabecera in _db.CabeceraEquipos on detalle.id_cabecera equals (cabecera.id_cabecera)
                                           where cabecera.nombre_cabecera == "MODELO" &&
                                           detalle.valor_detalle == equipos.modelo_equipo
                                           select detalle.nombre_detalle).FirstOrDefault(),
                             ArrySerie = equipos.serie_equipo,
                             ArryVoltaje = equipos.voltaje_equipo,
                             ArryAmperaje = equipos.amperaje_equipo,
                             ArryPresion = equipos.presion_equipo,
                             ArryEstado = equipos.estado_equipo == true ? "Activo" : "Inactivo"
                         };

            return _query.ToList();
        }


    }
}
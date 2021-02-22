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
        #region Variables

        
        BDD_HRVEntities _db = new BDD_HRVEntities();

        DataSet _dataSet = new DataSet();
        SqlDataAdapter _dataAdapter = new SqlDataAdapter();
        #endregion

        #region FuncionObtenerClientes


        public List<Catalogo> FunGetClientes()
        {
            try
            {
                var __cliente = from cliente in _db.Clientes
                                from provincia in _db.ProvinciaClientes
                                from cuidad in _db.CuidadClientes
                                where cliente.provincia_cliente == provincia.id_provincia && cliente.cuidad_cliente == cuidad.id_cuidad
                                orderby cliente.cuidad_cliente
                                select new Catalogo
                                {
                                    ClienteId = cliente.id_cliente,
                                    Cliente = cliente.nombre_cliente,
                                    Ruc = cliente.ruc_cliente,
                                    Direccion = cliente.direccion_cliente,
                                    Contacto = cliente.contacto1_cliente,
                                    Estado = cliente.estado_cliente ? "Activo" : "Inactivo",
                                    Cuidad = cuidad.nombre_cuidad,
                                    Provincia = provincia.nombre_provincia
                                    
                                };


                return __cliente.ToList();

              
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region FuncionObtenerClienteEquipo

        
        public List<Catalogo> FunGetClientesEquipo(int id)
        {
            try
            {
                var __cliente = from cliente in _db.Clientes
                                where cliente.id_cliente == id
                               
                                select new Catalogo
                                {
                                    ClienteId = cliente.id_cliente,
                                    Cliente = cliente.nombre_cliente,
                                    Telefono = cliente.telefono1_cliente,
                                    Celular = cliente.celular1_cliente,
                                    Contacto = cliente.contacto1_cliente,
                                    Direccion = cliente.direccion_cliente
                                };


                return __cliente.ToList();


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region FuncionObtenerCabeceraDetalle

       
        public List<CabeceraDetalle> FunGetCabDet(string _nombre)
        {

            try
            {
                var _query = from cabecera in _db.CabeceraEquipos
                             join detalle in _db.DetalleEquipos on cabecera.id_cabecera equals detalle.id_cabecera
                             where cabecera.nombre_cabecera == _nombre
                             select new CabeceraDetalle
                             {
                                 CodId = detalle.valor_detalle,
                                 Detalle = detalle.nombre_detalle
                             };
                return _query.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion

        #region FuncionGrabarEquipos

        
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
        #endregion

        #region FuncionObtenerEquipo

        
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
        #endregion

        #region FuncionObtenerEquipoClientes

        public List<CabeceraDetalle> FunGetEquipoClientes(int clieid)
        {
            var _query = from equipos in _db.Equipos
                         where equipos.id_cliente == clieid
                         select new CabeceraDetalle
                         {
                             CodId = equipos.id_equipo.ToString(),
                             Detalle = equipos.nombre_equipo
                         };
            return _query.ToList();
        }
        #endregion

        #region FunObneterTecnicos
        public List<CabeceraDetalle> FunGetTecnicos()
        {
            var _query = from user in _db.Usuarios
                         join perfil in _db.Perfiles on user.id_perfil equals perfil.id_perfil
                         where perfil.nombre_perfil == "Tecnico"
                         select new CabeceraDetalle
                         {
                             CodId = user.id_usuario.ToString(),
                             Detalle = user.nombre_usuario + " " + user.apellido_usuario
                         };

            return _query.ToList();
        }
        #endregion

        #region FuncionGrabarOT
        public void FunGrabarOT(OrdenesTrabajo _orden)
        {
            using (BDD_HRVEntities _db = new BDD_HRVEntities())
            {
                _db.OrdenesTrabajo.Add(_orden);
                _db.SaveChanges();
            }
        }

        #endregion

        #region FuncionObtenerOrdenTrabajoCliente

        public List<OrdenIndex> FunGetOrdenCliente()
        {
            var _query = from orden in _db.OrdenesTrabajo

                         join equipo in _db.Equipos on orden.id_equipo equals equipo.id_equipo

                         select new OrdenIndex

                         {

                             Cliente = (from cliente in _db.Clientes

                                        where cliente.id_cliente == equipo.id_cliente

                                        select cliente.nombre_cliente).FirstOrDefault(),

                             Equipo = equipo.nombre_equipo,

                             TipoTrabajo = (from detalle in _db.DetalleEquipos

                                            join cabecera in _db.CabeceraEquipos on detalle.id_cabecera equals (cabecera.id_cabecera)

                                            where cabecera.nombre_cabecera == "Tipo Trabajo" &&

                                            detalle.valor_detalle == orden.orden_tipotrabajo

                                            select detalle.nombre_detalle).FirstOrDefault(),

                             Estado = (from detalle in _db.DetalleEquipos

                                       join cabecera in _db.CabeceraEquipos on detalle.id_cabecera equals (cabecera.id_cabecera)

                                       where cabecera.nombre_cabecera == "ESTADO ORDEN" &&

                                       detalle.valor_detalle == orden.orden_estado

                                       select detalle.nombre_detalle).FirstOrDefault(),

                             Problema = orden.orden_problema,

                             FechaInicio = orden.orden_fechainicio

                         };



            return _query.ToList();


        }
        #endregion
    }
}
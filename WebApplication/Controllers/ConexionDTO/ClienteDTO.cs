using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class ClienteDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();

        DataSet _dataSet = new DataSet();


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

    }
}
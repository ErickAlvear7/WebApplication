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
                                    Cuidad = Cui.nombre_cuidad
                                };


                return __cliente.ToList();

              
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
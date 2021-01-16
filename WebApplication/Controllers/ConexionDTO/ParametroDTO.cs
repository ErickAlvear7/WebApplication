using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class ParametroDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();

        public void FunGrabarNuevo(CabeceraEquipos _cabecera)
        {
            try
            {

                using(BDD_HRVEntities _db = new BDD_HRVEntities())
                {
                    _db.CabeceraEquipos.Add(_cabecera);
                    _db.SaveChanges();
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Cabecera> FunGetCabecera()
        {
            try
            {
                var __parametro = from Cabecera in _db.CabeceraEquipos
                                  
                                select new Cabecera
                                {
                                    CabeceraId = Cabecera.id_cabecera,
                                    Nombre = Cabecera.nombre_cabecera,
                                    Descripcion = Cabecera.descripcion_cabecera,
                                    Estado = Cabecera.estado_cabecera ? "Activo" : "Inactivo",
                                   
                                };


                return __parametro.ToList();


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
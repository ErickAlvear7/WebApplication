using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Web;
using WebApplication.Models;

namespace WebApplication.Controllers.ConexionDTO
{
    public class ParametroDTO
    {
        BDD_HRVEntities _db = new BDD_HRVEntities();
        string _mensaje;
        int _codigo;

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

        public string FunGrabarEditar(CabeceraEquipos _cabecera)
        {
            try
            {
                using (BDD_HRVEntities _db = new BDD_HRVEntities())
                {
                    //var dtbase = new Base_TitulacionEntities();
                    _db.CabeceraEquipos.Add(_cabecera);
                    _db.Entry(_cabecera).State = System.Data.Entity.EntityState.Modified;

                    foreach (DetalleEquipos _detalle in _cabecera.DetalleEquipos)
                    {
                        if (_detalle.id_detalle == 0) _db.Entry(_detalle).State = System.Data.Entity.EntityState.Added;
                        else _db.Entry(_detalle).State = System.Data.Entity.EntityState.Modified;
                    }

                    _db.SaveChanges();
                    _mensaje = "OK";

                }
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var validationErrors in ex.EntityValidationErrors)

                {

                    foreach (var validationError in validationErrors.ValidationErrors)

                    {

                        Trace.TraceInformation("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);

                    }

                }

                _mensaje = ex.ToString();

                
            }

            return _mensaje;
        }

        public int FunGetParametroDetalle(int pacaid, int padeid)
        {
            using (BDD_HRVEntities _db = new BDD_HRVEntities())
            {             

                List<DetalleEquipos> _lista = _db.DetalleEquipos.Where(d => d.id_cabecera == pacaid && d.id_detalle == padeid).ToList();

                if (_lista.Count == 0) _codigo = 0;
                else _codigo = 1;

                return _codigo;

            }
        }
    }
}
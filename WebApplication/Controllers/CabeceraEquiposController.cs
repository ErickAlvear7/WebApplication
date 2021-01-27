using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class CabeceraEquiposController : Controller
    {
        string _mensaje;
        private BDD_HRVEntities db = new BDD_HRVEntities();

        // GET: CabeceraEquipos
        public ActionResult Index()
        {
            ViewBag.Title = "Cabecere";
            List<Cabecera> _parametros = new ParametroDTO().FunGetCabecera();
            return View(_parametros);
        }

     

        // GET: CabeceraEquipos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CabeceraEquipos/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
     
        public ActionResult Create(string parametro,string descripcion,bool estado,List<Detalle> detalles)
        {
            //var _estado = estado == "Activo" ? true : false;
            CabeceraEquipos _cabecera = new CabeceraEquipos();
            {
                _cabecera.nombre_cabecera = parametro;
                _cabecera.descripcion_cabecera = descripcion;
                _cabecera.estado_cabecera = estado;
                _cabecera.creacion_cabecera = DateTime.Now;
                _cabecera.usuario_cabecera = int.Parse(Session["_UsuarioId"].ToString());
                _cabecera.terminal_cabecera = Session["_Host"].ToString();
                _cabecera.modificacion_cabecera = DateTime.Now;
                _cabecera.usuariomod_cabecera = int.Parse(Session["_UsuarioId"].ToString());
                _cabecera.terminalmod_cabecera = Session["_Host"].ToString();
                _cabecera.aux1_cabecera = 0;
                _cabecera.aux2_cabecera = 0;
                _cabecera.aux3_cabecera = "";
                _cabecera.aux4_cabecera = "";

            }

           

            foreach (var _item in detalles)
            {
                //var _estadoDe = _item.ArryEstado == "Activo" ? true : false;
                _cabecera.DetalleEquipos.Add(new DetalleEquipos()
                {
                  
                    nombre_detalle = _item.ArryPadeNombre,
                    valor_detalle = _item.ArryPadeValorV,
                    valor_detallei = _item.ArryPadeValorI,
                    estado_detalle = _item.ArryEstado,
                    aux3_detalle = "",
                    aux4_detalle =""

                }); 
            }

            new ParametroDTO().FunGrabarNuevo(_cabecera);
            TempData["Mensaje"] = "ok";

            return Json(new { success = true, miUrl = Url.Action("Index", "CabeceraEquipos") });
        }

        // GET: CabeceraEquipos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CabeceraEquipos cabeceraEquipos = db.CabeceraEquipos.Find(id);
            if (cabeceraEquipos == null)
            {
                return HttpNotFound();
            }
            ViewBag.Estado = cabeceraEquipos.estado_cabecera ? "Activo" : "Inactivo";
            ViewBag.Descripcion = cabeceraEquipos.descripcion_cabecera;
            return View(cabeceraEquipos);
        }

        // POST: CabeceraEquipos/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Edit(int id,string nomparametro,string descripcion,string estadocab, List<Detalle> detalleparametros)
        {
            try
            {
                var _estado = estadocab == "Activo" ? true : false;

                using (BDD_HRVEntities _db = new BDD_HRVEntities())
                {

                    CabeceraEquipos _cab = _db.CabeceraEquipos.AsNoTracking().Where(c => c.id_cabecera == id).FirstOrDefault();
                    _cab.nombre_cabecera = nomparametro;
                    _cab.descripcion_cabecera = descripcion;
                    _cab.estado_cabecera = _estado;
                    _cab.modificacion_cabecera = DateTime.Now;
                    _cab.usuariomod_cabecera = int.Parse(Session["_UsuarioId"].ToString());
                    _cab.terminalmod_cabecera = Session["_Host"].ToString();



                    foreach (var _item in detalleparametros)
                    {
                        if (!string.IsNullOrEmpty(_item.ArryPadeNombre))
                        {
                            if (new ParametroDTO().FunGetParametroDetalle(id, _item.ArryId) == 0)
                            {
                                _cab.DetalleEquipos.Add(new DetalleEquipos()
                                {
                                    id_cabecera = id,
                                    id_detalle = _item.ArryId,
                                    nombre_detalle = _item.ArryPadeNombre,
                                    valor_detalle = _item.ArryPadeValorV == null ? "" : _item.ArryPadeValorV,
                                    valor_detallei = _item.ArryPadeValorI,
                                    estado_detalle = _item.ArryEstado,
                                    aux3_detalle = "",
                                    aux4_detalle = ""

                                });
                            }
                            else
                            {
                                DetalleEquipos _detalle = _cab.DetalleEquipos.Where(d => d.id_detalle == _item.ArryId).FirstOrDefault();
                                _detalle.nombre_detalle = _item.ArryPadeNombre;
                                _detalle.valor_detalle = _item.ArryPadeValorV == null ? "" : _item.ArryPadeValorV;
                                _detalle.valor_detallei = _item.ArryPadeValorI;
                                _detalle.estado_detalle = _item.ArryEstado;
                            }
                        }
                        
                        
                    }
                    _mensaje = new ParametroDTO().FunGrabarEditar(_cab);
                }


                if (_mensaje == "OK")
                {
                    TempData["Mensaje"] = "OK";
                    return Json(new { success = true, miUrl = Url.Action("Index", "CabeceraEquipos") });
                }
                else
                {
                    return Json(new { success = false, miUrl = "ERROR" });
                }         

            }
            catch (Exception ex)
            {

                throw ex;
            }                     
              
                           
        }

        // GET: CabeceraEquipos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CabeceraEquipos cabeceraEquipos = db.CabeceraEquipos.Find(id);
            if (cabeceraEquipos == null)
            {
                return HttpNotFound();
            }
            return View(cabeceraEquipos);
        }

        // POST: CabeceraEquipos/Delete/5
        [HttpPost, ActionName("Delete")]
    
        public ActionResult DeleteConfirmed(int id)
        {
            if(new ParametroDTO().FunGetParametro(id)==0)
            {
                CabeceraEquipos cabeceraEquipos = db.CabeceraEquipos.Find(id);
                db.CabeceraEquipos.Remove(cabeceraEquipos);
                db.SaveChanges();
                return Json(new { success = true, mensaje = "borrrado con exito" });
            }
            else
            {
                return Json(new { success = false, mensaje = "no se puede eliminar existen detalles asociados..!!" });
            }
   
           
        }

        [HttpPost]
        public ActionResult DeleteDetalle(int idCab, int idDet)
        {
            var _eliminar = db.DetalleEquipos.SingleOrDefault(pd => pd.id_cabecera == idCab && pd.id_detalle == idDet);
            if(_eliminar != null)
            {
                db.DetalleEquipos.Remove(_eliminar);
                db.SaveChanges();
                return Json(new { success = true, mensaje = "borrrado con exito" });
            }
            else
            {
                return Json(new { success = false, mensaje = "error" });
            }
            //DetalleEquipos _detalleEquipos = db.DetalleEquipos.Find(id);
            //db.DetalleEquipos.Remove(_detalleEquipos);
            //db.SaveChanges();
         
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

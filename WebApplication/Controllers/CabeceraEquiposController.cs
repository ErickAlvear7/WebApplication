using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class CabeceraEquiposController : Controller
    {
        private BDD_HRVEntities db = new BDD_HRVEntities();

        // GET: CabeceraEquipos
        public ActionResult Index()
        {
            ViewBag.Title = "Cabecere";
            List<Cabecera> _parametros = new ParametroDTO().FunGetCabecera();
            return View(_parametros);
        }

        // GET: CabeceraEquipos/Details/5
        public ActionResult Details(int? id)
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

        // GET: CabeceraEquipos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CabeceraEquipos/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create(string parametro,string descripcion,bool estado,List<Detalle> detalles)
        {
           
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
            ViewBag.Descripcion = cabeceraEquipos.descripcion_cabecera;
            return View(cabeceraEquipos);
        }

        // POST: CabeceraEquipos/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id_cabecera,nombre_cabecera,descripcion_cabecera,estado_cabecera,creacion_cabecera,usuario_cabecera,terminal_cabecera,modificacion_cabecera,usuariomod_cabecera,terminalmod_cabecera,aux1_cabecera,aux2_cabecera,aux3_cabecera,aux4_cabecera")] CabeceraEquipos cabeceraEquipos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cabeceraEquipos).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cabeceraEquipos);
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
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CabeceraEquipos cabeceraEquipos = db.CabeceraEquipos.Find(id);
            db.CabeceraEquipos.Remove(cabeceraEquipos);
            db.SaveChanges();
            return RedirectToAction("Index");
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

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class PerfilesController : Controller
    {
        private BDD_HRVEntities db = new BDD_HRVEntities();
        DataSet _datSet = new DataSet();
        int _perfilId = 0;

        // GET: Perfiles
        public ActionResult Index()
        {
            List<Perfi> _listaPerfiles = new List<Perfi>();
            _listaPerfiles = new SeguridadDTO().FunGetPerfiles();
            return View(_listaPerfiles);
        }


        // GET: Perfiles/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Perfiles/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create( Perfiles perfiles)
        {

                perfiles.creacion_perfil = DateTime.Now;

            _perfilId = new SeguridadDTO().FunConsultaPerfil(perfiles.nombre_perfil);

            if(_perfilId == 0)
            {
                db.Perfiles.Add(perfiles);
                db.SaveChanges();
       
                _datSet = new SeguridadDTO().FunConsultaPerfil(0, "", Session["_conexion"].ToString());
                var _datos = _datSet.Tables[0].AsEnumerable().Select(p => new
                {
                    IdPerfil = p[0].ToString(),
                    Perfil = p[1].ToString(),
                    Estado = p[2].ToString()
                });

                return Json(new { success = true, data = _datos, mesagge = "agregado correctamente", nameclass = "success" }, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return Json(new { success = false, data = "", mesagge = "perfil ya existe", nameclass = "success" }, JsonRequestBehavior.AllowGet);
            }
                         
        }

        // GET: Perfiles/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Perfiles perfiles = db.Perfiles.Find(id);
            if (perfiles == null)
            {
                return HttpNotFound();
            }
            return View(perfiles);
        }

        // POST: Perfiles/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id_perfil,nombre_perfil,estado_perfil,aux_peri,aux_perii,creacion_perfil")] Perfiles perfiles)
        {
            if (ModelState.IsValid)
            {
                db.Entry(perfiles).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(perfiles);
        }

        // GET: Perfiles/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Perfiles perfiles = db.Perfiles.Find(id);
            if (perfiles == null)
            {
                return HttpNotFound();
            }
            return View(perfiles);
        }

        // POST: Perfiles/Delete/5
        [HttpPost, ActionName("Delete")]
     
        public ActionResult DeleteConfirmed(int id)
        {
            Perfiles perfiles = db.Perfiles.Find(id);
            db.Perfiles.Remove(perfiles);
            db.SaveChanges();
            return Json(new { success = true, mesagge = "perfil eliminado", nameclass = "success" }, JsonRequestBehavior.AllowGet);
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

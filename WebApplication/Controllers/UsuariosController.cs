using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class UsuariosController : Controller
    {
        private BDD_HRVEntities db = new BDD_HRVEntities();
        DataSet _data = new DataSet();

        // GET: Usuarios
        public ActionResult Index()
        {
            List<User> _listaUsuarios = new List<User>();
            _listaUsuarios = new SeguridadDTO().FunGetUsuarios();   
         
            return View(_listaUsuarios);
        }

        // GET: Usuarios/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Usuarios usuarios = db.Usuarios.Find(id);
            if (usuarios == null)
            {
                return HttpNotFound();
            }
            return View(usuarios);
        }

        // GET: Usuarios/Create
        public ActionResult Create()
        {
            ViewBag.id_perfil = new SelectList(db.Perfiles, "id_perfil", "nombre_perfil");
            return View();
        }

        // POST: Usuarios/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create(Usuarios usuarios)
        {
            usuarios.creacion_usuario = DateTime.Now;
            //if (ModelState.IsValid)
            //{             
              
            //}

            db.Usuarios.Add(usuarios);
            db.SaveChanges();

            _data = new SeguridadDTO().FunConsultaDatos(0, 0, "", "", Session["_conexion"].ToString());
            var _datos = _data.Tables[0].AsEnumerable().Select(u=> new { UserId =u[0].ToString(), Perfil=u[1].ToString(), 
                         Usuario=u[2].ToString(), Login=u[3].ToString(),Estado=u[4].ToString() });

            return Json(new { success = true, data = _datos, mesagge = "agregado correctamente", nameclass = "success" }, JsonRequestBehavior.AllowGet);


            //return RedirectToAction("Index");

            //ViewBag.id_perfil = new SelectList(db.Perfiles, "id_perfil", "nombre_perfil", usuarios.id_perfil);
            //return View(usuarios);
        }

        // GET: Usuarios/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Usuarios usuarios = db.Usuarios.Find(id);

            if (usuarios == null)
            {
                return HttpNotFound();
            }

            ViewBag.id_perfil = new SelectList(db.Perfiles, "id_perfil", "nombre_perfil", usuarios.id_perfil);
            return View(usuarios);
        }

        // POST: Usuarios/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id_usuario,id_perfil,nombre_usuario,apellido_usuario,login_usuario,password_usuario,estado_usuario,aux_usui,aux_usuii,creacion_usuario")] Usuarios usuarios)
        {
            if (ModelState.IsValid)
            {
                db.Entry(usuarios).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.id_perfil = new SelectList(db.Perfiles, "id_perfil", "nombre_perfil", usuarios.id_perfil);
            return View(usuarios);
        }

        // GET: Usuarios/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Usuarios usuarios = db.Usuarios.Find(id);
            if (usuarios == null)
            {
                return HttpNotFound();
            }
            return View(usuarios);
        }

        // POST: Usuarios/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Usuarios usuarios = db.Usuarios.Find(id);
            db.Usuarios.Remove(usuarios);
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

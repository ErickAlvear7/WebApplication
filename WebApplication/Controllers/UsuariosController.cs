using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class UsuariosController : Controller
    {
        private BDD_HRVEntities db = new BDD_HRVEntities();
        DataSet _data = new DataSet();
        int _codigoId = 0;

        // GET: Usuarios
        public ActionResult Index()
        {
            List<User> _listaUsuarios = new List<User>();
            _listaUsuarios = new SeguridadDTO().FunGetUsuarios();   
         
            return View(_listaUsuarios);
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
           
            _codigoId = new SeguridadDTO().FunConsulataLogin(usuarios.login_usuario);

            if (_codigoId == 0)
            {
                db.Usuarios.Add(usuarios);
                db.SaveChanges();


                _data = new SeguridadDTO().FunConsultaDatos(0, 0, "", "", Session["_conexion"].ToString());
                var _datos = _data.Tables[0].AsEnumerable().Select(u => new {
                    UserId = u[0].ToString(),
                    Perfil = u[1].ToString(),
                    Usuario = u[2].ToString(),
                    Login = u[3].ToString(),
                    Estado = u[4].ToString()
                });

                return Json(new { success = true, data = _datos, mesagge = "agregado correctamente", nameclass = "success" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, data = "", mesagge = "usuario ya existe", nameclass = "error" }, JsonRequestBehavior.AllowGet);
            }
                      
        }

        // GET: Usuarios/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Usuarios usuarios = db.Usuarios.Find(id);

            usuarios.password_usuario = usuarios.password_usuario.Trim();

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
    
        public ActionResult Edit(string login, int perfilId, string nombre, string apellido, string contra,
            string estado, string loginAnt)
        {
            _data = new SeguridadDTO().FunUpdateUsuario(loginAnt, login, perfilId, nombre, apellido, contra, estado, Session["_conexion"].ToString());

            _data = new SeguridadDTO().FunConsultaDatos(1, 0, login, "", Session["_conexion"].ToString());
            var _datos = _data.Tables[0].AsEnumerable().Select(u => new {
                UserId = u[0].ToString(),
                Perfil = u[1].ToString(),
                Usuario = u[2].ToString(),
                Login = u[3].ToString(),
                Estado = u[4].ToString()
            });

            return Json(new { success = true, data = _datos, mesagge = "modificado correctamente", nameclass = "info" }, JsonRequestBehavior.AllowGet);

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
      
        public ActionResult DeleteConfirmed(string id)
        {
            Usuarios usuarios = db.Usuarios.Find(id);
            db.Usuarios.Remove(usuarios);
            db.SaveChanges();
            return Json(new { success = true,  mesagge = "registro eliminado", nameclass = "success" }, JsonRequestBehavior.AllowGet);
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

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
    public class ClientesController : Controller
    {
        private BDD_HRVEntities db = new BDD_HRVEntities();
        DataSet _data = new DataSet();
       

        // GET: Clientes
        public ActionResult Index()
        {
            ViewBag.Title = "Administrar Clientes";
          
            List<Clie> _listaClientes = new List<Clie>();
            _listaClientes = new ClienteDTO().FunGetClientes();

            return View(_listaClientes);
        }

        // GET: Clientes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Clientes clientes = db.Clientes.Find(id);
            if (clientes == null)
            {
                return HttpNotFound();
            }
            return View(clientes);
        }

        // GET: Clientes/Create
        public ActionResult Create()
        {
            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes, "id_cuidad", "nombre_cuidad");
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia");
            return View();
        }

        // POST: Clientes/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id_cliente,provincia_cliente,cuidad_cliente,nombre_cliente,ruc_cliente,direccion_cliente,telefono1_cliente,telefono2_cliente,email_cliente,web_cliente,contacto1_cliente,celular1_cliente,contacto2_cliente,celular2_cliente,estado_cliente,aux1_cliente,aux2_cliente")] Clientes clientes)
        {
            if (ModelState.IsValid)
            {
                db.Clientes.Add(clientes);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes, "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia", clientes.provincia_cliente);
            return View(clientes);
        }

        // GET: Clientes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Clientes clientes = db.Clientes.Find(id);
            if (clientes == null)
            {
                return HttpNotFound();
            }
            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes, "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia", clientes.provincia_cliente);
            return View(clientes);
        }

        // POST: Clientes/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id_cliente,provincia_cliente,cuidad_cliente,nombre_cliente,ruc_cliente,direccion_cliente,telefono1_cliente,telefono2_cliente,email_cliente,web_cliente,contacto1_cliente,celular1_cliente,contacto2_cliente,celular2_cliente,estado_cliente,aux1_cliente,aux2_cliente")] Clientes clientes)
        {
            if (ModelState.IsValid)
            {
                db.Entry(clientes).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes, "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia", clientes.provincia_cliente);
            return View(clientes);
        }

        // GET: Clientes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Clientes clientes = db.Clientes.Find(id);
            if (clientes == null)
            {
                return HttpNotFound();
            }
            return View(clientes);
        }

        // POST: Clientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Clientes clientes = db.Clientes.Find(id);
            db.Clientes.Remove(clientes);
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

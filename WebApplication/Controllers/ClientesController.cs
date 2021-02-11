﻿using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
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
          
            List<Catalogo> _listaClientes = new List<Catalogo>();
            _listaClientes = new ClienteDTO().FunGetClientes();

            return View(_listaClientes);
        }
 
        // GET: Clientes/Create
        public ActionResult Create()
        {
           
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia");
          
            List<SelectListItem> _cuidades = new List<SelectListItem>()
            {
                new SelectListItem(){Value="0",Text="--Seleccione Cuidad--"},
            };
            ViewBag.Cuidad = _cuidades;
            return View();
        }

        public ActionResult FunFillCuidad(int pro)
        {
            var _cuidad = db.CuidadClientes.Where(c=>c.id_provincia==pro).Select(c => new { CuidadId = c.id_cuidad, Cuidad = c.nombre_cuidad }).ToList();
            return Json(data: _cuidad, JsonRequestBehavior.AllowGet);
        }

        // POST: Clientes/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create(Clientes clientes)
        {
            if (ModelState.IsValid)
            {
                db.Clientes.Add(clientes);
                db.SaveChanges();
                TempData["Mensaje"] = "ok";
                return Json(new { success = true, redirectToUrl = Url.Action("Index", "Clientes") });

            }
            else
            {
                return Json(new { success = false, mensaje = "error" });
            }
                          
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
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia", clientes.provincia_cliente);
        
            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes.Where(c=>c.id_provincia==clientes.provincia_cliente), "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);
          
            return View(clientes);
        }

        // POST: Clientes/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Edit(Clientes clientes)
        {
            if (ModelState.IsValid)
            {
                db.Entry(clientes).State = EntityState.Modified;
                db.SaveChanges();
                TempData["Mensaje"] = "ok";            
                return Json(new { success = true, redirectToUrl = Url.Action("Index", "Clientes") });
            }
            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes, "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);
            ViewBag.provincia_cliente = new SelectList(db.ProvinciaClientes, "id_provincia", "nombre_provincia", clientes.provincia_cliente);
        
            return Json(new { success = false, mensaje = "error" });
        }

      
        // POST: Clientes/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Clientes clientes = db.Clientes.Find(id);
            db.Clientes.Remove(clientes);
            db.SaveChanges();
            return Json(new { success = true, mesagge = "registro eliminado", nameclass = "success" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult EquipoCliente(int id)
        {
            List<Catalogo> _listaClientes = new List<Catalogo>();
            _listaClientes = new ClienteDTO().FunGetClientesEquipo(id);
            List<Equipo> _equipos = new ClienteDTO().FunGetEquipos(id);

            List<CabeceraDetalle> _grupo = new ClienteDTO().FunGetCabDet("Grupo");
            List<CabeceraDetalle> _marca = new ClienteDTO().FunGetCabDet("Marca");
            List<CabeceraDetalle> _modelo = new ClienteDTO().FunGetCabDet("Modelo");
            ViewBag.ClienteId = id;
            ViewBag.Equipos = _equipos;
            ViewBag.grupo_equipo = new SelectList(_grupo, "CodId", "Detalle",0);
            ViewBag.marca_equipo = new SelectList(_marca, "CodId", "Detalle", 0);
            ViewBag.modelo_equipo = new SelectList(_modelo, "CodId", "Detalle", 0);
            return View(_listaClientes);
        }

        [HttpPost]
        public ActionResult GuardarEquipoCliente(int clienteId, List<Equipo> equipos)
        {

            foreach (var item in equipos)
            {
                new ClienteDTO().FunGrabarEquipos(0, clienteId, item.ArryEquipoId, item.ArryGrupoId, item.ArryMarcaId, item.ArryEquipo, item.ArryModeloId,
                    "", item.ArrySerie ?? "", item.ArryVoltaje ?? "",
                    item.ArryAmperaje ?? "", item.ArryPresion ?? "", item.ArryEstado,
                    int.Parse(Session["_UsuarioId"].ToString()), Session["_Host"].ToString(), "", "", "", 0, 0, 0, Session["_conexion"].ToString());
            }
            TempData["Mensaje"] = "ok";
            return Json(new { success = true, miUrl = Url.Action("Index", "Clientes") });
        }
        [HttpGet]
        public ActionResult OrdenesTrabajo()
        {
            List<Catalogo> _cliente = new ClienteDTO().FunGetClientes();
            ViewBag.Cliente = new SelectList(_cliente, "ClienteId", "Cliente",0);
            List<SelectListItem> _equipos = new List<SelectListItem>() {
                new SelectListItem() { Value="0", Text="--Seleccione Equipo--" },
           };
            List<CabeceraDetalle> _trabajo = new ClienteDTO().FunGetCabDet("tipoTrabajo");
            ViewBag.Equipos = _equipos;
            ViewBag.TipoTrabajo = new SelectList(_trabajo, "CodId", "Detalle", 0);
            ViewBag.Tecnicos = new SelectList(db.Usuarios.Where(p=>p.Perfiles.nombre_perfil=="Tecnico"),"id_usuario","nombre_usuario");
            return View();
            
        }
        public ActionResult FunFillClientes(int cliid)
        {

            List<Catalogo> _cliente = new ClienteDTO().FunGetClientesEquipo(cliid);
            return Json(data: _cliente, JsonRequestBehavior.AllowGet);

        }

        public ActionResult FunFillEquipos(int cliid)
        {
            List<CabeceraDetalle> _equipos = new ClienteDTO().FunGetEquipoClientes(cliid);
            return Json(data: _equipos, JsonRequestBehavior.AllowGet);
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

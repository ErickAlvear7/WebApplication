using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class ClientesController : Controller
    {
        #region variables

        private BDD_HRVEntities db = new BDD_HRVEntities();
        DataSet _data = new DataSet();
        #endregion


        #region GET: Clientes
        public ActionResult Index()
        {
            ViewBag.Title = "Administrar Clientes";

            List<Catalogo> _listaClientes = new List<Catalogo>();
            _listaClientes = new ClienteDTO().FunGetClientes();

            return View(_listaClientes);
        }
        #endregion


        #region GET: Clientes/Create
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
        #endregion


        #region GET: Cuidades
        public ActionResult FunFillCuidad(int pro)
        {
            var _cuidad = db.CuidadClientes.Where(c => c.id_provincia == pro).Select(c => new { CuidadId = c.id_cuidad, Cuidad = c.nombre_cuidad }).ToList();
            return Json(data: _cuidad, JsonRequestBehavior.AllowGet);
        }
        #endregion


        #region POST: Clientes/Create
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
        #endregion


        #region GET: Clientes/Edit
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

            ViewBag.cuidad_cliente = new SelectList(db.CuidadClientes.Where(c => c.id_provincia == clientes.provincia_cliente), "id_cuidad", "nombre_cuidad", clientes.cuidad_cliente);

            return View(clientes);
        } 
        #endregion



        #region POST: Clientes/Edit
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
        #endregion



        #region POST: Clientes/Delete
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Clientes clientes = db.Clientes.Find(id);
            db.Clientes.Remove(clientes);
            db.SaveChanges();
            return Json(new { success = true, mesagge = "registro eliminado", nameclass = "success" }, JsonRequestBehavior.AllowGet);
        }
        #endregion


        #region GET: EquipoCliente

        [HttpGet]
        public ActionResult EquipoCliente(int id)
        {
            List<Catalogo> _listaClientes = new List<Catalogo>();
            _listaClientes = new ClienteDTO().FunGetClientesEquipo(id);
            List<Equipo> _equipos = new ClienteDTO().FunGetEquipos(id);

            List<CabeceraDetalle> _grupo = new ClienteDTO().FunGetCabDet("GRUPO");
            List<CabeceraDetalle> _marca = new ClienteDTO().FunGetCabDet("MARCA");
            List<CabeceraDetalle> _modelo = new ClienteDTO().FunGetCabDet("MODELO");
            ViewBag.ClienteId = id;
            ViewBag.Equipos = _equipos;
            ViewBag.grupo_equipo = new SelectList(_grupo, "CodId", "Detalle", 0);
            ViewBag.marca_equipo = new SelectList(_marca, "CodId", "Detalle", 0);
            ViewBag.modelo_equipo = new SelectList(_modelo, "CodId", "Detalle", 0);
            return View(_listaClientes);
        }
        #endregion


        #region POST: GuardarEquipoCliente
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
        #endregion


        #region GET: OrdenesTrabajo
        [HttpGet]
        public ActionResult OrdenesTrabajo()
        {

            List<Catalogo> _cliente = new ClienteDTO().FunGetClientes();
            ViewBag.Cliente = new SelectList(_cliente, "ClienteId", "Cliente", 0);
            List<SelectListItem> _equipos = new List<SelectListItem>() {
                new SelectListItem() { Value="0", Text="--Seleccione Equipo--" },
           };
            List<CabeceraDetalle> _trabajo = new ClienteDTO().FunGetCabDet("TIPO TRABAJO");
            List<CabeceraDetalle> _tecnico = new ClienteDTO().FunGetTecnicos();
            ViewBag.Equipos = _equipos;
            ViewBag.TipoTrabajo = new SelectList(_trabajo, "CodId", "Detalle", 0);
            ViewBag.Tecnicos = new SelectList(_tecnico, "CodId", "Detalle", 0);
            return View();

        }
        #endregion


        #region GET:Clientes
        public ActionResult FunFillClientes(int cliid)
        {

            List<Catalogo> _cliente = new ClienteDTO().FunGetClientesEquipo(cliid);
            return Json(data: _cliente, JsonRequestBehavior.AllowGet);

        }
        #endregion


        #region GET: Equipos
        public ActionResult FunFillEquipos(int cliid)
        {
            List<CabeceraDetalle> _equipos = new ClienteDTO().FunGetEquipoClientes(cliid);
            return Json(data: _equipos, JsonRequestBehavior.AllowGet);
        } 
        #endregion


        #region POST:GrabarOrdenTrabajo
        [HttpPost]
        public ActionResult GuardarOrdenTrabajo(int clienteid, int equipoid, string tipotrabajo, int operario, string problema, string nota,
            string fechaini, string fechafin)
        {
            try
            {
                OrdenesTrabajo _orden = new OrdenesTrabajo();
                {
                    _orden.id_equipo = equipoid;
                    _orden.orden_tipotrabajo = tipotrabajo;
                    _orden.orden_tecnico = operario;
                    _orden.orden_problema = problema;
                    _orden.orden_estado = "INI";
                    _orden.orden_notas = nota;
                    _orden.orden_fechainicio = DateTime.ParseExact(fechaini, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                    _orden.orden_fechafin = DateTime.ParseExact(fechafin, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
                    _orden.orden_auxvar = "";
                    _orden.orden_auxint = 0;

                }

                new ClienteDTO().FunGrabarOT(_orden);

                TempData["Mensaje"] = "OK";
                return Json(new { success = true, miUrl = Url.Action("OrdenIndex", "Clientes") });
            }
            catch (Exception ex)
            {

                throw ex;
            }

            

        }

        #endregion


        #region GET: OrdenIndex
        [HttpGet]
        public ActionResult OrdenIndex()
        {
            List<OrdenIndex> _orden = new ClienteDTO().FunGetOrdenCliente();

            return View(_orden);
        }

        [HttpGet]
        public ActionResult OrdenFinal()
        {
            ViewBag.Title = "ORDENES FINALIZADAS";
            List<OrdenFinalizadas> _orden = new ClienteDTO().FunGetOrdenFinalizadas();
            return View(_orden);
        }
        #endregion

        #region MostrarOrdenesFin
        [HttpGet]
        public ActionResult MostrarOrdenesFin(int id)
        {
            List<OrdenCabecera> _ordencab = new ClienteDTO().FunGeOrdenCabecera(id);

            ViewBag.TipoTrabajo = _ordencab.FirstOrDefault().TipoTrabajo;
            ViewBag.Imagen = _ordencab.FirstOrDefault().Imagen;
            List<OrdenesFinalizadas> _ordendetalle = new ClienteDTO().FunGetOrdenDetalle(id);

            return View(_ordendetalle);
        }
        #endregion


        #region Disponse
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        } 
        #endregion
    }
}

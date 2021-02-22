
using System.Configuration;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class LoginController : Controller
    {

        #region GET: Login
        public ActionResult Indexv1()
        {
            ViewBag.error = null;
            return View();
        } 
        #endregion

        #region POST: Login
        [HttpPost]
        public ActionResult Indexv1(string user, string pass)
        {
            Usuarios _usuario = new LoginDTO().FunGetUsuarios(user, pass);
            if (_usuario == null)
            {
                ViewBag.error = "error";
                return View();

            }
            else
            {
                Session["_conexion"] = ConfigurationManager.AppSettings["SqlConn"];
                Session["_UsuarioId"] = _usuario.id_usuario;
                Session["_Host"] = Request.UserHostName;
                return RedirectToAction("Index", "Menu");

            }
        } 
        #endregion
    }
}
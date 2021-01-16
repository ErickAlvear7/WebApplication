using System.Configuration;
using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Indexv1()
        {
            ViewBag.error = null;
            return View();
        }

        [HttpPost]
        public ActionResult Indexv1(string user, string pass)
        {
            Usuarios _usu = new LoginDTO().FunGetUsuarios(user, pass);
            if(_usu == null)
            {
                ViewBag.error = "error";
                return View();
                
            }
            else
            {
                Session["_conexion"] = ConfigurationManager.AppSettings["SqlConn"];
                Session["_UsuarioId"] = _usu.id_usuario;
                Session["_Host"] = Request.UserHostName;
                return RedirectToAction("Index", "Menu");
            
            }
        }
    }
}
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
            return View();
        }

        [HttpPost]
        public ActionResult Indexv1(string user, string pass)
        {
            Usuarios _usu = new LoginDTO().FunGetUsuarios(user, pass);
            if(_usu == null)
            {
                return View();
            }
            else
            {
                Session["_conexion"] = ConfigurationManager.AppSettings["SqlConn"];
                return RedirectToAction("Index", "Menu");
            }
        }
    }
}
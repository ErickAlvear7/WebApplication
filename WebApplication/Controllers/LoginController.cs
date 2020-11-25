using System.Web.Mvc;
using WebApplication.Controllers.ConexionDTO;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string user, string pass)
        {
            Usuarios _usu = new LoginDTO().FunGetUsuarios(user, pass);
            if(_usu == null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Menu");
            }
        }
    }
}
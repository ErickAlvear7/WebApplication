using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Controllers.ConexionDTO
{
    public class User
    {
        #region Variables
        public int UserId { get; set; }

        public string Perfil { get; set; }

        public string Usuario { get; set; }

        public string Login { get; set; }

        public string Estado { get; set; }

    }
    #endregion
}
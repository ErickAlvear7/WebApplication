using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Controllers.ConexionDTO
{
    public class Catalogo
    {
        public int ClienteId { get; set; }

        public string Cliente { get; set; }

        public string Ruc { get; set; }

        public string Direccion { get; set; }

        public string Contacto { get; set; }

        public string Estado { get; set; }

        public string Cuidad { get; set; }

    }

    public class Detalle
    {
        public string ArryPadeNombre { get; set; }

        public string ArryPadeValorV { get; set; }

        public int ArryPadeValorI { get; set; }

        public bool ArryEstado { get; set; }

    }

    public class Cabecera
    {

        public int CabeceraId { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public string Estado { get; set; }
    }

                   
}
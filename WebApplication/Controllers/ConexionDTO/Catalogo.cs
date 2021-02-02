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

        public string Telefono { get; set; }

        public string Celular { get; set; }

        public string Provincia { get; set; }

    }

    public class Detalle
    {
        public int ArryId { get; set; }

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

    public class CabeceraDetalle
    {
        public string CodId { get; set; }
        public string Detalle { get; set; }

    }

    public class Equipo
    {
        public string ArryGrupo { get; set; }
        public string ArryMarca { get; set; }
        public string ArryEquipo { get; set; }
        public string ArryModelo { get; set; }
        public string ArrySerie { get; set; }
        public string ArryVoltaje { get; set; }
        public string ArryAmperaje { get; set; }
        public string ArryPresion { get; set; }
        public string ArryEstado { get; set; }

    }




                   
}
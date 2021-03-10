using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication.Controllers.ConexionDTO
{
    #region CatalogoCliente


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
    #endregion

    #region CatalogoDetalle


    public class Detalle
    {
        public int ArryId { get; set; }

        public string ArryPadeNombre { get; set; }

        public string ArryPadeValorV { get; set; }

        public int ArryPadeValorI { get; set; }

        public bool ArryEstado { get; set; }

    }
    #endregion

    #region CatalogoCabecera


    public class Cabecera
    {

        public int CabeceraId { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public string Estado { get; set; }
    }
    #endregion

    #region CatalogoCabeceraDetalle


    public class CabeceraDetalle
    {
        public string CodId { get; set; }
        public string Detalle { get; set; }

    }
    #endregion

    #region CatalogoEquipo


    public class Equipo
    {
        public int ArryEquipoId { get; set; }
        public string ArryGrupoId { get; set; }
        public string ArryGrupo { get; set; }
        public string ArryMarcaId { get; set; }
        public string ArryMarca { get; set; }
        public string ArryEquipo { get; set; }
        public string ArryModeloId { get; set; }
        public string ArryModelo { get; set; }
        public string ArrySerie { get; set; }
        public string ArryVoltaje { get; set; }
        public string ArryAmperaje { get; set; }
        public string ArryPresion { get; set; }
        public string ArryEstado { get; set; }

    }
    #endregion

    #region CatalogoOrdenTrabajo

    public class OrdenIndex

    {
        public string Cliente { get; set; }

        public string Equipo { get; set; }

        public string TipoTrabajo { get; set; }

        public string Estado { get; set; }

        public string Problema { get; set; }



        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]

        public DateTime? FechaInicio { get; set; }

    }
    #endregion

    #region OrdnesFinalizadas
    public class OrdenFinalizadas

    {
        public int IdOrden { get; set; }
        public string Cliente { get; set; }
        public string Equipo { get; set; }
        public string Tecnico { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public string FechaInicioTr { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public string FechaFinTr { get; set; }

    }
    #endregion

    #region OrdenCabeceraDetalle
    public class OrdenCabecera
    {
        public string TipoTrabajo { get; set; }
        public string Imagen { get; set; }
    }

    public class OrdenesFinalizadas
    {
        public string TrabajosRealizados { get; set; }             
    }

    public class OrdenDetalle
    {
        public List<OrdenesFinalizadas> OrdenDet { get; set; }
    } 
    #endregion

}
//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Usuarios
    {
        public int id_usuario { get; set; }
        public int id_perfil { get; set; }
        public string nombre_usuario { get; set; }
        public string apellido_usuario { get; set; }
        public string login_usuario { get; set; }
        public string password_usuario { get; set; }
        public bool estado_usuario { get; set; }
        public Nullable<int> aux_usui { get; set; }
        public string aux_usuii { get; set; }
        public System.DateTime creacion_usuario { get; set; }
        public string imagen_usuario { get; set; }
    
        public virtual Perfiles Perfiles { get; set; }
    }
}

$(document).ready(function () {

    $("#btnNuevo").click(function (eve) {
        eve.preventDefault();
        $("#modal-content").load("/Perfiles/Create");
        $(".modal-title").text("Nuevo Perfil");
        $("#header").css("background-color", "#2F90F3");
        $("#header").css("color", "white");
        _opcion = 0, _estado = true;
        _id = 0;
    });

    $("#btnGuardar").click(function (eve) {
        _perfilNombre = $("#TxtPerfil").val();
        if (_perfilNombre == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'ingrese perfil',

            });
            return;
        }

        if (_opcion == 0) {

            FunGrabarPerfil();
        }

    });

  
  

    function FunGrabarPerfil() {
        $.ajax({
            type: 'POST',
            url: '/Perfiles/Create',
            dataType: 'json',
            data: {
                id_perfil: _id, nombre_perfil: _perfilNombre, estado_perfil: _estado,
                aux_peri: 0, aux_perii: "", creacion_usuario: ""
                
            },

            success: function (datos) {

                if (datos.success == true) {
                    $.each(datos.data, function (i, item) {
                        _PerfilId = item.IdPerfil;
                        _perfi = item.Perfil;
                        _estado = item.Estado
                    });
                    _button = '<button id="btnEditar" class="btn btn-outline-info btn-sm ml-3"><i class="fas fa-edit"></i></button><button id="btnEliminar" class="btn btn-outline-danger btn-sm ml-3"><i class="fas fa-trash-alt"></i></button>'

                    Tabla.row.add([_PerfilId, _perfi, _estado, _button]).draw();

                    $.notify(datos.mesagge, {
                        globalPosition: "top-center",
                        className: datos.nameclass
                    });
                    $("#myModal").modal("hide");

                } else {

                    Swal.fire({
                        title: 'Upss..!!',
                        text: datos.mesagge,
                        icon: datos.nameclass
                    });

                }
            }
        });

    }

});
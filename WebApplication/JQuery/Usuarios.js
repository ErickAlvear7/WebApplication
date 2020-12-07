$(document).ready(function () {

    $("#btnNuevo").click(function (eve) {
        eve.preventDefault();
        $("#modal-content").load("/Usuarios/Create");
        $(".modal-title").text("Nuevo Usuario");
        $("#header").css("background-color", "#2F90F3");
        $("#header").css("color", "white");
        _opcion = 0, _estado = true;
        _id = 0;
    });

    $("#btnGuardar").click(function (eve) {
        _perfil = $("#DdlPerfil").val();
        _nombres = $("#TxtNombre").val();
        _apellidos = $("#TxtApellido").val();
        _login = $("#TxtLogin").val();
        _password = $("#TxtPassword").val();

        if (_perfil == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'seleccione el perfil!',

            });
            return;
        }

        if (_nombres == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'ingrese por lo menos un nombre!',
               
            });
            return;
        }
        if (_apellidos == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'ingrese por lo menos un apellido!',
               
            });
            return;
        }
        if (_login == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'ingrese un usuario!',
             
            });
            return;
        }
        if (_password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'ingrese una contraseña!',
               
            });
            return;
        }

        if (_opcion == 0) {

            FunGrabarAjax();
        }
    });

    function FunGrabarAjax() {
        $.ajax({
            type: 'POST',
            url: '/Usuarios/Create',
            dataType: 'json',
            data: {
                id_usuario: _id, id_perfil: _perfil, nombre_usuario: _nombres, apellido_usuario: _apellidos,
                login_usuario: _login, password_usuario: _password, estado_usuario: _estado, aux_usui: 0,
                aux_usuii: "", creacion_usuario:""
            },

            success: function (datos) {
                
                if (datos.success == true) {
                    $.each(datos.data, function (i, item) {
                        _userId = item.UserId;
                        _perfi = item.Perfil;
                        _usuario = item.Usuario;
                        _login = item.Login;
                        _estado = item.Estado
                    });
                    _button = '<button id="btnEditar" class="btn btn-outline-info btn-sm ml-3"><i class="fas fa-edit"></i></button><button id="btnEliminar" class="btn btn-outline-danger btn-sm ml-3"><i class="fas fa-trash-alt"></i></button>'

                    Tabla.row.add([_userId, _perfi, _usuario, _login, _estado, _button]).draw();
                    $.notify(datos.mesagge, {
                        globalPosition: "top-center",
                        className: datos.nameclass                     
                    });
                    $("#myModal").modal("hide");

                } else {
                    $.notify("BOOM!", "error");
                }
            }
        });
    }

    
});
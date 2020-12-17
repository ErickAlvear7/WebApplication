
$(document).ready(function () {
    var _loginAnt = '';
    var txtEstado = '';

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

        if (_opcion == 1) {

            FunEditarAjax();
        }
    });

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _opcion = 1;
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _loginAnt = _data[3];
        $("#modal-content").load("/Usuarios/Edit/" + _loginAnt);
        $(".modal-title").text("Editar Usuario");
        $("#header").css("background-color", "#23BBB9");
        $("#header").css("color", "white");
        $("#myModal").modal("show");
            
    });

    $(document).on("click", "#btnEliminar", function (eve) {
        eve.preventDefault();
        _fila = $(this);
        _row = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_row);
        _login = _data[3]; 
        _usuario = _data[2];
        FunEliminarUsuario();
    });

    $(document).on("click", "#ChkEstado", function () {
        _checked = $("#ChkEstado").is(":checked");
        if (_checked) {
            $("#LblEstado").text("Activo");
            txtEstado = "Activo";
            estado = true;
        } else {
            $("#LblEstado").text("Inactivo");
            txtEstado = "Inactivo";
            estado = false;
        }
    });
     
    //Funciones---->

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
                  
                    Swal.fire({
                        title: 'Upss..!!',
                        text: datos.mesagge,
                        icon: datos.nameclass
                    });
                   
                }
            }
        });
    }

    function FunEditarAjax() {

        $.ajax({
            type:'POST',
            url: '/Usuarios/Edit',
            dataType: 'json',
            data: {
                login: _login, perfilId: _perfil, nombre: _nombres, apellido: _apellidos,
                contra: _password, estado: txtEstado, loginAnt: _loginAnt               
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

               
                    Tabla.row(_fila).data([_userId, _perfi, _usuario, _login, _estado, _button]).draw();

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

    function FunEliminarUsuario() {

        Swal.fire({
            title: 'Esta seguro de eliminar el usuario ' + _usuario + '?',
            text: "El registro sera elminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    $.ajax({

                        url: "/Usuarios/Delete",
                        type: "POST",
                        dataType: "json",
                        data: { id: _login },
                        success: function (data) {
                            if (data.success == true) {
                                Swal.close();
                                Tabla.row(_fila.parents('tr')).remove().draw();
                                $.notify(data.mesagge, {
                                    globalPosition: "top-center",
                                    className: datos.nameclass
                                });
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }

                    });

                });
            }
        });
    }
});
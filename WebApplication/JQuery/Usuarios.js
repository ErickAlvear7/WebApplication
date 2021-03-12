
$(document).ready(function () {

    var _loginAnt = '', _perfil, _nombres, _apellidos, _login, _password, _opcion, _id, _usuario, _login,
        txtEstado, _button, _checked;
    var estado = '';
    var notification;
    var _fila, _data, _row, _checked;

    $("#btnNuevo").click(function (eve) {
        eve.preventDefault();
        //$("#modal-content").load("/Usuarios/Create");
        //$(".modal-title").text("Usuario");
        //$("#header").css("background-color", "#DEFAF9");
        //$("#header").css("color", "gray");

        var modal = $("#myModal #modal-content"); //Find the element
        $(modal).load(modal.data('url')); //Fetch url and load partial view
        $(".modal-title").text("Nuevo Usuario");
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $(this).attr('data-target', '#myModal');
        $(this).attr('data-toggle', 'modal');        

        _opcion = 0, _estado = true;
        _id = 0;
 
    });

   

    $("#btnGuardar").click(function (eve) {
        _perfil = $("#ddlPerfil").val().trim();
        _nombres = $("#txtNombre").val().trim().toUpperCase();
        _apellidos = $("#txtApellido").val().trim().toUpperCase();
        _login = $("#txtLogin").val().trim();
        _password = $("#txtPassword").val().trim();

        if (_perfil == "") {

            notification = alertify.notify('seleccione el perfil..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_nombres == "") {

            notification = alertify.notify('ingrese nombre..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_apellidos == "") {
            notification = alertify.notify('ingrese apellido..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_login == "") {
            notification = alertify.notify('ingrese un usuario..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_password == "") {
            notification = alertify.notify('ingrese una contraseña..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_opcion == 0) {

            FunGrabarAjax();
           
        }

        if (_opcion == 1) {

            FunEditarAjax();
        }
    });

    $("#btnGuardarEdit").click(function (eve) {
        _perfil = $("#ddlPerfil").val().trim();
        _nombres = $("#txtNombre").val().trim().toUpperCase();
        _apellidos = $("#txtApellido").val().trim().toUpperCase();
        _login = $("#txtLogin").val().trim();
        _password = $("#txtPassword").val().trim();

        if (_perfil == "") {

            notification = alertify.notify('seleccione el perfil..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_nombres == "") {

            notification = alertify.notify('ingrese nombre..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_apellidos == "") {
            notification = alertify.notify('ingrese apellido..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_login == "") {
            notification = alertify.notify('ingrese un usuario..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_password == "") {
            notification = alertify.notify('ingrese una contraseña..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        FunEditarAjax();
    });

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _opcion = 1;
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _loginAnt = _data[3];
        txtEstado = _data[4];
        //$("#modal-content").load("/Usuarios/Edit/" + _loginAnt);
        //$(".modal-title").text("Editar Usuario");
        //$("#header").css("background-color", "#DEFAF9");
        //$("#header").css("color", "gray");
        //$("#myModal").modal("show");

        var modal = $("#myModalEdit #modal-content"); //Find the element
        $(modal).load(modal.data('url') +"/"+ _loginAnt); //Fetch url and load partial view
        $(".modal-title").text("Edit Usuario");
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $(this).attr('data-target', '#myModalEdit');
        $(this).attr('data-toggle', 'modal');
        $("#myModalEdit").modal("show");
            
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
            //url: '/Usuarios/Create',
            url: 'Create',
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
            url: 'Edit',
            //url: '@Url.Action("Edit", "Usuarios")',
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
                    $("#myModalEdit").modal("hide");
                    
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
 
        alertify.confirm('desea eliminar el usuario ' + _usuario + '?', 'el registro se eliminara..!', function () {
            alertify.success('usuario eliminado')
            $.ajax({
                url: "Delete",
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
        }
            , function () { alertify.error('cancelado') });

 
    }

});
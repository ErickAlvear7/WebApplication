$(document).ready(function () {

    var _id = 0;
    var txtEstado = '';
    _id = $('#IdCliente').val();

    $("#btnNuevo").click(function () {
        window.location.href = "/Clientes/Create";
      
    });

    $("#btnRegresar").click(function () {
        window.location.href = "/Clientes/Index";

    });

    $("#btnGuardar").click(function () {
        _prov = $('#ddlProv').val().trim();
        _cuid = $('#ddlCuid').val().trim();
        _cli = $('#txtCliente').val().trim().toUpperCase();
        _ruc = $('#txtRuc').val().trim().trim();
        _direc = $('#txtDirec').val().trim().toUpperCase();
        _tel1 = $('#txtTel1').val().trim();
        _tel2 = $('#txtTel2').val().trim();     
        _email = $('#txtEmail').val().trim().toLowerCase();
        _web = $('#txtWeb').val().trim().toLowerCase();
        _con1 = $('#txtContac1').val().trim().toUpperCase();
        _cel1 = $('#txtCel1').val().trim();
        _con2 = $('#txtContac2').val().trim().toUpperCase();
        _cel2 = $('#txtCel2').val().trim();


        if (_prov == '') {
            Swal.fire({
                icon: 'info',
                text: 'seleccione provincia',

            });
            return;
        }
        if (_cuid =='0') {

            Swal.fire({
                icon: 'info',
                text: 'seleccione cuidad',

            });
            return;
        }

        if (_cli == '') {

            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Cliente',

            });
            return;
        }

        if (_ruc != '') {
            if (_ruc.length < 13 || _ruc.length > 13) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Ruc incorrecto',

                });
                return;
            }
        }

        if (_direc == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Direccion',

            });
            return;
        }
      
        if (_tel1 == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Telefono 1',

            });
            return;
        }

        

        if (_tel1.length < 9 || _tel1.length > 9) {
            Swal.fire({
                icon: 'error',
                //title: 'Ups...',
                text: 'Telefono 1 incorrecto',

            });
            return;
        }

        if (_tel2 != '') {

            if (_tel2.length < 9 || _tel2.length > 9) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Telefono 2 incorrecto',

                });
                return;
            }
        }

        if (_email != '') {

            if ($("#txtEmail").val().indexOf('@', 0) == -1 || $("#txtEmail").val().indexOf('.', 0) == -1) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'e-mail incorrecto',

                });
                return;
                
            }
        }
    
        if (_con1 == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Contacto 1',

            });
            return;
        }
        if (_cel1 == '') {

            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Celular 1',

            });
            return;
        }

        if (_cel1.length < 10 || _cel1.length > 10) {
            Swal.fire({
                icon: 'error',
                //title: 'Ups...',
                text: 'Celular 1 incorrecto',

            });
            return;
        }

        if (_cel2 != '') {
            if (_cel2.length < 10 || _cel1.length > 10) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Celular 2 incorrecto',

                });
                return;
            }
        }

        $.ajax({

            url: '/Clientes/Create',
            type: 'POST',
            dataType: 'JSON',
            data: {
                id_cliente: _id, provincia_cliente: _prov, cuidad_cliente: _cuid, nombre_cliente: _cli, ruc_cliente: _ruc,
                direccion_cliente: _direc, telefono1_cliente: _tel1, telefono2_cliente: _tel2, email_cliente: _email, web_cliente: _web,
                contacto1_cliente: _con1, celular1_cliente: _cel1, contacto2_cliente: _con2, celular2_cliente: _cel2,
                estado_cliente: true, aux1_cliente: 0, aux2_cliente: ""
            },

            success: function (result) {

                if (result.success) {
                    window.location.href = "/Clientes/Index";

                }           
             
            },

            error: function (result) {
                console.log(result);
            }
        });


    });

    $(document).on("click", "#btnEliminar", function (eve) {
        eve.preventDefault();
        _fila = $(this);
        _row = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_row);
        _id = _data[0];
        _cliente = _data[1];
        FunEliminarCliente();
    });

    function FunEliminarCliente() {

        Swal.fire({
            title: 'Esta seguro de eliminar el cliente ' + _cliente + '?',
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

                        url: "/Clientes/Delete",
                        type: "POST",
                        dataType: "json",
                        data: { id: _id },
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

    $(document).on("click", "#ChkEstado", function () {
        _checked = $("#ChkEstado").is(":checked");
        if (_checked) {
            $("#LblEstado").text("Activo");
            txtEstado = "Activo";
            _estado = true;
        } else {
            $("#LblEstado").text("Inactivo");
            txtEstado = "Inactivo";
            _estado = false;
        }
    });

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        window.location.href = "/Clientes/Edit/" + _id;

    });

    $("#btnModificar").click(function () {
        _prov = $('#ddlProv').val().trim();
        _cuid = $('#ddlCuid').val().trim();
        _cli = $('#txtCliente').val().trim().toUpperCase();
        _ruc = $('#txtRuc').val().trim().trim();
        _direc = $('#txtDirec').val().trim().toUpperCase();
        _tel1 = $('#txtTel1').val().trim();
        _tel2 = $('#txtTel2').val().trim();
        _email = $('#txtEmail').val().trim().toLowerCase();
        _web = $('#txtWeb').val().trim().toLowerCase();
        _con1 = $('#txtContac1').val().trim().toUpperCase();
        _cel1 = $('#txtCel1').val().trim();
        _con2 = $('#txtContac2').val().trim().toUpperCase();
        _cel2 = $('#txtCel2').val().trim();


        if (_prov == '') {
            Swal.fire({
                icon: 'info',
                text: 'seleccione provincia',

            });
            return;
        }
        if (_cuid == '0') {

            Swal.fire({
                icon: 'info',
                text: 'seleccione cuidad',

            });
            return;
        }

        if (_cli == '') {

            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Cliente',

            });
            return;
        }

        if (_ruc != '') {
            if (_ruc.length < 13 || _ruc.length > 13) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Ruc incorrecto',

                });
                return;
            }
        }

        if (_direc == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Direccion',

            });
            return;
        }

        if (_tel1 == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Telefono 1',

            });
            return;
        }

        if (_tel1.length < 9 || _tel1.length > 9) {
            Swal.fire({
                icon: 'error',
                //title: 'Ups...',
                text: 'Telefono 1 incorrecto',

            });
            return;
        }

        if (_tel2 != '') {

            if (_tel2.length < 9 || _tel2.length > 9) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Telefono 2 incorrecto',

                });
                return;
            }
        }

        if (_email != '') {

            if ($("#TxtEmail").val().indexOf('@', 0) == -1 || $("#TxtEmail").val().indexOf('.', 0) == -1) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'e-mail incorrecto',

                });
                return;

            }
        }

        if (_con1 == '') {
            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Contacto 1',

            });
            return;
        }
        if (_cel1 == '') {

            Swal.fire({
                icon: 'info',
                text: 'campo requerido: Celular 1',

            });
            return;
        }

        if (_cel1.length < 10 || _cel1.length > 10) {
            Swal.fire({
                icon: 'error',
                //title: 'Ups...',
                text: 'Celular 1 incorrecto',

            });
            return;
        }

        if (_cel2 != '') {
            if (_cel2.length < 10 || _cel1.length > 10) {
                Swal.fire({
                    icon: 'error',
                    //title: 'Ups...',
                    text: 'Celular 2 incorrecto',

                });
                return;
            }
        }

        $.ajax({

            url: '/Clientes/Edit',
            type: 'POST',
            dataType: 'JSON',
            data: {
                id_cliente: _id, provincia_cliente: _prov, cuidad_cliente: _cuid, nombre_cliente: _cli, ruc_cliente: _ruc,
                direccion_cliente: _direc, telefono1_cliente: _tel1, telefono2_cliente: _tel2, email_cliente: _email, web_cliente: _web,
                contacto1_cliente: _con1, celular1_cliente: _cel1, contacto2_cliente: _con2, celular2_cliente: _cel2,
                estado_cliente: _estado, aux1_cliente: 0, aux2_cliente: ""
            },

            success: function (result) {

                if (result.success) {
                    window.location.href = "/Clientes/Index";

                }

            },

            error: function (result) {
                console.log(result);
            }
        });


    });

});
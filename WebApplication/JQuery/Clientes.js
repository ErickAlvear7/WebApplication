$(document).ready(function () {

    var _id = 0;
    var _prov, _cuid, _cli, _ruc, _direc, _tel1, _tel2, _email, _web, _con1, _cel1, _con2, _cel2;
    var _row, _fila, _data, _cliente, _checked, _estado;

    _id = $('#IdCliente').val();

    if ($("#LblEstado").text() == 'Activo') {
        _estado = true;
    } else _estado = false;

    $("#btnNuevo").click(function () {
        window.location.href = "Create";
      
    });

    $("#btnRegresar").click(function () {
        window.location.href = "Index";
    });

    $("#btnRegresarEdit").click(function () {
        window.location.href = "../Index";
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
        
        notification = '';

        if (_prov == '') {
           
            alertify.notify('seleccione provincia..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cuid =='0') {

            alertify.notify('seleccione cuidad..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cli == '') {
           
            alertify.notify('campo requerido: Cliente..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_ruc != '') {
            if (_ruc.length < 13 || _ruc.length > 13) {
            
             alertify.notify('Ruc incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
             return;
            }
        }

        if (_direc == '') {

            alertify.notify('campo requerido: Direccion..!', 'warning ', 5, function () { console.log('dismissed'); });            
            return;
        }
      
        if (_tel1 == '') {

            alertify.notify('campo requerido: Telefono 1..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }        

        if (_tel1.length < 9 || _tel1.length > 9) {
 
            alertify.notify('Telefono 1 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tel2 != '') {

            if (_tel2.length < 9 || _tel2.length > 9) {
             alertify.notify('Telefono 2 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
             return;
            }
        }

        if (_email != '') {

            if ($("#txtEmail").val().indexOf('@', 0) == -1 || $("#txtEmail").val().indexOf('.', 0) == -1) {
                 alertify.notify('e-mail incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
                return;
                
            }
        }
    
        if (_con1 == '') {

            alertify.notify('campo requerido: Contacto 1', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_cel1 == '') {

            alertify.notify('campo requerido: Celular 1', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cel1.length < 10 || _cel1.length > 10) {

            alertify.notify('Celular 1 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cel2 != '') {
            if (_cel2.length < 10 || _cel1.length > 10) {

                alertify.notify('Celular 2 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
                return;
            }
        }

        $.ajax({

            url: 'Create',
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
                    window.location.href = result.redirectToUrl;

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
        _cliente = _data[3];
        FunEliminarCliente();
    });

    function FunEliminarCliente() {


        alertify.confirm('desea eliminar el cliente ' + _cliente + '?', 'cliente sera eliminado..!', function () {
            alertify.success('cliente eliminado')
            $.ajax({
                url: "Delete",
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
        }
            , function () { alertify.error('cancelado') });
    }

    $(document).on("click", "#ChkEstado", function () {
        _checked = $("#ChkEstado").is(":checked");
        if (_checked) {
            $("#LblEstado").text("Activo");
            _estado = true;
        } else {
            $("#LblEstado").text("Inactivo");
            _estado = false;
        }
    });

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        //window.location.href = "/Clientes/Edit/" + _id;
        window.location.href = "Edit/" + _id;

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

            notification = alertify.notify('seleccione provincia..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_cuid == '0') {

            notification = alertify.notify('seleccione cuidad..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cli == '') {


            notification = alertify.notify('campo requerido: Cliente..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_ruc != '') {
            if (_ruc.length < 13 || _ruc.length > 13) {

             notification = alertify.notify('Ruc incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
             return;
            }
        }

        if (_direc == '') {

            notification = alertify.notify('campo requerido: Direccion..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tel1 == '') {

            notification = alertify.notify('campo requerido: Telefono 1..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }



        if (_tel1.length < 9 || _tel1.length > 9) {

            notification = alertify.notify('Telefono 1 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tel2 != '') {

            if (_tel2.length < 9 || _tel2.length > 9) {
             notification = alertify.notify('Telefono 2 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
             return;
            }
        }

        if (_email != '') {

            if ($("#txtEmail").val().indexOf('@', 0) == -1 || $("#txtEmail").val().indexOf('.', 0) == -1) {
              notification = alertify.notify('e-mail incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
              return;

            }
        }

        if (_con1 == '') {

            notification = alertify.notify('campo requerido: Contacto 1', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }
        if (_cel1 == '') {

            notification = alertify.notify('campo requerido: Celular 1', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cel1.length < 10 || _cel1.length > 10) {

            notification = alertify.notify('Celular 1 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_cel2 != '') {
            if (_cel2.length < 10 || _cel1.length > 10) {

             notification = alertify.notify('Celular 2 incorrecto..!', 'error ', 5, function () { console.log('dismissed'); });
             return;
            }
        }

        $.ajax({

            url: '../Edit',
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
                    window.location.href = result.redirectToUrl;

                }

            },

            error: function (result) {
                console.log(result);
            }
        });


    });

    //Agrega equipo cliente

    $(document).on("click", "#btnEquipo", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        window.location.href = "EquipoCliente/" + _id;

    });

    $(document).on("click", "#btnDetalle", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        $("#modal-content").load("../MostrarOrdenesFin/" + _id);
        $(".modal-title").text("Trabajos Realizados");
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $("#myModal").modal("show");
        //window.location.href = "/Clientes/MostrarOrdenesFin/" + _id;

    });

});
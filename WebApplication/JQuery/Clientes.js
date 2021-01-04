$(document).ready(function () {

    var _id = 0;

    $("#btnNuevo").click(function () {
        window.location.href = "/Clientes/Create";
      
    });

    $("#BtnRegresar").click(function () {
        window.location.href = "/Clientes/Index";

    });

    $("#BtnGuardar").click(function () {
        _prov = $('#DdlProv').val();
        _cuid = $('#DdlCuid').val();
        _cli = $('#TxtCliente').val().toUpperCase();
        _ruc = $('#TxtRuc').val().trim();
        _direc = $('#TxtDirec').val().toUpperCase();
        _tel1 = $('#TxtTel1').val().trim();
        _tel2 = $('#TxtTel2').val().trim();     
        _email = $('#TxtEmail').val().trim();
        _web = $('#TxtWeb').val().trim();
        _con1 = $('#TxtContac1').val().toUpperCase();
        _cel1 = $('#TxtCel1').val().trim();
        _con2 = $('#TxtContac2').val().toUpperCase();
        _cel2 = $('#TxtCel2').val().trim();


        if (_prov == '') {

            Swal.fire('seleccione provincia');
            return;
        }
        if (_cuid =='0') {

            Swal.fire('seleccione cuidad');
            return;
        }

        if (_cli == '') {

            Swal.fire('campo requerido: Cliente');
            return;
        }

        if (_ruc != '') {
            if (_ruc.length < 13 || _ruc.length > 13) {
                Swal.fire('Ruc incorrecto');
                return;
            }
        }

        if (_direc == '') {

            Swal.fire('campo requerido: Direccion');
            return;
        }
      
        if (_tel1 == '') {
            Swal.fire('campo requerido: Telefono 1');
            return;
        }

        if (_tel1.length < 9 || _tel1.length > 9) {
            Swal.fire('telefono 1 incorrecto');
            return;
        }

        if (_tel2 != '') {

            if (_tel2.length < 9 || _tel2.length > 9) {
                Swal.fire('telefono 2 incorrecto');
                return;
            }
        }

        if (_email != '') {

            if ($("#TxtEmail").val().indexOf('@', 0) == -1 || $("#TxtEmail").val().indexOf('.', 0) == -1) {
                Swal.fire('e-mail incorrecto');
                return;
                
            }
        }
    
        if (_con1 == '') {

            Swal.fire('campo requerido: Contacto 1');
            return;
        }
        if (_cel1 == '') {

            Swal.fire('campo requerido: Celular 1');
            return;
        }

        if (_cel1.length < 10 || _cel1.length > 10) {
            Swal.fire('celular 1 incorrecto');
            return;
        }

        if (_cel2 != '') {
            if (_cel2.length < 10 || _cel1.length > 10) {
                Swal.fire('celular 1 incorrecto');
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
                $.notify(datos.mesagge, {
                    globalPosition: "top-center",
                    className: datos.nameclass
                });
             
            },

            error: function (result) {
                console.log(result);
            }
        });


    });

    $(document).on("click", "#BtnEliminar", function (eve) {
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
  
});
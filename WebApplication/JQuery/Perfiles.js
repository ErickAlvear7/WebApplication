﻿$(document).ready(function () {

    var _perfilNombre, _opcion, _perfil, _id;
    var notification;
    var _fila, _row, _datSet, _perfil, _button;

    $("#btnNuevo").click(function (e) {
        e.preventDefault();
        //$("#modal-content").load("/Perfiles/Create");
        //$(".modal-title").text("Perfil");
        //$("#header").css("background-color", "#DEFAF9");
        //$("#header").css("color", "gray");

        var modal = $("#myModal #modal-content"); //Find the element
        $(modal).load(modal.data('url')); //Fetch url and load partial view
        $(".modal-title").text("Nuevo Perfil");
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $(this).attr('data-target', '#myModal');
        $(this).attr('data-toggle', 'modal');
        _opcion = 0, _estado = true;
        _id = 0;
    });

    $("#btnGuardar").click(function (eve) {
        _perfilNombre = $("#txtPerfil").val().trim();
        if (_perfilNombre == "") {

            notification = alertify.notify('ingrese un perfil..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_opcion == 0) {

            FunGrabarPerfil();
        }

    });


    $(document).on("click", "#btnEliminar", function (eve) {
        eve.preventDefault();
        _fila = $(this);
        _row = $(this).closest("tr");
        _datSet = $('#tabla').dataTable().fnGetData(_row);
        _id = _datSet[0];
        _perfil = _datSet[1];
        FunEliminarPerfil();
    });

  
   //funciones---->

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

                  
                    notification = alertify.notify('perfil ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                }
            }
        });

    }

    function FunEliminarPerfil() {



        alertify.confirm('desea eliminar el perfil ' + _perfil + '?', 'perfil sera eliminado..!', function () {
            alertify.success('perfil eliminado')
            $.ajax({
                url: "/Perfiles/Delete",
                type: "POST",
                dataType: "json",
                data: { id: _id },
                success: function (data) {
                    if (data.success == true) {
                        Swal.close();
                        Tabla.row(_fila.parents('tr')).remove().draw();
                      
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
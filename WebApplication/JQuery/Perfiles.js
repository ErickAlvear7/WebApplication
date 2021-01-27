$(document).ready(function () {

    $("#btnNuevo").click(function (eve) {
        eve.preventDefault();
        $("#modal-content").load("/Perfiles/Create");
        $(".modal-title").text("Nuevo Perfil");
        $("#header").css("background-color", "#2A61DF");
        $("#header").css("color", "white");
        _opcion = 0, _estado = true;
        _id = 0;
    });

    $("#btnGuardar").click(function (eve) {
        _perfilNombre = $("#txtPerfil").val().trim();
        if (_perfilNombre == "") {

            var notification = alertify.notify('ingrese un perfil..!', 'warning ', 5, function () { console.log('dismissed'); });
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

                    //Swal.fire({
                    //    title: 'Upss..!!',
                    //    text: datos.mesagge,
                    //    icon: datos.nameclass
                    //});
                    var notification = alertify.notify('perfil ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                }
            }
        });

    }

    function FunEliminarPerfil() {

        //Swal.fire({
        //    title: 'Esta seguro de eliminar el perfil ' + _perfil + '?',
        //    text: "El registro sera elminado!",
        //    icon: 'warning',
        //    showCancelButton: true,
        //    confirmButtonColor: '#3085d6',
        //    cancelButtonColor: '#d33',
        //    confirmButtonText: 'Si, Eliminar!',
        //    showLoaderOnConfirm: true,
        //    preConfirm: function () {
        //        return new Promise(function (resolve) {
        //            $.ajax({

        //                url: "/Perfiles/Delete",
        //                type: "POST",
        //                dataType: "json",
        //                data: { id: _id },
        //                success: function (data) {
        //                    if (data.success == true) {
        //                        Swal.close();
        //                        Tabla.row(_fila.parents('tr')).remove().draw();
        //                        $.notify(data.mesagge, {
        //                            globalPosition: "top-center",
        //                            className: data.nameclass
        //                        });
        //                    }
        //                },
        //                error: function (error) {
        //                    console.log(error);
        //                }

        //            });

        //        });
        //    }
        //});

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
                        //$.notify(data.mesagge, {
                        //    globalPosition: "top-center",
                        //    className: data.nameclass
                        //});
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
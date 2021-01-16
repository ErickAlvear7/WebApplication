$(document).ready(function () {

    _tipoSave = 'add', _continuar = true, _result = [], _count = 0;

    $("#modalPARAMETER").draggable({
        handle: ".modal-header"
    });

    $('#btnRegresar').click(function () {
        window.location.href = '/CabeceraEquipos/Index';
    });

    $("#btnAdd").click(function () {
        $("#formParam").trigger("reset");
        $("#divcheck").hide();
        $("#header").css("background-color", "#2A61DF");
        $("#header").css("color", "white");
        $(".modal-title").text("Nuevo Parametro");
        $("#btnAgregar").text("Agregar");
        $("#modalPARAMETER").modal("show");
        _tipoSave = 'add';
        _estado = 'Activo';
    });

    $('#btnAgregar').click(function () {
        if ($.trim($('#txtDetalle').val()).length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'ingrese detalle..!',
                type: 'warning',
                showCloseButton: true,
            });
            return;
        }

        if ($.trim($('#txtValorV').val()).length == 0 && $.trim($('#txtValorI').val()).length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'ingrese  valor de texto o valor entero..!',
                type: 'warning',
                showCloseButton: true,
            });
            return;
        }

        if ($.trim($('#txtValorV').val()).length > 0 && $.trim($('#txtValorI').val()).length > 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'ingrese solo valor de texto o entero..!',
                type: 'warning',
                showCloseButton: true,
            });
            return;
        }

        _descripcion = $.trim($('#txtDetalle').val()).toUpperCase();
        _valorv = $.trim($('#txtValorV').val()).toUpperCase();

        if ($.trim($('#txtValorI').val()).length == 0) {
            _valori = 0;
        } else {
            _valori = $.trim($('#txtValorI').val());
        }

        if (_tipoSave == 'add') {
            $.each(_result, function (i, item) {
                if (item.ArryPadeNombre.toUpperCase() == _descripcion.toUpperCase()) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Información',
                        text: 'Nombre del Parámetro ya Existe..!',
                        type: 'warning',
                    });
                    _continuar = false;
                    return false;
                } else {
                    $.each(_result, function (i, item) {
                        if (_valori == 0) {
                            if (item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Información',
                                    text: 'Velor texto del Parámetro ya Existe..!',
                                    type: 'warning',
                                });
                                _continuar = false;
                                return false;
                            } else {
                                _continuar = true;
                            }
                        } else {
                            if (item.ArryPadeValorI == _valori) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Información',
                                    text: 'Velor entero del Parámetro ya Existe..!',
                                    type: 'warning',
                                });
                                _continuar = false;
                                return false;
                            } else {
                                _continuar = true;
                            }
                        }
                    });
                }
            });

            if (_continuar) {
                //_count = _count + 1;
                _count++;
                let _deshabilitar = '';

                if (_count == 1) {
                    _deshabilitar = 'disabled="disabled"';
                }

                _output = '<tr id="row_' + _count + '">';
                _output += '<td style="display: none;">' + _count + ' <input type="hidden" name="hidden_orden[]" id="orden' + _count + '" value="' + _count + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _count + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _count + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _count + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _count + '" value="' + _estado + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="subirnivel" class="btn btn-outline-primary btn-sm btnUp" ' + _deshabilitar + ' id="btnUp' + _count + '"><i class="fa fa-arrow-up"></i></button>';
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _count + '"><i class="fa fa-file"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _count + '"><i class="fa fa-trash"></i></button></div></div></td>';
                _output += '</tr>';
                //console.log(_output);

                $('#tblParameter').append(_output);

                _objeto = {
                    ArryId: _count,
                    ArryPadeNombre: _descripcion,
                    ArryPadeValorV: _valorv,
                    ArryPadeValorI: _valori,
                    ArryEstado: _estado,
                    ArryDisable: _deshabilitar
                }
                _result.push(_objeto);
                $("#modalPARAMETER").modal("hide");
            }
        }
        else {
            _continuar = false, _seguir = false;
            if (_descripcionold.toUpperCase() != _descripcion.toUpperCase()) {
                $.each(_result, function (i, _item) {
                    if (_item.ArryPadeNombre.toUpperCase() == _descripcion.toUpperCase()) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Información',
                            text: 'Nombre del Parámetro ya Existe..!',
                            type: 'warning',
                        });
                        _continuar = false;
                        return false;
                    } else {
                        _continuar = true;
                    }
                });
            } else _continuar = true;

            if (_continuar) {
                if (_valori != 0) {
                    if (_valoriold != _valori) {
                        $.each(_result, function (i, _item) {
                            if (_item.ArryPadeValorI == _valori) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Información',
                                    text: 'Velor entero del Parámetro ya Existe..!',
                                    type: 'warning',
                                });
                                _seguir = false;
                                return false;
                            } else {
                                _seguir = true;
                            }
                        });
                    }
                } else {
                    if (_valorvold.toUpperCase() != _valorv.toUpperCase()) {
                        $.each(_result, function (i, _item) {
                            if (_item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Información',
                                    text: 'Velor texto del Parámetro ya Existe..!',
                                    type: 'warning',
                                });
                                _seguir = false;
                                return false;
                            } else {
                                _seguir = true;
                            }
                        });
                    } else _seguir = true;
                }
            }

            if (_seguir) {
                _row_id = $('#hidden_row_id').val();
                _output = '<td style="display: none;">' + _norden + ' <input type="hidden" name="hidden_orden[]" id="orden' + _row_id + '" value="' + _row_id + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _row_id + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _row_id + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _row_id + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _row_id + '" value="' + _estado + '" /></td>';

                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnUp" class="btn btn-outline-primary btn-sm btnUp" ' + _deshabilitar + ' id="btnUp' + _row_id + '"><i class="fa fa-arrow-up"></i></button>';
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _row_id + '"><i class="fa fa-file"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _row_id + '"><i class="fa fa-trash"></i></button></div></div></td>';
                $('#row_' + _row_id + '').html(_output);

                _objIndex = _result.findIndex((obj => obj.ArryId == _row_id));
                _result[_objIndex].ArryPadeNombre = _descripcion;
                _result[_objIndex].ArryPadeValorV = _valorv;
                _result[_objIndex].ArryPadeValorI = _valori;
                $("#modalPARAMETER").modal("hide");
            }
        }
    });

    $(document).on("click", ".btnEdit", function () {
        $("#formParam").trigger("reset");
        _row_id = $(this).attr("id");
        _norden = $('#orden' + _row_id + '').val();
        _descripcionold = $('#detalle' + _row_id + '').val();
        _valorvold = $('#valorv' + _row_id + '').val();
        _valoriold = $('#valori' + _row_id + '').val();
        _estadoold = $('#estado' + _row_id + '').val();
        _deshabilitar = $('#btnUp' + _row_id + '').attr('disabled');
        _tipoSave = 'edit';
        if (_estadoold == "Activo") {
            $("#ChkEstado").prop("checked", true);
            $("#LblEstado").text("Activo");
        } else {
            $("#ChkEstado").prop("checked", false);
            $("#LblEstado").text("Inactivo");
        }
        $('#txtDetalle').val(_descripcionold);
        $('#txtValorV').val(_valorvold);
        $('#txtValorI').val(_valoriold == 0 ? '' : _valoriold);
        $('#hidden_row_id').val(_row_id);
        $("#header").css("background-color", "#2A61DF");
        $("#header").css("color", "white");
        $(".modal-title").text("Editar Parametro");
        $("#divcheck").show();
        $("#btnAgregar").text("Modificar");
        $("#modalPARAMETER").modal("show");
    });

    $("#ChkEstado").click(function () {
        _checked = $("#ChkEstado").is(":checked");
        if (_checked) {
            $("#LblEstado").text("Activo");
            _estado = 'Activo';
        } else {
            $("#LblEstado").text("Inactivo");
            _estado = 'Inactivo';
        }
    });

    $(document).on("click", ".btnDelete", function () {
        _row_id = $(this).attr("id");
        _descripcion = $('#detalle' + _row_id + '').val();
        Swal.fire({
            icon:"info",
            title: 'Está Seguro de Borrar ' + _descripcion,
            text: 'El registro será eliminado..',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    Swal.close();
                    FunRemoveItemFromArr(_result, _descripcion);
                    $('#row_' + _row_id + '').remove();
                    _count--;
                    //console.log(_count);
                    if (_count > 0) {
                        FunInactivaButton();
                    }
                    FunReorganizarOrder(_result);
                });
            }
        });
    });

    function FunInactivaButton() {
        x = document.getElementsByClassName("btnUp");
        console.log(x[0].id);
        $("#" + x[0].id).prop('disabled', true);
    }

    function FunRemoveItemFromArr(arr, deta) {
        $.each(arr, function (i, item) {
            if (item.ArryPadeNombre == deta) {
                arr.splice(i, 1);
                return false;
            } else {
                _continuar = true;
            }
        });
    };

    function FunReorganizarOrder(arr) {
        _otroval = 0;
        $.each(arr, function (i, item) {
            _otroval = _otroval + 1;
            if (_otroval == 1) {
                item['ArryDisable'] = 'disabled="disabled"';
            } else {
                item['ArryDisable'] = '';
            }
            FunOrderDelete(_otroval, item.ArryId, item.ArryPadeNombre, item.ArryPadeValorV, item.ArryPadeValorI, item.ArryEstado, item.ArryDisable);
            item['ArryId'] = parseInt(_otroval);
        });
        FunCambiarId();
    }

    function FunOrderDelete(_ordenx, _rowmod, _descripcion, _valorv, _valori, _estado, _disable) {
        _output = '<td style="display: none;">' + _ordenx + ' <input type="hidden" name="hidden_orden[]" id="orden' + _ordenx + '" value="' + _ordenx + '" /></td>';
        _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _ordenx + '" value="' + _descripcion + '" /></td>';
        _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _ordenx + '" value="' + _valorv + '" /></td>';
        _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _ordenx + '" value="' + _valori + '" /></td>';
        _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _ordenx + '" value="' + _estado + '" /></td>';
        _output += '<td><div class="text-center"><div class="btn-group">'
        _output += '<button type="button" name="btnUp" class="btn btn-outline-primary btn-sm btnUp" ' + _disable + ' id="btnUp' + _ordenx + '"><i class="fa fa-arrow-up"></i></button>';
        _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _ordenx + '"><i class="fa fa-file"></i></button>';
        _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _ordenx + '"><i class="fa fa-trash"></i></button></div></div></td>';
        $('#row_' + _rowmod + '').html(_output);
        console.log(_output);
    }

    function FunCambiarId() {
        $("#tblparameter tbody tr").each(function (index) {
            id = $(this).attr('id');
            underScoreIndex = id.indexOf('_');
            id = id.substring(0, underScoreIndex + 1) + (parseInt(index) + 1);
            $(this).attr('id', id);
        });
    }

    $("#btnSave").click(function (eve) {
        _nomparametro = $.trim($("#txtParametro").val()).toUpperCase();
        _descripcion = $.trim($("#txtDescripcion").val());

        if (_nomparametro == '') {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'ingrese nombre del parametro..!',
                type: 'warning',
            });
            return;
        }

        if (_count == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'ingrese al menos un detalle..!',
                type: 'warning',
            });
            return;
        }

        $.ajax({
            url: "/CabeceraEquipos/Create",
            type: "POST",
            dataType: "json",
            data: { parametro: _nomparametro, descripcion: _descripcion, estado: true, detalles: _result },
            success: function (datos) {
                if (datos.success == true) {
                    window.location.href = datos.miUrl;
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Información',
                        text: 'Nombre del parametro ya existe..!',
                        type: 'warning',
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

    });

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        window.location.href = "/CabeceraEquipos/Edit/" + _id;

    });

  
});
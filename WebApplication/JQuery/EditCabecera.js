$(document).ready(function () {

    _tipoSave = 'add', _continuar = true, _result = [], _count = 0;

    //Caotura los valores anteriores de la cabecera
    _id = $('input#txtIdCabecera').val();
    _nameparametroold = $('input#txtParametro').val();

    $("#modalPARAMETER").draggable({
        handle: ".modal-header"
    });

    $('#btnRegresar').click(function () {
        window.location.href = '/CabeceraEquipos/Index';
    });

    //Checkbox estado de la cabecera

    $("#chkEstadoCab").click(function () {
        _checked = $("#chkEstadoCab").is(":checked");
        if (_checked) {
            $("#lblEstadoCab").text("Activo");
            _estadocab = "Activo";
        } else {
            $("#lblEstadoCab").text("Inactivo");
            _estadocab = "Inactivo";
        }
    });

    //estado detalle (modal-edit)
    _checked = $("#ChkEstadoDe").is(":checked");
    if (_checked) {
        $("#lblEstadoDe").text("Activo");
        _estadode = "Activo";
    } else {
        $("#lblEstadoDe").text("Activo");
        _estadode = "Inactivo";
    }

    //Recorre la tabla detalle
    $("#tblDetalle tbody tr").each(function (items) {
        var _codigo, _detalle, _valorv, _valori, _estado;
        $(this).children("td").each(function (index) {

            switch (index) {
                case 0:
                    _codigo = $.trim($(this).text());
                    break;
                case 1:
                    _detalle = $.trim($(this).text());
                    break;
                case 2:
                    _valorv = $.trim($(this).text());
                    break;
                case 3:
                    _valori = $.trim($(this).text());
                    break;
                case 4:
                    _estado = $.trim($(this).text());
                    break;
            }
        });

        _nuevoestado = _estado == "Activo" ? true : false;

        _objeto = {
            ArryId: parseInt(_codigo),
            ArryPadeNombre: _detalle,
            ArryPadeValorV: _valorv,
            ArryPadeValorI: parseInt(_valori),
            ArryEstado: _nuevoestado,
        }

        _result.push(_objeto);
        _count = parseInt(_codigo);

    });

    console.log(_result);
   

    //Abre ventana modal nuevodetalle 
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

    //ventana modal para grabar nuevo detalle con validaciones 

    $('#btnAgregar').click(function () {
        if ($.trim($('#txtDetalle').val()).length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'Ingrese Detalle',
                showCloseButton: true,
            });
            return;
        }

        if ($.trim($('#txtValorV').val()).length == 0 && $.trim($('#txtValorI').val()).length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'Ingrese Valor Texto o Valor Entero..!',
                showCloseButton: true,
            });
            return;
        }

        if ($.trim($('#txtValorV').val()).length > 0 && $.trim($('#txtValorI').val()).length > 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'Ingrese Solo Valor Texto o Valor Entero..!',
                showCloseButton: true,
            });
            return;
        }

        _descripcion = $.trim($('#txtDetalle').val());
        _valorv = $.trim($('#txtValorV').val());

        if ($.trim($('#txtValorI').val()).length == 0) {
            _valori = 0;
        } else {
            _valori = $.trim($('#txtValorI').val());
        }

        if (_tipoSave == 'add') {
            $.each(_result, function (i, item) {
                if (item.ArryPadeNombre.toUpperCase() == _descripcion.toUpperCase()) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Información',
                        text: 'Nombre del Parámetro Existe..!'
                    });
                    _continuar = false;
                    return false;
                }
                else {
                    $.each(_result, function (i, item) {
                        if (_valori == 0) {
                            if (item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Información',
                                    text: 'Valor Texto de Parámetro ya Existe..!'
                                });
                                _continuar = false;
                                return false;
                            } else {
                                _continuar = true;
                            }
                        } else {
                            if (item.ArryPadeValorI == _valori) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Información',
                                    text: 'Valor Entero de Parámetro ya Existe..!'
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

            //console.log(_continuar);

            if (_continuar) {
                //_count = _count + 1;
                _count++;
             

                _output = '<tr id="row_' + _count + '">';
                _output += '<td style="display: none;">' + _count + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _count + '" value="' + _count + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _count + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _count + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _count + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _count + '" value="' + _estado + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _count + '"><i class="fas fa-edit"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _count + '"><i class="fas fa-trash-alt"></i></button></div></div></td>';
                _output += '</tr>';
                $('#tblDetalle').append(_output);

                _nuevoestado = _estado == "Activo" ? true : false;

                _objeto = {
                    ArryId: 0,
                    ArryPadeNombre: _descripcion,
                    ArryPadeValorV: _valorv,
                    ArryPadeValorI: _valori,
                    ArryEstado: _nuevoestado
                }
                _result.push(_objeto);
                //console.log(_result);
                $("#modalPARAMETER").modal("hide");
            }
        }
        else {
            _continuar = false, _seguir = false;
            if (_descripcionold.toUpperCase() != _descripcion.toUpperCase()) {
                $.each(_result, function (i, _item) {
                    if (_item.ArryPadeNombre.toUpperCase() == _descripcion.toUpperCase()) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Información',
                            text: 'Nombre del Parámetro ya Existe..!'
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
                                    title: 'Información',
                                    type: 'warning',
                                    text: 'Valor Entero de Parámetro ya Existe..!'
                                });
                                _seguir = false;
                                return;
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
                                    title: 'Información',
                                    type: 'warning',
                                    text: 'Valor Texto de Parámetro ya Existe..!'
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
                _output = '<td style="display: none;">' + _row_id + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _row_id + '" value="' + _row_id + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _row_id + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _row_id + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _row_id + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _row_id + '" value="' + _estado + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _row_id + '"><i class="fas fa-edit"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _row_id + '"><i class="fas fa-trash-alt"></i></button></div></div></td>';
                $('#row_' + _row_id + '').html(_output);

                console.log(_output);
                _nuevoestado = _estado == "Activo" ? true : false;

                _objIndex = _result.findIndex((obj => obj.ArryId == _row_id));
                _result[_objIndex].ArryPadeNombre = _descripcion;
                _result[_objIndex].ArryPadeValorV = _valorv;
                _result[_objIndex].ArryPadeValorI = _valori;
                _result[_objIndex].ArryEstado = _nuevoestado;
                $("#modalPARAMETER").modal("hide");
            }
        }
    });

    //editar detalles (ventana modal)
    $(document).on("click", ".btnEdit", function () {
        $("#formParam").trigger("reset");
        _row_id = $(this).attr("id");
        //_norden = $('#orden' + _row_id + '').val();
        _descripcionold = $('#detalle' + _row_id + '').val();
        _valorvold = $('#valorv' + _row_id + '').val();
        _valoriold = $('#valori' + _row_id + '').val();
        _estadoold = $('#estado' + _row_id + '').val();
        _tipoSave = 'edit';

        if (_estadoold == "Activo") {
            $("#chkEstadoDe").prop("checked", true);
            $("#lblEstadoDe").text("Activo");
            _estadocab = "Activo";
        } else {
            $("#chkEstadoDe").prop("checked", false);
            $("#lblEstadoDe").text("Inactivo");
            _estadocab = "Inactivo";
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



    //Checkbox estado del modal detalle
    $("#chkEstadoDe").click(function () {
        _checked = $("#chkEstadoDe").is(":checked");
        if (_checked) {
            $("#lblEstadoDe").text("Activo");
            _estado = 'Activo';
        } else {
            $("#lblEstadoDe").text("Inactivo");
            _estado = 'Inactivo';
        }
    });

    //Elimnar detalle

    $(document).on("click", ".btnDelete", function () {
        _row_id = $(this).attr("id");
        _descripcion = $('#detalle' + _row_id + '').val();
        Swal.fire({
            icon: 'error',
            title: 'Está Seguro de Borrar ' + _descripcion,
            text: 'El registro será eliminado..',
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
                 
                    FunReorganizarOrder(_result);
                });
            }
        });
    });

   

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
            //if (_otroval == 1) {
            //    item['ArryDisable'] = 'disabled="disabled"';
            //} else {
            //    item['ArryDisable'] = '';
            //}
            FunOrderDelete(_otroval, item.ArryId, item.ArryPadeNombre, item.ArryPadeValorV, item.ArryPadeValorI, item.ArryEstado);
            item['ArryId'] = parseInt(_otroval);
        });
        FunCambiarId();
    }

    function FunOrderDelete(_ordenx, _rowmod, _descripcion, _valorv, _valori, _estado) {
        _nuevoestado = _estado == true ? 'Activo' : 'Inactivo';
        _output = '<td style="display: none;">' + _ordenx + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _ordenx + '" value="' + _ordenx + '" /></td>';
        _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _ordenx + '" value="' + _descripcion + '" /></td>';
        _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _ordenx + '" value="' + _valorv + '" /></td>';
        _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _ordenx + '" value="' + _valori + '" /></td>';
        _output += '<td>' + _nuevoestado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _ordenx + '" value="' + _estado + '" /></td>';
        _output += '<td><div class="text-center"><div class="btn-group">'
        _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _ordenx + '"><i class="fa fa-edit"></i></button>';
        _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _ordenx + '"><i class="fa fa-alt"></i></button></div></div></td>';
        $('#row_' + _rowmod + '').html(_output);

    }

    function FunCambiarId() {
        $("#tblDetalle tbody tr").each(function (index) {
            id = $(this).attr('id');
            underScoreIndex = id.indexOf('_');
            id = id.substring(0, underScoreIndex + 1) + (parseInt(index) + 1);
            $(this).attr('id', id);
        });
    }

    //Guardar parametro y detalle
    $("#btnSave").click(function (eve) {
        _nomparametro = $.trim($("#txtParametro").val());
        _descripcion = $.trim($("#txtDescripcion").val());

        if (_nomparametro == '') {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'Ingrese Nombre del  Parámetro..!'
            });
            return;
        }

        if (_count == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Información',
                text: 'Ingrese al menos un Detalle..!'
            });
            return;
        }

        $.ajax({
            url: "/CabeceraEquipos/Edit",
            type: "POST",
            dataType: "json",
            data: { id: _id, nomparametro: _nomparametro, descripcion: _descripcion, estadocab: _estadocab, detalleparametros: _result },
            success: function (datos) {
                if (datos.success == true) {
                    window.location.href = datos.miUrl;
                    //windows.location.href = '/Parametro_Cabecera/Index';
                } else {
                    Swal.fire({
                        title: 'Información',
                        type: 'warning',
                        text: 'Nombre del Parámetro ya Existe..!'
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

    });
});
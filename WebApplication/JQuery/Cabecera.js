$(document).ready(function () {

    //variables globales
    var _tipoSave = 'add', _continuar = true, _seguir = true, _result = [],
        _count = 0, _estadoModal = 'Activo', _descripcionold, _valorvold, _otroval,
        _row_id, _estadoold, _valoriold, _nomparametro;
    var notification;
    var _descripcion, _valorv, _valori, _fila, _fil, _data, _id, _parametro;

    $("#modalPARAMETER").draggable({
        handle: ".modal-header"
    });

    $('#btnRegresar').click(function () {
        window.location.href = '/CabeceraEquipos/Index';
    });


    //Abrir nuevo Detalle con ventan modal (Create)
    $("#btnAdd").click(function () {
        $("#formParam").trigger("reset");
        $("#divcheck").hide();
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $(".modal-title").text("Nuevo Detalle");
        $("#btnAgregar").text("Agregar");
        $("#modalPARAMETER").modal("show");
        _tipoSave = 'add';
       
    });

    //Agregar nuevo detalle (Create) ventana modal
    $('#btnAgregar').click(function () {
        if ($.trim($('#txtDetalle').val()).length == 0) {
         
            notification = alertify.notify('ingrese detalle..!', 'warning', 5, function () { console.log('dismissed'); });
           
            return;
        }

        if ($.trim($('#txtValorV').val()).length == 0 && $.trim($('#txtValorI').val()).length == 0) {
         
            notification = alertify.notify('valor de texto o entero..?', 'warning', 5, function () { console.log('dismissed'); });

            return;
        }

        if ($.trim($('#txtValorV').val()).length > 0 && $.trim($('#txtValorI').val()).length > 0) {
          
            notification = alertify.notify('solo valor de texto o entero..!', 'error', 5, function () { console.log('dismissed'); });
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
                
                    notification = alertify.notify('nombre del parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                    _continuar = false;
                    return false;
                } else {
                    $.each(_result, function (i, item) {
                        if (_valori == 0) {
                            if (item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                             
                                notification = alertify.notify('valor texto parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                                _continuar = false;
                                return false;
                            } else {
                                _continuar = true;
                            }
                        } else {
                            if (item.ArryPadeValorI == _valori) {
                           
                                notification = alertify.notify('valor entero parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
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
             
                _count++;               
                _output = '<tr id="row_' + _count + '">';
                _output += '<td style="display: none;">' + _count + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _count + '" value="' + _count + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _count + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _count + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _count + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estadoModal + ' <input type="hidden" name="hidden_estado[]" id="estado' + _count + '" value="' + _estadoModal + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _count + '"><i class="fa fa-edit"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _count + '"><i class="fa fa-trash-alt"></i></button></div></div></td>';
                _output += '</tr>';
                
                $('#tblParameter').append(_output);

                _objeto = {
                    ArryId: _count,
                    ArryPadeNombre: _descripcion,
                    ArryPadeValorV: _valorv,
                    ArryPadeValorI: _valori,
                    ArryEstado: true,
                    
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
                       
                        var notification = alertify.notify('nombre del parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
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
                            
                                var notification = alertify.notify('valor entero del parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
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
                             
                                var notification = alertify.notify('valor texto del parametro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
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
                let _row_id, _output, _objIndex;
                _row_id = $('#hidden_row_id').val();
                _output = '<td style="display: none;">' + _row_id + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _row_id + '" value="' + _row_id + '" /></td>';
                _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _row_id + '" value="' + _descripcion + '" /></td>';
                _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _row_id + '" value="' + _valorv + '" /></td>';
                _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _row_id + '" value="' + _valori + '" /></td>';
                _output += '<td>' + _estadoModal + ' <input type="hidden" name="hidden_estado[]" id="estado' + _row_id + '" value="' + _estadoModal + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _row_id + '"><i class="fa fa-edit"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _row_id + '"><i class="fa fa-trash-alt"></i></button></div></div></td>';
                $('#row_' + _row_id + '').html(_output);

                let estado = _estadoModal == 'Activo' ? true : false;
                _objIndex = _result.findIndex((obj => obj.ArryId == _row_id));
                _result[_objIndex].ArryPadeNombre = _descripcion;
                _result[_objIndex].ArryPadeValorV = _valorv;
                _result[_objIndex].ArryPadeValorI = _valori;
                _result[_objIndex].ArryEstado = estado;
                $("#modalPARAMETER").modal("hide");
            }
        }
    });

    //Editar nuevo detalle (tabla dinamica)
    $(document).on("click", ".btnEdit", function () {
        
        $("#formParam").trigger("reset");
        _row_id = $(this).attr("id");
        _descripcionold = $('#detalle' + _row_id + '').val();
        _valorvold = $('#valorv' + _row_id + '').val();
        _valoriold = $('#valori' + _row_id + '').val();
        _estadoold = $('#estado' + _row_id + '').val();
        _tipoSave = 'edit';
        if (_estadoold == "Activo") {
            $("#chkEstado").prop("checked", true);
            $("#lblEstado").text("Activo");
        } else {
            $("#chkEstado").prop("checked", false);
            $("#lblEstado").text("Inactivo");
        }
        $('#txtDetalle').val(_descripcionold);
        $('#txtValorV').val(_valorvold);
        $('#txtValorI').val(_valoriold == 0 ? '' : _valoriold);
        $('#hidden_row_id').val(_row_id);
        $("#header").css("background-color", "#DEFAF9");
        $("#header").css("color", "gray");
        $(".modal-title").text("Editar Detalle");
        $("#divcheck").show();
        $("#btnAgregar").text("Modificar");
        $("#modalPARAMETER").modal("show");
    });

    //cambiar evento checkbox modal 
    $("#chkEstado").click(function () {
        _checked = $("#chkEstado").is(":checked");
        if (_checked) {
            $("#lblEstado").text("Activo");
            _estadoModal = 'Activo';
        } else {
            $("#lblEstado").text("Inactivo");
            _estadoModal = 'Inactivo';
        }
    });

    //Eliminar nuevo detalle (tabla dinamica)
    $(document).on("click", ".btnDelete", function () {
        _row_id = $(this).attr("id");
        _descripcion = $('#detalle' + _row_id + '').val();   
        alertify.confirm('desea elimnar detalle' + _descripcion + '?', 'sera eliminado..!', function () {
            alertify.success('Ok')
            Swal.close();
                   FunRemoveItemFromArr(_result, _descripcion);
                   $('#row_' + _row_id + '').remove();
                    _count--;
                    if (_count > 0) {
                        FunInactivaButton();
                    }
                    FunReorganizarOrder(_result);
        }
            , function () { alertify.error('cancelado') });
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
        _output = '<td style="display: none;">' + _ordenx + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _ordenx + '" value="' + _ordenx + '" /></td>';
        _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _ordenx + '" value="' + _descripcion + '" /></td>';
        _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _ordenx + '" value="' + _valorv + '" /></td>';
        _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _ordenx + '" value="' + _valori + '" /></td>';
        _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _ordenx + '" value="' + _estado + '" /></td>';
        _output += '<td><div class="text-center"><div class="btn-group">'
        _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _ordenx + '"><i class="fa fa-edit"></i></button>';
        _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _ordenx + '"><i class="fa fa-trash-alt"></i></button></div></div></td>';
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

    //Guardar Nuevo_Parametro_Detalle

    $("#btnGuardarPa").click(function (eve) {
        _nomparametro = $.trim($("#txtParametro").val()).toUpperCase();
        _descripcion = $.trim($("#txtDescripcion").val());

        if (_nomparametro == '') {
            
            notification = alertify.notify('ingrese nombre del parametro..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_count == 0) {
           
            notification = alertify.notify('ingrese detalle..!', 'warning', 5, function () { console.log('dismissed'); });
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
                    var notification = alertify.notify('paramentro ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

    });

    //editar cabecera_detalle_index

    $(document).on("click", "#btnEditar", function (eve) {
        eve.preventDefault();
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        window.location.href = "/CabeceraEquipos/Edit/" + _id;

    });

    //Eliminar cabecera(index)
    $(document).on("click", "#btnEliminar", function (eve) {
        _fil = $(this);
        _fila = $(this).closest("tr");
        _data = $('#tabla').dataTable().fnGetData(_fila);
        _id = _data[0];
        _parametro = _data[1];


        alertify.confirm('desea eliminar el parametro ' + _parametro + '?', 'el parametro sera eliminado..!', function () {
         
            $.ajax({
                url: "/CabeceraEquipos/Delete",
                type: "POST",
                dataType: "json",
                data: { id: _id },
                success: function (data) {
                    if (data.success == true) {
                        Tabla.row(_fil.parents('tr')).remove().draw();
                     
                        alertify.success('paramentro eliminado')
                    } else {
                   
                         notification = alertify.notify('hay detalles asociados..!', 'error ', 5, function () {
                            console.log('dismissed');
                        });
                    }
                },
                error: function (error) {
                    console.log(error);
                }

            });
        }
            , function () { alertify.error('cancelado') });    
       
    });



   
  
});
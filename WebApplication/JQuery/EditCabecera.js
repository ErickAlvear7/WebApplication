$(document).ready(function () {

    var _tipoSave = 'add', _continuar = true, _result = [], _count = 0, _estadocab, _seguir = true;

    //Caotura los valores anteriores de la cabecera
    _id = $('input#txtIdCabecera').val();
    _nameparametroold = $('input#txtParametro').val();

    _checked = $("#ChkEstadoCab").is(":checked");
    if (_checked) {
        _estadocab = "Activo";
    } else {
        _estadocab = "Inactivo";
    }

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
         
            var notification = alertify.notify('ingrese un detalle..!', 'warning ', 5, function () { console.log('dismissed'); });

            return;
        }

        if ($.trim($('#txtValorV').val()).length == 0 && $.trim($('#txtValorI').val()).length == 0) {
          
            var notification = alertify.notify('ingrese valor texto o entero..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if ($.trim($('#txtValorV').val()).length > 0 && $.trim($('#txtValorI').val()).length > 0) {
         
            var notification = alertify.notify('solo valor texto o entero..?', 'error ', 5, function () { console.log('dismissed'); });
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
               
                    var notification = alertify.notify('parametro ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                    _continuar = false;
                    return false;
                }
                else {
                    $.each(_result, function (i, item) {
                        if (_valori == 0) {
                            if (item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                             
                                var notification = alertify.notify('valor texto ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                                _continuar = false;
                                return false;
                            } else {
                                _continuar = true;
                            }
                        } else {
                            if (item.ArryPadeValorI == _valori) {
                            
                                var notification = alertify.notify('valor entero ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
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
          
                $("#modalPARAMETER").modal("hide");
            }
        }
        
        else {
            _continuar = false, _seguir = false;
            if (_descripcionold.toUpperCase() != _descripcion.toUpperCase()) {
                $.each(_result, function (i, _item) {
                    if (_item.ArryPadeNombre.toUpperCase() == _descripcion.toUpperCase()) {
                 
                        var notification = alertify.notify('parametro ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
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
                            
                                var notification = alertify.notify('valor entero ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                                _seguir = false;
                                return false;
                            } else {

                                _seguir = true;
                            }
                        });
                    } else {

                        _seguir = true;
                    }
                } else {
                    if (_valorvold.toUpperCase() != _valorv.toUpperCase()) {
                        $.each(_result, function (i, _item) {
                            if (_item.ArryPadeValorV.toUpperCase() == _valorv.toUpperCase()) {
                            
                                var notification = alertify.notify('valor texto ya existe..!', 'error ', 5, function () { console.log('dismissed'); });
                                _seguir = false;
                                return false;
                            } else {
                                _seguir = true;
                            }
                        });
                    } else _seguir = true;
                }
            }
            //alert(_seguir);
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

    //Elimnar detalle tabla dinamica

    $(document).on("click", ".btnDelete", function () {
        _row_id = $(this).attr("id");
        _descripcion = $('#detalle' + _row_id + '').val();
    
        alertify.confirm('desea eliminar el detalle ' + _descripcion + '?', 'el detalle sera eliminado..!', function () {
            alertify.success('detalle eliminado')
            FunRemoveItemFromArr(_result, _descripcion);
            $('#row_' + _row_id + '').remove();
            //_count--;

            //FunReorganizarOrder(_result);
        }
            , function () { alertify.error('cancelado') });
    });

   
    // Funcion eliminar detalle de base de datos
    function FunRemoveItemFromArr(arr, deta) {
        $.each(arr, function (i, item) {
            if (item.ArryPadeNombre == deta) {
                arr.splice(i, 1);
                return false;
            } else {
                _continuar = true;
            }
        });

        $.ajax({
            url: "/CabeceraEquipos/DeleteDetalle",
            type: "POST",
            dataType: "json",
            data: { idCab: _id ,idDet:_row_id},
            success: function (datos) {
                if (datos.success == true) {
                    //notify 
                  
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };



    function FunOrderDelete(_ordenx, _rowmod, _descripcion, _valorv, _valori, _estado) {
        _nuevoestado = _estado == true ? 'Activo' : 'Inactivo';
        _output = '<td style="display: none;">' + _rowmod + ' <input type="hidden" name="hidden_codigo[]" id="codigo' + _rowmod + '" value="' + _rowmod + '" /></td>';
        _output += '<td>' + _descripcion + ' <input type="hidden" name="hidden_detalle[]" id="detalle' + _rowmod + '" value="' + _descripcion + '" /></td>';
        _output += '<td>' + _valorv + ' <input type="hidden" name="hidden_valorv[]" id="valorv' + _rowmod + '" value="' + _valorv + '" /></td>';
        _output += '<td>' + _valori + ' <input type="hidden" name="hidden_valori[]" id="valori' + _rowmod + '" value="' + _valori + '" /></td>';
        _output += '<td>' + _nuevoestado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _rowmod + '" value="' + _nuevoestado + '" /></td>';
        _output += '<td><div class="text-center"><div class="btn-group">'
        _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _rowmod + '"><i class="fas fa-edit"></i></button>';
        _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _rowmod + '"><i class="fas fa-trash-alt"></i></button></div></div></td>';
        $('#row_' + _rowmod + '').html(_output);
        _count = _rowmod;
    }


    //Guardar parametro y detalle editados
    $("#btnSave").click(function (eve) {
        _nomparametro = $.trim($("#txtParametro").val());
        _descripcion = $.trim($("#txtDescripcion").val());

        if (_nomparametro == '') {
           
            var notification = alertify.notify('nombre del parametro..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_count == 0) {
        
            var notification = alertify.notify('ingrese detalle..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_result.length == 0) {
            _objeto = {
                ArryId:0,
                ArryPadeNombre:'',
                ArryPadeValorV:'',
                ArryPadeValorI: 0,
                ArryEstado: false,
            }

            _result.push(_objeto);
        }

        $.ajax({
            url: "/CabeceraEquipos/Edit",
            type: "POST",
            dataType: "json",
            data: { id: _id, nomparametro: _nomparametro, descripcion: _descripcion, estadocab: _estadocab, detalleparametros: _result },
            success: function (datos) {
                if (datos.success == true) {
                    window.location.href = datos.miUrl;               
                } else {
                  
                    var notification = alertify.notify('nombre del parametro ya exixte..!', 'error ', 5, function () { console.log('dismissed'); });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

    });
});
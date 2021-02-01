$(document).ready(function () {

    $(document).ready(function () {
        var _equipo, _grupo, _marca, _result = [], _continuar = true, _output, _count = 0, _grupoid, _marcaid, _modeloid, _estado = 'Activo',
            _objeto, _serie, _voltaje, _amperaje, _presion, _tipoSave = 'add', _checked, _estadoold, _equipoold, _seguir = false, _objIndex,
            _clieid;

        _clieid = $('#clienteid').val();

        $('#btnRegresar').click(function () {

            window.location.href = "/Clientes/Index";
        });


        $('#btnAgregar').click(function () {
            _output = '';
            _equipo = $('#txtNombreEquipo').val();
            _grupoid = $('#ddlGrupoEquipo').val();
            _marcaid = $('#ddlMarcaEquipo').val();
            _modeloid = $('#ddlModeloEquipo').val();
            //campos valor texto
            _grupo = $('#ddlGrupoEquipo').find('option:selected').text();
            _marca = $('#ddlMarcaEquipo').find('option:selected').text();
            _modelo = $('#ddlModeloEquipo').find('option:selected').text();

            _serie = $('#txtSerie').val();
            _voltaje = $('#txtVoltaje').val();
            _amperaje = $('#txtAmperaje').val();
            _presion = $('#txtPresion').val();

            if (_equipo.length == 0) {
                var notification = alertify.notify('ingrese equipo..!', 'warning', 5, function () { console.log('dismissed'); });
                return;
            }

            if (_grupo == '') {
                var notification = alertify.notify('seleccione grupo..!', 'warning', 5, function () { console.log('dismissed'); });
                return;
            }

            if (_marca == '') {
                var notification = alertify.notify('seleccione marca..!', 'warning', 5, function () { console.log('dismissed'); });
                return;
            }

            if (_tipoSave == 'add') {

                $.each(_result, function (i, item) {
                    if (item.ArryEquipo.toUpperCase() == _equipo.toUpperCase()) {
                        var notification = alertify.notify('equipo ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                        _continuar = false;
                        return false;
                    }
                    else {
                        _continuar = true;
                    }
                });

                if (_continuar) {
                    _count++;
                    _output = '<tr id="row_' + _count + '">';
                    _output += '<td style="display: none;">' + _count + ' <input type="hidden" name="hidden_equipoid[]" id="equipoid' + _count + '" value="' + _count + '" /></td>';
                    _output += '<td style="display: none;">' + _grupoid + ' <input type="hidden" name="hidden_grupo[]" id="grupoid' + _count + '" value="' + _grupoid + '" /></td>';
                    _output += '<td>' + _grupo + ' <input type="hidden" name="hidden_grupo[]" id="grupo' + _count + '" value="' + _grupo + '" /></td>';
                    _output += '<td>' + _equipo + ' <input type="hidden" name="hidden_equipo[]" id="equipo' + _count + '" value="' + _equipo + '" /></td>';
                    _output += '<td style="display: none;">' + _marcaid + ' <input type="hidden" name="hidden_marca[]" id="marcaid' + _count + '" value="' + _marcaid + '" /></td>';
                    _output += '<td>' + _marca + ' <input type="hidden" name="hidden_marca[]" id="marca' + _count + '" value="' + _marca + '" /></td>';
                    _output += '<td style="display: none;">' + _modeloid + ' <input type="hidden" name="hidden_modelo[]" id="modeloid' + _count + '" value="' + _modeloid + '" /></td>';
                    _output += '<td>' + _modelo + ' <input type="hidden" name="hidden_modelo[]" id="modelo' + _count + '" value="' + _modelo + '" /></td>';
                    _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _count + '" value="' + _estado + '" /></td>';
                    _output += '<td style="display: none;">' + _serie + ' <input type="hidden" name="hidden_estado[]" id="serie' + _count + '" value="' + _serie + '" /></td>';
                    _output += '<td style="display: none;">' + _voltaje + ' <input type="hidden" name="hidden_estado[]" id="voltaje' + _count + '" value="' + _voltaje + '" /></td>';
                    _output += '<td style="display: none;">' + _amperaje + ' <input type="hidden" name="hidden_estado[]" id="amperaje' + _count + '" value="' + _amperaje + '" /></td>';
                    _output += '<td style="display: none;">' + _presion + ' <input type="hidden" name="hidden_estado[]" id="presion' + _count + '" value="' + _presion + '" /></td>';
                    _output += '<td><div class="text-center"><div class="btn-group">'
                    _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _count + '"><i class="fas fa-pen"></i></button>';
                    _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _count + '"><i class="fas fa-trash"></i></button></div></div></td>';
                    _output += '</tr>';

                    $('#datosequipo').append(_output);

                    _objeto = {
                        ArryId: _count,
                        ArryEquipoId: 0,
                        ArryGrupo: _grupoid,
                        ArryMarca: _marcaid,
                        ArryEquipo: _equipo,
                        ArryModelo: _modeloid,
                        ArrySerie: _serie,
                        ArryVoltaje: _voltaje,
                        ArryAmperaje: _amperaje,
                        ArryPresion: _presion,
                        ArryEstado: _estado
                    }
                    _result.push(_objeto);

                    FunLimpiarCampos();

                }
            } else {
                _continuar = false;
                if (_equipoold.toUpperCase() != _equipo.toUpperCase()) {
                    $.each(_result, function (i, _item) {
                        if (_item.ArryEquipo.toUpperCase() == _equipo.toUpperCase()) {
                            var notification = alertify.notify('nombre del equipo ya existe..!', 'warning', 5, function () { console.log('dismissed'); });
                            _seguir = false;
                            return false;
                        } else {
                            _seguir = true;
                        }
                    });
                } else _seguir = true;
            }

            if (_seguir) {
                //_rowid = $('#hidden_rowid').val();
                _rowid = $('#hidden_row_id').val();

                _output += '<td style="display: none;">' + _rowid + ' <input type="hidden" name="hidden_equipoid[]" id="equipoid' + _rowid + '" value="' + _rowid + '" /></td>';
                _output += '<td style="display: none;">' + _grupoid + ' <input type="hidden" name="hidden_grupo[]" id="grupoid' + _rowid + '" value="' + _grupoid + '" /></td>';
                _output += '<td>' + _grupo + ' <input type="hidden" name="hidden_grupo[]" id="grupo' + _rowid + '" value="' + _grupo + '" /></td>';
                _output += '<td>' + _equipo + ' <input type="hidden" name="hidden_equipo[]" id="equipo' + _rowid + '" value="' + _equipo + '" /></td>';
                _output += '<td style="display: none;">' + _marcaid + ' <input type="hidden" name="hidden_marca[]" id="marcaid' + _rowid + '" value="' + _marcaid + '" /></td>';
                _output += '<td>' + _marca + ' <input type="hidden" name="hidden_marca[]" id="marca' + _rowid + '" value="' + _marca + '" /></td>';
                _output += '<td style="display: none;">' + _modeloid + ' <input type="hidden" name="hidden_modelo[]" id="modeloid' + _rowid + '" value="' + _modeloid + '" /></td>';
                _output += '<td>' + _modelo + ' <input type="hidden" name="hidden_modelo[]" id="modelo' + _rowid + '" value="' + _modelo + '" /></td>';
                _output += '<td>' + _estado + ' <input type="hidden" name="hidden_estado[]" id="estado' + _rowid + '" value="' + _estado + '" /></td>';
                _output += '<td style="display: none;">' + _serie + ' <input type="hidden" name="hidden_estado[]" id="serie' + _rowid + '" value="' + _serie + '" /></td>';
                _output += '<td style="display: none;">' + _voltaje + ' <input type="hidden" name="hidden_estado[]" id="voltaje' + _rowid + '" value="' + _voltaje + '" /></td>';
                _output += '<td style="display: none;">' + _amperaje + ' <input type="hidden" name="hidden_estado[]" id="amperaje' + _rowid + '" value="' + _amperaje + '" /></td>';
                _output += '<td style="display: none;">' + _presion + ' <input type="hidden" name="hidden_estado[]" id="presion' + _rowid + '" value="' + _presion + '" /></td>';
                _output += '<td><div class="text-center"><div class="btn-group">'
                _output += '<button type="button" name="btnEdit" class="btn btn-outline-info btn-sm ml-3 btnEdit" id="' + _rowid + '"><i class="fas fa-pen"></i></button>';
                _output += '<button type="button" name="btnDelete" class="btn btn-outline-danger btn-sm ml-3 btnDelete" id="' + _rowid + '"><i class="fas fa-trash"></i></button></div></div></td>';

                $('#row_' + _rowid + '').html(_output);

                _objIndex = _result.findIndex((obj => obj.ArryId == _rowid));
                _result[_objIndex].ArryGrupo = _grupoid;
                _result[_objIndex].ArryMarca = _marcaid;
                _result[_objIndex].ArryEquipo = _equipo;
                _result[_objIndex].ArryModelo = _modeloid;
                _result[_objIndex].ArrySerie = _serie;
                _result[_objIndex].ArryVoltaje = _voltaje;
                _result[_objIndex].ArryAmperaje = _amperaje;
                _result[_objIndex].ArryPresion = _presion;
                _result[_objIndex].ArryEstado = _estado;

                FunLimpiarCampos();

                $("#divestado").show();
                $("#btnAgregar").text("Agregar");
                $('#btnAgregar').attr('class', 'btn btn-outline-primary');
                _tipoSave = 'add';
            }

        });

        $(document).on("click", ".btnEdit", function () {
            $("#formParam").trigger("reset");
            _rowid = $(this).attr("id");
            alert(_rowid);
            _equipoid = $('#equipoid' + _rowid + '').val();
            _grupoid = $('#grupoid' + _rowid + '').val();
            _equipoold = $('#equipo' + _rowid + '').val();
            _marcaid = $('#marcaid' + _rowid + '').val();
            _modeloid = $('#modeloid' + _rowid + '').val();
            _serie = $('#serie' + _rowid + '').val();
            _voltaje = $('#voltaje' + _rowid + '').val();
            _amperaje = $('#amperaje' + _rowid + '').val();
            _presion = $('#presion' + _rowid + '').val();
            _estadoold = $('#estado' + _rowid + '').val();

            $('#txtNombreEquipo').val(_equipo);
            $('#ddlGrupoEquipo').val(_grupoid);
            $('#ddlMarcaEquipo').val(_marcaid);
            $('#ddlModeloEquipo').val(_modeloid);
            $('#txtSerie').val(_serie);
            $('#txtVoltaje').val(_voltaje);
            $('#txtAmperaje').val(_amperaje);
            $('#txtPresion').val(_presion);

            $("#divestado").show();
            $("#btnAgregar").text("Modificar");
            $('#btnAgregar').attr('class', 'btn btn-outline-success');

            $('#hidden_row_id').val(_rowid);
            _tipoSave = 'edit';

            //$('#btnAgregar').addClass('<i class="fas fa-plus"></i>');            
            //$("#btnAgregar").prop('class', 'btn btn-outline-success');
            //document.getElementById("divmp").style.display = "block";

            if (_estado == "Activo") {
                $("#ChkEstado").prop("checked", true);
                $("#LblEstado").text("Activo");
            } else {
                $("#ChkEstado").prop("checked", false);
                $("#LblEstado").text("Inactivo");
            }
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

        function FunLimpiarCampos() {
            $('#txtNombreEquipo').val('');
            $('#ddlGrupoEquipo').val('');
            $('#ddlMarcaEquipo').val('');
            $('#ddlModeloEquipo').val('');

            $('#txtSerie').val('');
            $('#txtVoltaje').val('');
            $('#txtAmperaje').val('');
            $('#txtPresion').val('');
        }

        $('#btnGuardar').click(function () {
            if (_result.length == 0) {
                var notification = alertify.notify('ingrese al menos 1 equipo..!', 'warning', 5, function () { console.log('dismissed'); });
                return;
            }

            $.ajax({
                url: "/Clientes/SaveEquipoCliente",
                type: "POST",
                dataType: "json",
                data: { clieteid: _clieid, equipos: _result },
                success: function (datos) {
                    if (datos.success == true) {
                        window.location.href = datos.miUrl;
                        //windows.location.href = '/Tbl_Clientes/Index';
                    } else {
                        var notification = alertify.notify('nombre del parametro ya existe..!', 'warning', 5, function () { console.log('dismissed'); });
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });

        });

    });
   



});
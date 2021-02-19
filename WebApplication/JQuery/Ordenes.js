$(document).ready(function () {
    var _fecha_inicio, _fecha_fin, _hora_inicio

    var fecha = new Date();
    var hora = fecha.getHours() + ":" + fecha.getMinutes();

    _fecha_inicio = moment(fecha).format("DD/MM/YYYY");
    _fecha_fin = moment(fecha, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");
    //_hora_inicio = moment(h).format('HH:MM');	

    $('#txtFechaInicio').val(_fecha_inicio);
    $('#txtFechaFin').val(_fecha_fin);
    $('#txtHoraIni').val(hora);
    $('#txtHoraFi').val(hora);	  



    $('#txtFechaInicio').datepicker(
        {
            inline: true,
            dateFormat: "dd/mm/yy",
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            numberOfMonths: 1,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+5"
        });

    $('#txtFechaFin').datepicker(
        {
            inline: true,
            dateFormat: "dd/mm/yy",
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            numberOfMonths: 1,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+5"
        });



    //Timepicker
    $('#txtHoraInicio').datetimepicker({
        format: 'hh:mm'
    });

    $('#txtHoraFin').datetimepicker({
        format: 'hh:mm '
    });

    $('.select2').select2();



    $('#btnGuardar').click(function () {

        _clienteid = $('#ddlCliente').val();
        _equipoid = $('#ddlEquipo').val();
        _tipotrabajo = $('#ddlTipoTrabajo').val();
        _tecnico = $('#ddlTecnicos').val();
        _descripcion = $.trim($('#txtDescripcion').val());
        _nota = $.trim($('#txtNotas').val());
        _fechainicio = $('#txtFechaInicio').val();
        _horainicio = $('#txtHoraIni').val();
        _fechafin = $('#txtFechaFin').val();
        _horafin = $('#txtHoraFi').val();

        if (_clienteid == '') {
           
            var notification = alertify.notify('seleccione cliente..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_equipoid == '0') {
            var notification = alertify.notify('seleccione equipo..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tipotrabajo == '') {
            var notification = alertify.notify('seleccione trabajo..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tecnico == '') {
            var notification = alertify.notify('seleccione tecnico..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_descripcion == '') {
            var notification = alertify.notify('ingrese descripcion..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_fechainicio == '') {
            var notification = alertify.notify('ingrese fecha inicio..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_horainicio == '') {
            var notification = alertify.notify('ingrese hora inicio..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        var _fechainiot = _fechainicio + " " + _horainicio;
        var _fechafinot = _fechafin + " " + _horafin;

        $.ajax({
            url: "/Clientes/GuardarOrdenTrabajo",
            type: "POST",
            dataType: "json",
            data: {
                clienteid: _clienteid, equipoid: _equipoid, tipotrabajo: _tipotrabajo, operario: _tecnico, problema: _descripcion, nota: _nota,
                fechaini: _fechainiot, fechafin: _fechafinot
            },
            success: function (datos) {
                if (datos.success == true) {
                    window.location.href = datos.miUrl;
                    //window.location.href = '/Tbl_Clientes/Index';
                } else {
                    var notification = alertify.notify('ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                    return;
                }
            },
            error: function (error) {
                console.log(error);
            }
        });


    });

});
$(document).ready(function () {
    var _clienteid, _equipoid, _tipotrabajo, _tecnico, _descripcion, _nota, _fechainicio, _fechafin, _horafin;
    var notification;
    var _fecha_inicio, _fecha_fin, _fechaactual;
    var fecha = new Date();
    var hora = fecha.getHours() + ":" + fecha.getMinutes();

    _fecha_inicio = moment(fecha).format("DD/MM/YYYY");
    _fecha_fin = moment(fecha, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");


    $('#txtFechaInicio').val(_fecha_inicio);
    $('#txtFechaFin').val(_fecha_fin);
    $('#txtHoraIni').val(hora);
    $('#txtHoraFi').val(hora);	 


    $('#btnRegresar').click(function () {

        window.location.href = "OrdenIndex";

    });



    $('.formatofecha').datepicker(
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
           
             notification = alertify.notify('seleccione cliente..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_equipoid == '0') {
             notification = alertify.notify('seleccione equipo..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tipotrabajo == '') {
             notification = alertify.notify('seleccione trabajo..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_tecnico == '') {
             notification = alertify.notify('seleccione tecnico..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_descripcion == '') {
             notification = alertify.notify('ingrese descripcion..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_fechainicio == '') {
             notification = alertify.notify('ingrese fecha inicio..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_horainicio == '') {
             notification = alertify.notify('ingrese hora inicio..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        if (_horafin == '') {
             notification = alertify.notify('ingrese hora fin..!', 'warning', 5, function () { console.log('dismissed'); });
            return;
        }

        var _fechainiot = _fechainicio + " " + _horainicio;
        var _fechafinot = _fechafin + " " + _horafin;

        _fechaactual = moment(fecha, "DD/MM/YYYY HH:mm").add(40, 'minutes').format("DD/MM/YYYY HH:mm");

        if (_fechainiot < _fechaactual) {

            notification = alertify.notify('La Fecha de Inicio no Puede ser Menor a la Actual..!', 'danger', 5, function () { console.log('dismissed'); });
            return;
        }



        if (_fechafinot < _fechainiot) {

            notification = alertify.notify('La Fecha Fin no Puede ser Menor a la Fecha Inicio..!', 'danger', 5, function () { console.log('dismissed'); });
            return;
        }


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
                
                } else {
                     notification = alertify.notify('ya existe..!', 'error', 5, function () { console.log('dismissed'); });
                    return;
                }
            },
            error: function (error) {
                console.log(error);
            }
        });


    });

});
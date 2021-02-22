$(document).ready(function () {

    var _usuario, _password
    var notification;
   
    $("#txtUsuario").val('');
    $("#txtPassword").val('');

    $("#BtnLogin").click(function (eve) {
        eve.preventDefault();
        _usuario = $("#txtUsuario").val();
        if (_usuario == "") {
       
            notification = alertify.notify('ingrese usuario..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }
        _password = $("#txtPassword").val();
        if (_password == "") {
       
            notification = alertify.notify('ingrese contraseña..!', 'warning ', 5, function () { console.log('dismissed'); });
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/Login/Indexv1',
            dataType: 'json',
            data: { user: _usuario, pass: _password },
            success: function (datos) {
                if (datos.success) {
                    window.location.href = datos.resul;
                } else {

                    notification = alertify.notify('usuario y/o contraseña incorrecto', 'danger ', 5, function () { console.log('dismissed'); });
                    $("#txtUsuario").val('');
                    $("#txtPassword").val('');
                    
                }
            }

        });
    });

});
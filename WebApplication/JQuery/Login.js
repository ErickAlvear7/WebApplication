$(document).ready(function () {
   
    $("#TxtUsuario").val('');
    $("#TxtPassword").val('');

    $("#BtnLogin").click(function (eve) {
        eve.preventDefault();
        _usuario = $("#TxtUsuario").val();
        if (_usuario == "") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'ingrese usuario',
            });
       
            return;
        }
        _password = $("#TxtPassword").val();
        if (_password == "") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'ingrese contraseña',
            });
        
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

                    Swal.fire({
                        icon: 'error',
                        title: 'Upss...',
                        text: 'usuario y/o contraseña incorrecto',

                    });
                    $("#TxtUsuario").val('');
                    $("#TxtPassword").val('');
                    
                }
            }

        });
    });

});
$(document).ready(function () {

    $("#btnNuevo").click(function (eve) {
        eve.preventDefault();
        $("#modal-content").load("/Usuarios/Create");
        $(".modal-title").text("Nuevo Usuario");
        $("#header").css("background-color", "#2F90F3");
        $("#header").css("color", "white");
        _opcion = 0, _estado = true;
        _id = 0;
    });
});
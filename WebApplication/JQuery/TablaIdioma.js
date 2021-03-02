$(document).ready(function () {



   Tabla= $('#tabla').DataTable({

        "columnDefs": [{
            "data": null
        },
        {
            "targets": 0,
            "visible": false
        }],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de TOTAL registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando..."
        }

   });

    $("#myModal").draggable({
        handle: ".modal-header"
    }); 

    TblClientes = $('#tblclientes').DataTable({
        "searching": false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "columnDefs": [{
            "data": null
        },
        { targets: 'no-sort' },
        { orderable: false, targets: '_all' }
        ]
    });  



});
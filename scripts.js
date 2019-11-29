$(document).ready(() => {
    var _codigo = 1;

    $("#txt_codigo").val(_codigo);
    $("#txt_descripcion").attr("placeholder", "Nombre o descripción del artículo")
    $("#txt_precio").attr("placeholder", 0)
    $("#txt_cantidad").attr("placeholder", 1)

    $(".captura").submit(function (e) { 
        e.preventDefault();
        
        let codigo = $("#txt_codigo").val();
        let descripcion = $("#txt_descripcion").val();
        let precio = $("#txt_precio").val() ? $("#txt_precio").val() : $("#txt_precio").attr("placeholder");
        let cantidad = $("#txt_cantidad").val() ? $("#txt_cantidad").val() : $("#txt_cantidad").attr("placeholder");
        
        if(descripcion == "") {
            alert("Ingresa al menos una descripción");
            return;
        }

        addRow(
            codigo,
            descripcion,
            precio,
            cantidad
        )
        
        $("#txt_codigo").val( (i, origText) => {
            _codigo = origText;
            codigo++;
            return codigo;
        })
        $("#txt_descripcion").val("");
        $("#txt_precio").val("");
        $("#txt_cantidad").val("");

        $("#txt_descripcion").focus();
    });

    function sheetItem(text) {
        return $("<span></span>").text(text).attr("class", "item")
    }

    function addRow(codigo, descripcion, precio, cantidad) {
        $(".items").append(
            sheetItem(codigo),
            sheetItem(descripcion),
            sheetItem("$"+precio),
            sheetItem(cantidad)
        );
    }

    $("#txt_codigo").keypress(function (evt) {
        evt.preventDefault();
    });
});
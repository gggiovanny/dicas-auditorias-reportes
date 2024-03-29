//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
$(document).ready(() => {
    var urlBase = "http://grupodicas.com.mx/api/";
    var TOKEN = "";

    var auditoriaLoaded = false;
    var activosLoaded = false;

    init();
    function init() {
        TOKEN = getUrlParameter("token");  
        agregarCabeceraActivos();
        getAuditoriasIDs(TOKEN);

        $("#btn-imprimir").click(function (e) { 
            e.preventDefault();
            window.print();
        });
    }    

    function setupDropDownClick() {
        $(".dropdown-item").click(function (e) { 
            e.preventDefault();
            
            let idAuditoria = $(this).text();
            console.log(idAuditoria);
            clear();
            getAuditoria(TOKEN, idAuditoria);
            getAuditoriaActivos(TOKEN, idAuditoria);    
        }); 
    }    

    function getAuditoria(token, idAuditoria) {
        let urlPath = "auditorias/"+idAuditoria;

        $.getJSON(urlBase + urlPath, { "token": token, "page_size": "10000" },
            function (data, textStatus, jqXHR) {
                if(data.status != "ok")
                    return;
                
                agregarKeyValueAuditoria("ID", data.list.id);
                agregarKeyValueAuditoria("Descripcion", data.list.descripcion);
                agregarKeyValueAuditoria("Estatus", data.list.status);
                agregarKeyValueAuditoria("Autor", data.list.autor_nombre);
                agregarKeyValueAuditoria("Fecha creada", data.list.fechaCreacion);
                agregarKeyValueAuditoria("Fecha guardada", data.list.fechaGuardada ? data.list.fechaGuardada : "Sin establecer");
                agregarKeyValueAuditoria("Empresa", data.list.empresa);
                agregarKeyValueAuditoria("Departamento", data.list.departamento);
                agregarKeyValueAuditoria("Clasficacion", data.list.clasificacion);
                setResponsable(data.list.autor_nombre);

                auditoriaLoaded = true;
                if(auditoriaLoaded && activosLoaded) {
                     $("#btn-imprimir").fadeIn();

                }
            }
        );
    }

    function getAuditoriasIDs(token) {
        let urlPath = "auditorias";

        $.getJSON(urlBase + urlPath, { "token": token, "page_size": "10000" },
            function (data, textStatus, jqXHR) {
                if(data.status != "ok")
                    return;
                console.log(data);
                
                for(let fila of data.list) {
                    agregarDropDownFila(fila.id);
                }
                setupDropDownClick();
            }
        );
    }

    

    function getAuditoriaActivos(token, idAuditoria) {
        let urlPath = "activos";

        $.getJSON(urlBase + urlPath, {
            "token": token,
            "page_size": "10000",
            "auditoria_actual": idAuditoria
        },
            function (data, textStatus, jqXHR) {
                // console.log(data.list);

                if(data.status != "ok")
                    return;
                
                for (let row of data.list) {
                    agregarFilaActivos(
                        row.idActivoFijo,
                        row.descripcion,
                        row.existencia_guardada,
                        row.existencia_actual
                    )
                }

                activosLoaded = true;
                if(auditoriaLoaded && activosLoaded) {
                     $("#btn-imprimir").fadeIn();

                }


            }
        );
    }

    function clear() {
        clearTablaActivos();
        clearAuditoria();
        activosLoaded = false;
        auditoriaLoaded = false;
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    function tablaCelda(text, esCabecera = false) {
        let clase = "";
        if(esCabecera == true)
            clase = "column-name";
        else
            clase = "item";

        return $("<span></span>").text(text).attr({
            "class": clase
        });
    }    

    function agregarFilaActivos(id, description, existencia_anterior, existencia_actual) {
        $(".items").append(
            tablaCelda(id),
            tablaCelda(description),
            tablaCelda(existencia_anterior),
            tablaCelda(existencia_actual)
        );
    }

    function agregarCabeceraActivos() {
        $(".items").append(
            tablaCelda("ID", true),
            tablaCelda("Descripción", true),
            tablaCelda("Existencia anterior", true),
            tablaCelda("Existencia actual", true),
        );
    }

    function clearTablaActivos() {
        $(".items").text("");
        agregarCabeceraActivos();        
    }
    
    function drowpDownFila(text) {
        return $("<p></p>").text(text).attr({
            "class": "dropdown-item"
        });
    }

    function agregarDropDownFila(text) {
        $(".dropdown-content").append(
            drowpDownFila(text)
        );
    }

    function clearDropdown() {
        $("dropdown-content").text("");   
    }
    
    

    function key(text) {
        return $("<span></span>").text(text).attr({
            "class": "dato-auditoria key"
        });
    }

    function value(text) {
        return $("<span></span>").text(text).attr({
            "class": "dato-auditoria value"
        });
    }   

    function agregarKeyValueAuditoria(clave, valor) {
        $("#datos-auditoria").append(
            key(clave),
            value(valor)
        );
    }

    function clearAuditoria() {
        $("#datos-auditoria").text("");
    }

    function setResponsable(text) {
        $("#nombre-responsable").text(text);
    }
});
//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
$(document).ready(() => {
    var urlBase = "http://grupodicas.com.mx/api/";

    init();
    function init() {
        getToken();
        // getAuditorias("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzY0NDgwNjMsImNpZCI6IjNiYzUwMmVmNWY3NjkzODRiOTA1ZDg0ODEyNjViYTUwOTc0Zjk5OGIiLCJkYXRhIjp7InVzZXJuYW1lIjoiZ2dvbnphbGV6IiwiaWQiOjE3fX0.Ep1Odfn33PCMrWWpl0ZcmTMUJQIV-D38rnVThNxsdNA");
    }

    function getToken() {
        let urlPath = "auth";

        $.getJSON(urlBase + urlPath, { "user": "ggonzalez", "passwd": "Chuck.Norris.19" },
            function (data, textStatus, jqXHR) {
                getAuditoriaActivos(data.token, 67);
                // console.log(data.token);
            }
        );

    }

    function getAuditorias(token) {
        let urlPath = "auditorias";

        $.getJSON(urlBase + urlPath, { "token": token, "page_size": "10000" },
            function (data, textStatus, jqXHR) {
                console.log(data.list);
                for (let row of data.list) {
                    agregarFilaActivos(
                        row.id,
                        row.descripcion,
                        row.status,
                        row.empresa
                    )
                }
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
                console.log(data.list);

                for (let row of data.list) {
                    agregarFilaActivos(
                        row.idActivoFijo,
                        row.descripcion,
                        row.existencia_guardada,
                        row.existencia_actual
                    )
                }


            }
        );
    }






    function tablaCelda(text) {
        return $("<span></span>").text(text).attr("class", "item")
    }

    function agregarFilaActivos(id, description, existencia_anterior, existencia_actual) {
        $(".items").append(
            tablaCelda(id),
            tablaCelda(description),
            tablaCelda(existencia_anterior),
            tablaCelda(existencia_actual)
        );
    }

    $("#txt_codigo").keypress(function (evt) {
        evt.preventDefault();
    });
});
$(document).ready(function () {
    var urlBase = "http://grupodicas.com.mx/api/";
    var host = "http://127.0.0.1:5500/"


    $("#frmLogin").submit(function (e) { 
        e.preventDefault();
        
        let usuario = $("#usuario").val() ? $("#usuario").val() : "";
        let password = $("#password").val() ? $("#password").val() :  "";

        getToken(usuario, password);
        
    });

    function getToken(user, password) {
        let urlPath = "auth";

        $.getJSON(urlBase + urlPath, { "user": user, "passwd": password },
            function (data, textStatus, jqXHR) {
                console.log(data);
                $("#usuario").val("");
                $("#login_status").text(data.description);
                $("#login_status").show();

                if(data.status == "ok") {
                    window.open(host+"reporte/?token="+data.token);
                }
            }
        );

    }

    function clear() {
        $("#usuario").val("");
        $("#password").val("");
    }
    

});
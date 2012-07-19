function loadsGetTestLoads() {
    console.log("Getting test loads - testing authentication");
    $.ajax({
        type: "GET",
        url: "http://192.168.1.111/CarrierVisibility/Loads/TestCordovaAuthorization",
        crossDomain: true,
        timeout: 2000,
        dataType: "jsonp",
        jsonpCallback: "authRetrievedLoads",
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(errorThrown + textStatus + jqXHR);
            console.log("jsonp failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    console.log("after the ajax call");
    return false;
}

function authRetrievedLoads(data) {
    console.log(data.success);
    $("#testGetLoads").html("Success: " + data.success + " - Action: " + data.action)
    console.log("html changed");
}
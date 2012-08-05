function loadsGetTestLoads() {
    console.log("Getting test loads - testing authentication");
    $.ajax({
        type: "GET",
        url: ajaxBase + "Loads/TestCordovaAuthorization",
        crossDomain: true,
        timeout: 2000,
        dataType: "jsonp",
        jsonpCallback: "loadsAuthRetrievedLoads",
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(errorThrown + textStatus + jqXHR);
            console.log("jsonp failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    return false;
}

function loadsAuthRetrievedLoads(data) {
    console.log(data.success);
    if (data.success != "true") {
        console.log("failed validation");
        authReturnToLogonScreen();
    }

    $("#testGetLoads").html("Success: " + data.success + " - Action: " + data.action);
    console.log("html changed");
}

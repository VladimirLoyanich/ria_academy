define(
    "modules/main",
    [
        "modules/create_ul",
        "modules/set_on_click",
        "jquery"
    ],
    function (create_ul, set_on_click, $) {
        function getData(){
        return $.ajax({
            url: "./files/data.json",
            dataType: "json"
        });
    }

        getData().done(function(data){
            create_ul(data, $);
            set_on_click($);
        }, function(error){
//            console.log("houston we have a problem "+error);
        });

});
(function() {
    require.config({
        urlArgs: "v=0.01",
        paths: {
            jquery: "../lib/jquery/dist/jquery.min"
        }
    });
    define(['modules/main']);
})();


/**
 * @author taopy
 */
(function() {
    var baseUrl = location.pathname.replace(/\/[^\/]+$/, '');
    var jsurl = baseUrl + "/js/";
    var config = {
        _debug : location.href.indexOf("debug") != -1,
        parseOnLoad : true,
        locale : 'zh',
        packages : [{
            "name" : "_base",
            "location" : jsurl + "_base"
        },{
            "name" : "map",
            "location" : jsurl + "map"
        }
        ,{
            "name" : "tools",
            "location" : jsurl + "tools"
        },{
            "name" : "widgets",
            "location" : jsurl + "widgets"
        }]
    };

    window.dojoConfig = config;
})();

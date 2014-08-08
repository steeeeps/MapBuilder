/**
 * @author taopy
 */
define("tools/toolbar", ["tools/FullScreen", 
                         "tools/MapGallery", 
                         "tools/Toolgroup",
                         "tools/DistanceMeasure",
                         "tools/AreaMeasure"], function(FullScreen, MapGallery, Toolgroup,DistanceMeasure,AreaMeasure) {
                             
    function init(map) {
        
        var dm=new DistanceMeasure(map);
        var am=new AreaMeasure(map);
        new MapGallery(map);
        var group = new Toolgroup({
            text : "测量"
        });
        group.add([dm,am]);
        var f = new FullScreen(map);
    }
    
    return {
        init : init
    };
})

/**
 * @author taopy
 */

define("map/map", ["esri/map", 
                   "esri/layers/ArcGISTiledMapServiceLayer", 
                   "esri/geometry/Extent", 
                   "esri/SpatialReference",
                   "dojo/json",
                   "esri/tasks/GeometryService", 
                   "dojo/text!./map.json"], 
                   function(Map, ArcGISTiledMapServiceLayer, Extent,SpatialReference,json, GeometryService,config) {
                       
    
    function initMap() {
        var configObj = json.parse(config);
        var initExtent = new Extent(configObj.extent.XMin, configObj.extent.YMin, configObj.extent.XMax, configObj.extent.YMax, new SpatialReference({
            "wkid" : configObj.extent.SR
        }));
        var map = new Map("mapDiv", {
            logo : false,
            extent : initExtent,
            maxZoom : configObj.extent.maxZoom,
            minZoom : configObj.extent.minZoom
        });
        var tiledMapServiceLayer = new ArcGISTiledMapServiceLayer(configObj.basemap.tileServiceUrl);
        map.addLayer(tiledMapServiceLayer);

        M.onMapResize = function() {
            map.resize();
            map.reposition();
        }
        initEsriConfig(configObj);
        return map;
    }

    function initEsriConfig(config) {
        esri.config.defaults.io.proxyUrl = config.proxy.url;
        esri.config.defaults.io.alwaysUseProxy = config.proxy.alwaysUseProxy;
        esri.config.defaults.geometryService = new GeometryService(config.geometryService.url);

    }


    return {
        initMap : initMap
    }

});

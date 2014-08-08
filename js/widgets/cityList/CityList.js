/**
 * 城市列表小部件
 * 能够快速定位当前位置，定位配制的城市位置或范围
 * 同时可以将地理编码功能加入，添加快速搜索定位的功能
 * 
 * @author taopy
 */
define("widgets/cityList/CityList",
        ["dojo/_base/declare",
        "dojo/string",
        "dojo/dom-construct",
        "dojo/on",
        "widgets/_base/_BaseWidget",
        "esri/geometry/Extent", 
        "esri/SpatialReference",
        "dojo/_base/lang",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        'esri/geometry/webMercatorUtils',
        "esri/symbols/SimpleMarkerSymbol", 
        "esri/symbols/SimpleLineSymbol", 
        "esri/graphic",
        "dojo/_base/Color",
        "esri/tasks/ProjectParameters"],
        function(declare,ds,dc,on,BaseWidget,Extent,SpatialReference,lang,
                 GraphicsLayer,Point,webMercatorUtils,SimpleMarkerSymbol,SimpleLineSymbol,Graphic,Color,ProjectParameters){
     
     
    return declare(BaseWidget, {
        _geolocationLayerID : "map_geolocation_graphicslayer",
        _geolocationLayer : null,
        widgetName : "cityList",
        widgetTitle : "城市列表",
        _tempFile : false,
        templateString : '<div class="cityList"></div>',
        constructor : function(args, map) {
        },
        postCreate : function() {
            this.inherited(arguments);
            if (!this.config)
                return;
            for (var i = 0, len = this.config.length; i < len; i++) {
                var city = this.config[i];
                this._createCityNode(city);
            }
        },
        _createCityNode : function(city) {
            var a = dc.create("a", {
                "href" : "javascript:void(0)",
                "name" : city.name,
                "code" : city.code,
                "class" : "cityItem" + (city.code === "0" ? " fwb" : ""),
                "innerHTML" : city.name,
            }, this.domNode);
            if (city.code === "0") {
                on(a, "click", lang.hitch(this, this._geolocation));
            } else {
                on(a, "click",lang.hitch(this,function() {
                    this._changeExtent(city);
                }));
            }
        },

        _changeExtent : function(city) {
            var extent = new Extent(city.extent.xmin, city.extent.ymin, city.extent.xmax, city.extent.ymax, (city.extent.spatialReference ? new SpatialReference(city.extent.spatialReference) : map.spatialReference));
            this.map.setExtent(extent);
        },

        _geolocation : function() {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(lang.hitch(this, this.locationSuccess), lang.hitch(this, this.locationError));

            } else {
                alert("该浏览器不支持定位功能，推荐使用chrome、firefox等浏览器!");

            }
        },
        locationSuccess : function(event) {
            this._geolocationLayer = this.map.getLayer(this._geolocationLayerID);
            if (!this._geolocationLayer) {
                this._geolocationLayer = new GraphicsLayer({
                    id : this._geolocationLayerID
                });
                this.map.addLayer(this._geolocationLayer);
            }
            this._geolocationLayer.clear();
            var geoPoint = new Point(event.coords.longitude, event.coords.latitude, new SpatialReference({
                wkid : 4326
            }));
            if (this.map.spatialReference.wkid === 102100) {
                var wmPoint = webMercatorUtils.geographicToWebMercator(geoPoint);
                this._setMap(wmPoint, event);

            } else {
                var p = new ProjectParameters();
                p.geometries = [geoPoint];
                p.outSR = this.map.spatialReference;
                esri.config.defaults.geometryService.project(p, lang.hitch(this, function(geoms) {
                    this.onProjectComplete(geoms, event);
                }));
            }
        },

        locationError : function(error) {
            alert("定位出错：" + error.message);
        },
        _setMap : function(geometry, event) {
            this.map.centerAndZoom(geometry, 14);
            this._addLocationGraphic(geometry);
        },
        _addLocationGraphic : function(geometry) {
            var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([210, 105, 30, 0.5]), 8), new Color([210, 105, 30, 0.9]));
            graphic = new Graphic(geometry, symbol);
            this._geolocationLayer.add(graphic);
        },
        onProjectComplete : function(geoms, event) {
            if (geoms.length > 0) {
                this._setMap(geoms[0], event);
            } else {
                alert("投影转换失败，请重试!");
            }
        },
        startup : function() {
            this.inherited(arguments);
        }
    });

});

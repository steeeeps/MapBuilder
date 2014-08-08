/**
 * 地图切换器
 * @author taopy
 */

define("tools/MapGallery", ["dojo/_base/declare", 
        "dojo/on", "dojo/json", 
        "dojo/dom-construct", 
        "dojo/string",
        "dojo/on", 
        "dojo/_base/lang",
        "dojo/_base/fx",
        "dojo/_base/event",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "dojo/text!http://127.0.0.1:8020/MapBuilder/WebRoot/js/map/map.json"], 
        function(declare, on, json, dc, ds, on,lang,fx,evt,
                 ArcGISTiledMapServiceLayer,ArcGISDynamicMapServiceLayer,config) {

   
   
    return declare(null, {
        _galleryTemp : '<div id="mapGallery" class="mapgallery"></div>',
        _galleryNode : null,
        _galleryItemTemp : '<div class="galaryItem" data-url="${serviceUrl}" data-maptype="${type}"> <img  class="item-img"src="${serviceImg}"/> <span class="item-title">${serviceTitle}</span> </div>',
        _galleryObj : [],
        _map : null,
        constructor : function(map) {
            this._map = map;
            this._galleryObj = json.parse(config).gallery;
            if (this._galleryObj.length != 0) {
                this._createGallery();
                this._galleryAnim();
                this._show();
            }
        },

        _createGallery : function() {
            this._galleryNode = dc.toDom(this._galleryTemp);
            dc.place(this._galleryNode, "mapPanel");
            this._createGalleryItem();
           
        },
        //将gallery默认显示第一个地图，
        _show : function() {
            this._galleryNode.style.width = "70px";
            this._galleryNode.style.height = "85px";
        },
        _createGalleryItem : function() {

            for (var i = 0, len = this._galleryObj.length; i < len; i++) {
                var html = ds.substitute(this._galleryItemTemp, this._galleryObj[i]);
                var item = dc.toDom(html);
                this._galleryNode.appendChild(item);
                 on(item,"click",lang.hitch(this,this._changeBaseMap));
            }
        },
        _galleryAnim : function() {
            var width;
            //有两个以上地图的话，使用两列显示
            if (this._galleryObj.length > 2) {
                width = 142;
            } else {
                width = 70;
            }

            //计算gallery的高度
            this._galleryNode.style.width = width + "px";
            var height = this._galleryNode.clientHeight;

            on(this._galleryNode, "mouseover", lang.hitch(this, function(event) {
                if (M.fixedMouse(event, this._galleryNode)) {
                    fx.animateProperty({
                        node : this._galleryNode,
                        properties : {
                            width : {
                                start : 70,
                                end : width
                            },
                            height : {
                                end : height,
                                start : 85
                            }
                        }
                    }).play();
                }

            }));
            on(this._galleryNode, "mouseout", lang.hitch(this, function(event) {
                if (M.fixedMouse(event, this._galleryNode)) {
                    fx.animateProperty({
                        node : this._galleryNode,
                        properties : {
                            width : {
                                start : width,
                                end : 70
                            },
                            height : {
                                end : 85,
                                start : height
                            }
                        }
                    }).play();
                }

            }));
        },
        _changeBaseMap:function(e){
          
             e = e || window.event;
             var target = (e.currentTarget) ? e.currentTarget : e.srcElement;

            var url = dojo.attr(target, "data-url");
            var type = dojo.attr(target, "data-maptype");
            var Layer;
            //根据配置类型添加图层
            switch (type) {
                case "tiled":
                    Layer = ArcGISTiledMapServiceLayer;
                    break;
                case "dynamic":
                    layer = ArcGISDynamicMapServiceLayer;
                    break;

            }
            
            var l=new Layer(url);
            this._map.removeAllLayers();
            this._map.addLayer(l);

        }
    });


});


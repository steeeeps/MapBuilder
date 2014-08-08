/**
 * @author taopy
 */
define("widgets/layerControl/LayerControl",["dojo/_base/declare",
                                        "dojo/string",
                                        "dojo/dom-construct",
                                        "dojo/on",
                                        "widgets/_base/_BaseWidget",
                                        "esri/geometry/Extent", 
                                        "esri/SpatialReference"],
                                        function(declare,ds,dc,on,BaseWidget,Extent,SpatialReference){
                                            
                                           
    
    return declare(BaseWidget, {
        widgetName : "layerControl",
        widgetTitle : "图层控制",
        _cssFile:false,
        _configFile:false,        
        constructor : function(args, map) {
            
        },
        postCreate : function() {
            this.inherited(arguments);
            var b=dc.create("button",{
                'value':"get"
            });
            dc.place(b,this.domNode);
            on(b,"click",dojo.hitch(this,function(){
                var extent=this.map.extent;
                console.log(JSON.stringify(extent));
            }));
        },
        _createCityNode : function(city) {
        },
        startup : function() {
            this.inherited(arguments);
        }
    });

});

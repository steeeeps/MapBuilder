/**
 * @author taopy
 */
define("widgets/bookmark/Bookmark",["dojo/_base/declare",
                                        "dojo/string",
                                        "dojo/dom-construct",
                                        "dojo/on",
                                        "widgets/_base/_BaseWidget",
                                        "esri/geometry/Extent", 
                                        "esri/SpatialReference"],
                                        function(declare,ds,dc,on,BaseWidget,Extent,SpatialReference){
                                            
                                           
    
    return declare(BaseWidget, {
        widgetName : "bookmark",
        widgetTitle : "书签",
        _cssFile:false,
        _configFile:false,        
        constructor : function(args, map) {
            
        },
        postCreate : function() {
            this.inherited(arguments);
        },
        _createCityNode : function(city) {
        },
        startup : function() {
            this.inherited(arguments);
        }
    });

});

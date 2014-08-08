/**
 * @author taopy
 */
define("tools/DistanceMeasure",["tools/_base/_BaseTool", 
                                "dojo/_base/declare", 
                                "dojo/on"],function(_BaseTool, declare, on){
                               
   

    return declare(_BaseTool, {
        constructor : function(map) {
            this.inherited(arguments);
            this.toNode({
                icon : "images/tools/fs.png",
                text : "距离",
                title : "测量距离"
            }, true);
        },
    })

    })



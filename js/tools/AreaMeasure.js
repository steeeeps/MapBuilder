/**
 * @author taopy
 */
define("tools/AreaMeasure",["tools/_base/_BaseTool", 
                                "dojo/_base/declare", 
                                "dojo/on"],function(_BaseTool, declare, on){
                               
   

    return declare(_BaseTool, {
        constructor : function(map) {
            this.inherited(arguments);
            this.toNode({
                icon : "images/tools/fs.png",
                text : "面积",
                title : "测量面积"
            }, true);
        },
    })

    })



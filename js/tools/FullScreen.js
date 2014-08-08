/**
 * @author taopy
 */
define("tools/FullScreen", ["tools/_base/_BaseTool", 
                            "dojo/_base/declare", 
                            "dojo/on"], 
                            function(_BaseTool, declare, on) {

    return declare(_BaseTool, {
        constructor : function(map) {
            this.inherited(arguments);
            this.toNode({
                icon : "images/tools/fs.png",
                text : "全屏",
                title : "全屏显示地图"
            },true);
            on(this.toolNode, "click", dojo.hitch(this,this._onclick));
        },
        _onclick : function() {
            var textNode = dojo.query(".toolBtn-text", this.toolNode)[0];
            var text = textNode.innerHTML;
            if (text === "全屏") {
                this._fullScreen();
                textNode.innerHTML = "退出全屏";
            } else {
                this._exitFullScreen();
                textNode.innerHTML = "全屏";
            }
        },
        _fullScreen : function() {
            M.hide("#header");
            M.hide("#operatePanel");
            M.hide("#stretchBtn");
            M.initLayout();

        },
        _exitFullScreen : function() {
            M.show("#header");
            M.show("#operatePanel");
            M.show("#stretchBtn");
            M.initLayout();
        }
    })
});

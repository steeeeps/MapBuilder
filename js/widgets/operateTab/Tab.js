/**
 * @author taopy
 */
define("widgets/operateTab/Tab", 
       ["dojo/_base/declare", 
        "dojo/string", 
        "dojo/dom-construct", 
        "dojo/on"], 
        function(declare, ds, dc, on) {

    return declare(null, {
        name:"",
        tabNode:null,
        contentNode:null,
        isActive:false,
        constructor : function(widget, closeable) {
            this.name=widget.widgetName;
            this._createTab(widget, closeable);
            this._createContent(widget);
            //this.active();
        },
        _createTab : function(widget, closeable) {
            this.tabNode = dc.create("a", {
                "href" : "#" + widget.widgetName,
                "name" : widget.widgetName,
                "class" : "tab",
                "innerHTML" : widget.widgetTitle
            });
            if (closeable) {
                var span = dc.create("span", {
                    "class" : "closebtn",
                    "title" : "关闭"
                });
                this.tabNode.appendChild(span);
                on(span, "click", dojo.hitch(this,this._close));
            }
        },
        _createContent:function(widget){
            this.contentNode=dc.toDom('<div class="content animate"></div>');
            dojo.attr(this.contentNode,"name",widget.widgetName);
            widget.placeAt(this.contentNode);
            widget.startup();
        },
        active:function(){
           dojo.addClass(this.tabNode,"active");
           dojo.addClass(this.contentNode,"active");
           this.isActive=true;
        },
        disactive:function(){
            dojo.removeClass(this.tabNode,"active");
           dojo.removeClass(this.contentNode,"active");
           this.isActive=false;
        },
        _close:function(e){
            dc.destroy(this.tabNode);
            dc.destroy(this.contentNode);
            if(dojo.isFunction(this.onClose)){
                this.onClose(e);
            }
            dojo.stopEvent(e);
        },
        onClose:function(e){
            
        }
    })
}); 
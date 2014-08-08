/**
 * @author taopy
 */
define("tools/Toolgroup",["dojo/_base/declare",
                               "dojo/_base/lang",
                               "dojo/dom-construct",
                               "dojo/string",
                               "dojo/on",
                               "dojo/_base/lang"],function(declare,lang,dc,ds,on,lang){
                                  
    return declare(null, {
        groupNode : null,
        _toolContainer : null,
        template : '<div class="toolBtn"><span class="toolBtn-inner"><img src="${icon}" class="toolBtn-img" />' + '<span class="toolBtn-text">${text}</span><span class="toolBtn-img-arrow"></span></span>' + '<div style="display:none;" class="toolgroup"></div></div>',
        /**
         *
         * @param {Object} args  传入的参数，包括图标、组名
         */
        constructor : function(args) {
            this.toNode(args);
        },

        toNode : function(args) {

            args = lang.mixin({
                icon : "images/tools/fs.png",
                text : "tool",
                title : "this is a tool"
            }, args);
            var html = ds.substitute(this.template, args);
            this.groupNode = dc.toDom(html);
            this._toolContainer = dojo.query(".toolgroup",this.groupNode)[0];
            dc.place(this.groupNode, "tool_container");
            this._anim();
        },

        add : function(tool) {
            if (!tool)
                return;
            var tools = [].concat(tool);
            for (var i = 0; i < tools.length; i++) {
                this._toolContainer.appendChild(tools[i].toolNode);
            }
        },
        _anim : function() {
            on(this.groupNode, "mouseover", lang.hitch(this, function() {
                this._toolContainer.style.display = "block";
            }));
            on(this.groupNode, "mouseout", lang.hitch(this, function() {
                this._toolContainer.style.display = "none";
            }));
        }
    });

    });



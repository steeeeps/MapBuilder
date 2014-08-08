/**
 * 地图工具基类
 * @author taopy
 */

define("tools/_base/_BaseTool",["dojo/_base/declare",
                         "dojo/_base/lang",
                         "dojo/dom-construct",
                         "dojo/string"],function(declare,lang,dc,ds){
    
   
    
   
    
    return declare(null, {
        toolNode : null,
        map : null,
        template : '<a class="toolBtn" title="${title}"> <span class="toolBtn-inner"><img src="${icon}" class="toolBtn-img"/> <span class="toolBtn-text">${text}</span> </span> </a>',
        constructor : function(map) {
            this.map = map;
        },

        /**
         * 根据不同工具的信息生成dom节点，并添加到页面中
         * @param {Object} args 传入的参数，包括图标、工具名、鼠标上浮显示title
         * @param {Object} add 是否需要添加到toolbar中
         */
        toNode : function(args, add) {
            args = lang.mixin({
                icon : "images/tools/fs.png",
                text : "tool",
                title : "this is a tool"
            }, args);
            var html = ds.substitute(this.template, args);
            this.toolNode = dc.toDom(html);
            add && dc.place(this.toolNode, "tool_container");
        }
    });

})

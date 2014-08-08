/**
 * 基础小部件
 * 主要负责获取小部件的模板、css、文件
 * 同时避免每个小部件引入_WidgetBase,_TemplatedMixin
 * widget自带配置信息：  config
 *
 * @author taopy
 */
define("widgets/_base/_BaseWidget",
        ["module",
        "dojo/_base/declare", 
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/json"],
        function(module,declare,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,json){
            
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        //设置该小部件是否有css文件，有的话自动加载
        _cssFile : true,
        //设置该小部件是否有配置文件，有的话自动加载
        _configFile : true,
        //设置该小部件是否有模板文件，有的话自动加载
        _tempFile : true,
        //小部件配置信息
        config : null,
        //地图对象
        map : null,
        //小部件名称，唯一
        widgetName : "",
        //小部件标题，
        widgetTitle : "",
        constructor : function(args, map) {
            if (args) {
                this.widgetTitle = args.widgetTitle || this.widgetTitle;
                this.widgetName = args.widgetName || this.widgetName;
            }
            this.map = map;
            if (this._tempFile)
                this._getTemplate();

            this._parseUris();
            if (this._configFile)
                this._getConfig();
        },
        _appendCss : function() {
            if (document.createStyleSheet) {
                document.createStyleSheet(this.cssUri);
            } else {
                var e = document.createElement("link");
                e.rel = "stylesheet";
                e.type = "text/css";
                e.href = this.cssUri;
                document.getElementsByTagName("head")[0].appendChild(e);
            }

        },
        _getConfig : function() {
            //
            //使用dojo.cache同步获取配置文件
            //dojo.cache has descrepted，以后考虑换其他的
            //
            this.config = json.parse(dojo.cache("widgets." + this.widgetName, this.widgetName + ".json"));
        },
        _getTemplate : function() {
            this.templateString = dojo.cache("widgets." + this.widgetName, "templates/" + this.widgetName + ".html");
        },
        /**
         *使用AMD方式解析url，获取小部件所在的目录 
         */
        _parseUris : function() {
            var uris = module.uri.split("/");
            var curWidgetUrl = uris.slice(0, 4);
            curWidgetUrl.push(this.widgetName);
            this.cssUri = curWidgetUrl.concat(["css", this.widgetName + ".css"]).join("/");
            if (this._cssFile)
                this._appendCss();
        }
    });

}); 
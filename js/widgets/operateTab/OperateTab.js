/**
 * @author taopy
 */
define("widgets/operateTab/OperateTab", 
        ["dojo/_base/declare", 
        "dojo/string", 
        "widgets/_base/_BaseWidget", 
        "dojo/dom-construct", 
        "dojo/on",
        "widgets/operateTab/Tab"], 
        function(declare, ds, BaseWidget, dc, on,Tab) {
        
       
    Array.prototype.remove = function(index) {
        if (index == this.length) {
            this.pop();
            return this;
        } else if (index == 0) {
            this.shift();
            return this;
        } else {
            return this.slice(0, index).concat(this.slice(index + 1, this.length));
        }
    }

    return declare(BaseWidget, {
        widgetName : "operateTab",
        widgetTitle : "操作面板",
        _tabsNode : null,
        _contentsNode : null,
        _activeTab : null,
        _tabs : [],
        _configFile : false,
        constructor : function(args, node) {

        },
        postCreate : function() {
            this.inherited(arguments);
            this._tabsNode = dojo.query(".tabs",this.domNode)[0];
            this._contentsNode = dojo.query(".tab-contents",this.domNode)[0];

            on(this._tabsNode, "click", dojo.hitch(this, this._tabClickHander));
        },
        startup : function() {
            this.inherited(arguments);
        },
        add : function(widget, closeable) {
            this._activeTab && this._activeTab.disactive();

            if (this._has(widget.widgetName)) {
                return;
            }
            var tab = new Tab(widget, closeable);
            this._tabs.push(tab);
            tab.active();
            this._activeTab = tab;
            this._tabsNode.appendChild(tab.tabNode);
            this._contentsNode.appendChild(tab.contentNode);

            //注册tab标签删除响应事件，
            //删除tab后需要将容器中的tab数组中相对应的tab删掉
            dojo.connect(tab, "onClose", dojo.hitch(this, function() {
                var idx = this._tabs.indexOf(tab);
                if (tab.isActive) {
                    this._changeActiveTabAfterClose(idx);
                }
                this._tabs.remove(idx);
            }));
        },
        _has : function(widgetName) {
            var t = this._getTab(widgetName);
            if (!t)
                return false;
            t.active();
            this._activeTab = t;
            return true;
        },
        _getTab : function(widgetName) {
            for (var i = 0, len = this._tabs.length; i < len; i++) {
                var t = this._tabs[i];
                if (t.name == widgetName) {
                    return t;
                }
            }
            return null;
        },
        /**
         * 鼠标点击tab标签响应事件
         * @param {Object} e
         */
        _tabClickHander : function(e) {
            e = e || window.event;
            var target = (e.target) ? e.target : e.srcElement;
            //不是点击的tab标签
            if (target.className.indexOf("tab") == -1)
                return;
            //点击的当前标签
            if (target.className.indexOf("active") != -1)
                return;

            this._activeTab && this._activeTab.disactive();
            var name = target.name;
            var t = this._getTab(name);
            t.active();
            this._activeTab = t;
        },
        /**
         * 删除tab标签后，需要将前面的tab改为显示状态
         * @param {Object} idx
         */
        _changeActiveTabAfterClose : function(idx) {
            if (idx == 0)
                return;
            var t = this._tabs[idx - 1];
            t.active();
            this._activeTab = t;
        }
    });


});

(function(win, doc) {

    win = win || window;
    doc = doc || win.document;
    /**
     *实例化布局
     */
    function initLayout() {
        var height = getClientSize().height;

        var main_y = height - offsetRelative($("#main")).y;
        var mappanel_y = height - offsetRelative($("#mapPanel")).y;
        $("#operatePanel").style.height = parseInt(main_y) - 1 + "px";
        //$('#mapPanel').style.height = parseInt(mappanel_y) + "px";
        $('#rightPanel').style.height = parseInt(mappanel_y) + "px";

        if ( typeof M.onMapResize === "function") {
            M.onMapResize();
        }
    }

    /**
     *节点选择器，传入id或者class，例如："#id",".class"
     */
    function $(str) {
        var start = str[0];
        if (!str || (start != "#" && start != "."))
            return null;
        var name = str.substr(1, str.length);

        return start == "#" ? doc.getElementById(name) : doc.getElementsByClassName(name)[0];

    }

    function initStretch() {
        var stretchBtn = $("#stretchBtn");
        on(stretchBtn, "click", changeOperatePanlePosition);

    }

    function changeOperatePanlePosition() {
        var panel = $('#operatePanel');
        var ml = parseInt(panel.style.marginLeft);
        if(!ml || ml == 0){
             panel.style.marginLeft = "-300px";
             $(".stretchImg").src="images/layout/right.png"
             $("#stretchBtn").title="显示面板";
        }else{
            panel.style.marginLeft = "0px";
             $(".stretchImg").src="images/layout/left.png"
             $("#stretchBtn").title="隐藏面板";
        }
        //panel.style.marginLeft = (!ml || ml == 0) ? "-300px" : "0px";

        if ( typeof M.onMapResize === "function") {
            M.onMapResize();
        }
    }

    function offsetRelative(node, body) {
        var g = {
            x : 0,
            y : 0
        };
        if (node.getBoundingClientRect) {
            var k = node.getBoundingClientRect();
            body = body || doc.body;
            var f = body.getBoundingClientRect();
            g.x = k.left - f.left;
            g.y = k.top - f.top
        } else
            for (; node && node != body; ) {
                g.x += node.offsetLeft || 0;
                g.y += node.offsetTop || 0;
                node = node.offsetParent
            }
        return g;
    }

    function getClientSize() {
        //ie以外的浏览器
        if (win.innerHeight) {
            return {
                width : win.innerWidth,
                height : win.innerHeight
            }
        }
        //在声明了DOCTYPE 的 IE 中
        else {
            if (doc.documentElement && doc.documentElement.clientHeight) {
                return {
                    width : doc.documentElement.clientWidth,
                    height : doc.documentElement.clientHeight
                }
            }
            //在 IE4、IE5 和 没有声明 DOCTYPE 的 IE6 中
            else {
                return {
                    width : doc.body.clientWidth,
                    height : doc.body.clientWidth
                }
            }
        }
    }

    /**
     * 页面尺寸变化响应事件
     */
    function layoutResize() {
        initLayout();
    }

    /**
     * 注册事件
     */
    function on(node, evttype, func) {
        if (node.attachEvent) {
            node.attachEvent("on" + evttype, func);
        } else if (node.addEventListener) {
            node.addEventListener(evttype, func, false);
        } else {
            node['on' + evttype] = func;
        }
    }

    /**
     *动态添加css样式
     * @param {Object} doc document
     * @param {Object} href css 链接
     * @param {Object} id css 标签 id
     */
    function addLink(doc, href, id) {
        var head = doc.head || doc.getElementsByTagName('head')[0];
        var link = doc.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        id && (link.id = id);
        head.appendChild(link);
    }

    /**
     *动态添加script标签
     * @param {Object} doc document
     * @param {Object} src js 链接
     * @param {Object} callback 添加完成回调函数
     */
    function addScript(doc, src, callback) {
        var head = doc.head || doc.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);

        script.onreadystatechange = function() {
            if (this.readyState == "complete") {
                if ( typeof callback == "function")
                    callback();
            }
        };
        script.onload = function() {
            if ( typeof callback == "function")
                callback();
        };

    }

    function show(str) {
        var node = M.$(str);
        node && (node.style.display = "block");
    }

    function hide(str) {
        var node = M.$(str);
        node && (node.style.display = "none");
    }

    /* p=parentNode, c=childNode */
    function contains(p, c) {
        return p.contains ? p != c && p.contains(c) : !!(p.compareDocumentPosition(c) & 16);
    }

    /**
     *解决div存在子节点时，mouseover,mouseout乱跳的情况 
     */
    /* e即为事件，target即为绑定事件的节点 */
    function fixedMouse(e, target) {
        var related, type = e.type.toLowerCase();
        //这里获取事件名字
        if (type == 'mouseover') {
            related = e.relatedTarget || e.fromElement
        } else if ( type = 'mouseout') {
            related = e.relatedTarget || e.toElement
        } else
            return true;
        return related && related.prefix != 'xul' && !contains(target, related) && related !== target;
    }

    function init() {
        M.initLayout();
        $('#copyright').innerHTML = M.config.copyright;
        M.on(window, "resize", M.layoutResize);

        initStretch();

    }

    //对外暴露事件事件

    /**
     * 页面尺寸变化，地图需要重新更新显示范围
     */
    function onMapResize() {

    }

    //全局配置

    var config = {
        ags_js_url : "http://js.arcgis.com/3.8/init.js",
        ags_css_url : "http://js.arcgis.com/3.8/jsapi/js/esri/css/esri.css",
        copyright : "辽宁省测绘地理信息局&nbsp;&nbsp;&nbsp;&nbsp;辽宁省基础地理信息中心&nbsp;&nbsp;&nbsp;&nbsp;辽S（2013）&nbsp;&nbsp;35号 "
    }

    win.M = {
        init : init,
        $ : $,
        offsetRelative : offsetRelative,
        getClientSize : getClientSize,
        initLayout : initLayout,
        layoutResize : layoutResize,
        onMapResize : onMapResize,
        addLink : addLink,
        addScript : addScript,
        on : on,
        show : show,
        hide : hide,
        config : config,
        fixedMouse:fixedMouse
    }
})(window, document);

